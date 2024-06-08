FROM node:21.0.0
WORKDIR /api
COPY package*.json ./
RUN ls
RUN npm install
COPY . .
RUN ls
EXPOSE 3000
CMD ["npm", "run", "start"]