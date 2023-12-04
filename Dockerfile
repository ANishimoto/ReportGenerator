FROM node:18-alpine3.18

COPY . .

RUN npm install
RUN npm run puppeteer

COPY --chown=node:node . .

EXPOSE 8080

CMD ["npm", "run", "start"]