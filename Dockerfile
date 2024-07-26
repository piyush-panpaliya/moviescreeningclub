FROM node:20-alpine as base

FROM base as build
WORKDIR /app
COPY ./frontend/ .
ENV VITE_environment production
RUN npm install
RUN npm run build

FROM base as prod
WORKDIR /app
COPY ./backend/ .

RUN npm install
COPY --from=build /app/dist /app/frontend/dist

EXPOSE 8000
CMD ["npm","run", "start"]
