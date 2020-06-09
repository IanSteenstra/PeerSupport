FROM node

WORKDIR /therapynow/frontend
ENV CHOKIDAR_USEPOLLING 1
COPY package.json /therapynow/frontend

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]