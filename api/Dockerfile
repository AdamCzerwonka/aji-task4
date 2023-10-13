FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npx prisma generate

EXPOSE 5000

CMD ["node", "dist/index.js"]