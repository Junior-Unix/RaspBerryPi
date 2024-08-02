# Use a imagem oficial do Node.js
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o arquivo index.js e package.json da sua pasta local para o contêiner
COPY index.js package.json .

# Instale as dependências (opcional, se você tiver um package.json)
RUN npm install

# Exponha a porta 3000 (ou a porta que o seu aplicativo usa)
EXPOSE 4000

# Comando para iniciar o aplicativo (ajuste conforme necessário)
CMD ["npm", "start"]

#pra criar o container: docker build -t app .
#Pra rodar: docker run -p 4000:4000 app


# Use a imagem oficial do Node.js para a etapa de construção
#FROM node as build-deps

# Defina o diretório de trabalho dentro do contêiner
#WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
#COPY package.json package-lock.json ./

# Instale as dependências
#RUN npm i

# Copie o restante dos arquivos do projeto
#COPY . ./

# Execute o comando para construir o aplicativo (por exemplo, npm run build)
#RUN npm run build

# Etapa final: use a imagem do Nginx
#FROM nginx

# Copie os arquivos construídos da etapa anterior para o diretório do Nginx
#COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

# Exponha a porta 80 (ou a porta que o seu aplicativo usa)
#EXPOSE 80

# Comando para iniciar o servidor Nginx
#CMD ["npm", "start", "nginx", "-g", "daemon off;"]








