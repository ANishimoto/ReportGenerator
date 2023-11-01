FROM node:20-alpine3.18

WORKDIR /usr/app

EXPOSE 9000

CMD ["npm", "run", "start"]