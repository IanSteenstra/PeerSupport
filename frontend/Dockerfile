FROM node

WORKDIR /peersupport/frontend
ENV CHOKIDAR_USEPOLLING 1
COPY package.json /peersupport/frontend

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]