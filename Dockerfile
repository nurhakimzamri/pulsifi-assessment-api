FROM node:lts-alpine AS build-env

COPY ./ /app
WORKDIR /app

RUN ls

RUN npm install
#RUN npm run build
RUN npm run build 
RUN npm ci --only=production

RUN mkdir -p /app/logs
RUN mkdir -p /app/logs/applications
RUN mkdir -p /app/logs/exceptions
RUN mkdir -p /app/logs/errors
RUN chmod -R 777 /app/logs

FROM node:lts-alpine
RUN apk update && apk add tzdata
ENV TZ=Asia/Kuala_Lumpur
COPY --from=build-env /app /app
WORKDIR /app

LABEL maintainer="hakimzamri99.hz@gmail.com"

EXPOSE 8080
#CMD ["npm", "run", "start:prod"]
CMD ["node", "dist/src/main.js"]
