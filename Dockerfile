FROM node
WORKDIR /src
COPY package.json /src
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]