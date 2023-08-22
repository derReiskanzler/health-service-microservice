FROM mhart/alpine-node as development

WORKDIR /app
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build

FROM development as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG PORT=5000

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /app/dist ./dist

EXPOSE $PORT
RUN echo "Service running in docker on port: $PORT"

CMD ["npm", "run", "start:prod"]
