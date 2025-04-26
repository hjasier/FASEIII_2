# Dockerfile para React
FROM node:18-alpine

WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto donde la app de React va a correr
EXPOSE 5173

# Comando para ejecutar el frontend
CMD ["npm", "run", "dev"]
