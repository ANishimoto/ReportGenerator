FROM node:20-alpine3.18

COPY . .

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD ["npm", "run", "start"]