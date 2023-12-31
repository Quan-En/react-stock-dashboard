FROM node:18-alpine

WORKDIR /app

# ENV PORT 8080
# ENV HOST 0.0.0.0

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]