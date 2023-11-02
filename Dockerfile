FROM node:20-alpine3.18

# Copie o package.json e o pnpm-lock.yaml
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos locais para o container
COPY . /app

# Defina o diretório de trabalho no container
WORKDIR /app

EXPOSE 8080

CMD ["npm", "run", "start"]