from flask import Blueprint, request, jsonify
import psycopg2
import matplotlib.pyplot as plt
import base64
import io
import json
import re
from .schema import table_schema
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage, AssistantMessage
from azure.core.credentials import AzureKeyCredential

llm_bp = Blueprint('llm_bp', __name__)

# Database connection setup
host = "10.10.76.241"
port = 6565
database = "greenlake_data"
user = "readonly_user"
password = "asdf"

connection = psycopg2.connect(
    host=host,
    port=port,
    database=database,
    user=user,
    password=password
)
cursor = connection.cursor()

# Azure OpenAI Setup
endpoint = "https://models.github.ai/inference"
model = "openai/gpt-4.1"
token = "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"
client = ChatCompletionsClient(endpoint=endpoint, credential=AzureKeyCredential(token))



def query(sql_query):
    cursor.execute(sql_query)
    return cursor.fetchall()

def generar_grafico(tipo_grafico, x, y, titulo="Gráfico"):
    plt.style.use('seaborn-v0_8-whitegrid')
    fig = plt.figure(figsize=(12, 7), facecolor='none')
    ax = fig.add_subplot(111)
    colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#34495e', '#e67e22']

    if tipo_grafico == "bar":
        bars = ax.bar(x, y, color=colors[0], alpha=0.8, width=0.6)
        for bar in bars:
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height + 0.1, f'{height:.1f}', ha='center', va='bottom')
    elif tipo_grafico == "line":
        ax.plot(x, y, marker='o', color=colors[1], linewidth=3, markersize=8, markerfacecolor='white', markeredgewidth=2)
        ax.fill_between(x, y, alpha=0.1, color=colors[1])
    elif tipo_grafico == "scatter":
        ax.scatter(x, y, s=100, color=colors[2], alpha=0.7, edgecolors='white')
    elif tipo_grafico == "pie":
        wedges, texts, autotexts = ax.pie(
            y, labels=None, autopct='%1.1f%%', startangle=90,
            colors=colors, wedgeprops={'edgecolor': 'white', 'linewidth': 2},
            textprops={'fontsize': 12}, shadow=False)
        ax.legend(wedges, x, title="Categorías", loc="center left", bbox_to_anchor=(1, 0, 0.5, 1))

    if tipo_grafico != "pie":
        ax.set_xlabel("Categorías", fontsize=12)
        ax.set_ylabel("Valores", fontsize=12)
        ax.grid(True, alpha=0.3, linestyle='--')
        plt.xticks(rotation=45, ha='right', fontsize=10)
        plt.yticks(fontsize=10)
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)

    plt.title(titulo, fontsize=16, pad=20, fontweight='bold')
    plt.tight_layout()

    buffer = io.BytesIO()
    plt.savefig(buffer, format='png', transparent=True, dpi=120, bbox_inches='tight')
    buffer.seek(0)
    img_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
    buffer.close()
    plt.close()
    return img_base64

# Main endpoint
@llm_bp.route('/generate', methods=['POST'])
def generate():
    user_question = request.json.get('question')

    prompt = [
        SystemMessage(f"Eres un asistente que genera queries SQL basadas en el schema: {table_schema}"),
        UserMessage(user_question)
    ]

    response = client.complete(messages=prompt, temperature=0, top_p=1, model=model)
    response_message = response.choices[0].message.content

    match = re.search(r"```(?:\w+\n)?(.*?)```", response_message, re.DOTALL)

    if not match:
        return jsonify({'error': 'No se encontró código SQL en la respuesta del modelo'}), 400

    sql_query = match.group(1).strip()

    db_data = query(sql_query)
    
    muestra_db_data = db_data[:3] + db_data[-3:]
    num_registros = len(db_data)



    # Segunda llamada para graficar
    prompt.append(AssistantMessage(response_message))
    prompt.append(UserMessage(
        f"Ejemplo de los datos: {muestra_db_data}. "
        f"El conjunto completo contiene {num_registros} registros similares."
        f"Si corresponde , genera un gráfico usando las herramientas disponibles.No todas las consultas requieren un gráfico , solo a las que les pueda ayudar al usuario a ver los datos visualmente. "
    ))
    
    
    tools = [{
        "type": "function",
        "function": {
            "name": "generar_grafico",
            "parameters": {
                "type": "object",
                "properties": {
                    "tipo_grafico": {"type": "string", "enum": ["bar", "line", "scatter", "pie"]},
                    "x": {"type": "array", "items": {"type": "string"}},
                    "y": {"type": "array", "items": {"type": "number"}},
                    "titulo": {"type": "string"}
                },
                "required": ["tipo_grafico", "x", "y"]
            }
        }
    }]

    response = client.complete(messages=prompt, tools=tools, temperature=0, top_p=1, model=model)
    message = response.choices[0].message

    if hasattr(message, "tool_calls") and message.tool_calls:
        tool_call = message.tool_calls[0]
        arguments = json.loads(tool_call.function.arguments)

        img_base64 = generar_grafico(
            tipo_grafico=arguments['tipo_grafico'],
            x=arguments['x'],
            y=arguments['y'],
            titulo=arguments.get('titulo', 'Grafico')
        )

        return jsonify({
            'sql_generated': sql_query,
            'db_data': db_data,
            'graph_base64': img_base64
        })

    return jsonify({
        'sql_generated': sql_query,
        'db_data': db_data,
        'message': message.content
    })
