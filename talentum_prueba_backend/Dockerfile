FROM node:18

WORKDIR /app/backend

COPY package.json package-lock.json /app/backend/
RUN npm install

COPY . /app/backend/

EXPOSE 3000
CMD ["npm", "start"]