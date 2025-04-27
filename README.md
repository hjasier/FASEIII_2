




# Funcionalidades implementadas
Nuestro diseño se ha basado en separar 2 tipos de usuarios: Normales y Expertos. El usuario normal es cualquier ciudadano que quiera acceder a los datos de forma no técnica para responder a sus dudas sobre la gestión de la cuidad. Por otro lado, el usuario experto es aquel que tiene experiencia con SQL, descargando datos y ciertos conocimientos técnicos.

Para los usuarios normales hemos creado una interfaz simple que consta de un agente que mediante lenguaje natural, responde a las preguntas que el usuario le realice y puedan ser respondidas con los datos disponibles en la base de datos.

Para los usuarios expertos, hemos creado una interfaz alternativa, en la que se pueden seleccionar varias tablas y crear proyectos con ellas. Cada proyecto tiene acceso a esas tablas (realmente tiene acceso a todas, pero tiene esas a la vista con detalles), y capacidad de hacer consultas que conlleven lectura de datos. Las consultas se convierten en tablas visibles en la propia interfaz, con lo que se puede hacer un *dashboard* de los datos que se quieran analizar. También se pueden crear visualizaciones interactivas de las tablas, con elementos como gráficas circulares, diagramas de barras, etc. Además, también hay un asistente inteligente que genera código SQL y gráficos a demanda. Los "proyectos" se guardan.

Como requisito adicional hemos creado un panel de administrador capaz de ejecutar consultas SQL de todo tipo, incluyendo consultas que modifiquen la base de datos (los usuarios expertos no tienen permisos para hacerlo) y éste tiene un historial de consultas. Además se pueden introducir datos a tablas a través de archivos CSV. 

Para los datos de Kafka hemos creado una iterfaz que se actualiza en tiempo real, e incluye tanto gráficos como los propios valores en tiempo real. Así como selectores de ciudad y tópico.

Antes de la interfaz de administrador hay un inicio de sesión que solo permite a los administradores acceder, y en la interfaz de usuarios normales y expertos también hay un formulario de registro e inicio de sesión.

# Casos de uso incluidos y explicación de su valor
La solución propuesta permite a los usuarios crear visualizaciones de datos mediante el uso de lenguaje natural. Ademas se han incluido datos como taxistas , coches y viajes (obtenidos mediante open source intelligent) a la base de datos final. Mediante el uso del LLM se ha generado el siguiente query: 

`SELECT t.origin, t.destiny, SUM(td.co2_emissions_grams_per_km * CAST(t.km AS DECIMAL)) AS total_co2_grams, COUNT(*) AS num_trips FROM trips t JOIN taxi_drivers td ON t.taxista_id = td.people_id GROUP BY t.origin, t.destiny ORDER BY total_co2_grams DESC;`

 Con esto se nos permite saber potenciales rutas que los ciudadanos demandan y que mas contaminación genera, por lo tanto también resultan potenciales viajes a los que el transporte publico podría expandirse. Ademas la posiblidad de monitorear datos en tiempo real mediante kafka permite tambien al ciudadano saber el estado del trafico, como el estado del aire y del agua. Con todo esto buscamos un desarrollo sostenible y transparente. Tambien permitimos la descarga de todos los datasets disponibles con el fin de que cada ciudadano pueda extraer y estudiar los datos. 

# Limitaciones

Algunas limitaciones que tenemos ahora mismo son:
- El contexto del la base de datos es la estructura del *schema* "public" completo así como las relaciones entre tablas. En caso de escalar mucho la base de datos, el precio de las llamadas a las APIs de LLMs podría ser costoso, por lo que se podría mejorar creando ciertas *tools* para que el propio modelo decida qué partes de la base de datos quiere conocer.

- No se guardan los gráficos de los proyectos

## Como ejecutar con Docker
```sh
docker-compose up
```
![postspark_export_2025-04-27_12-07-33](https://github.com/user-attachments/assets/6da29a59-cf5e-4de5-abab-2382741c677c)



