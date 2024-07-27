FROM node:20-alpine AS base

FROM base AS build
WORKDIR /app
COPY ./frontend/ .
ENV VITE_environment production
RUN npm ci
RUN npm run build

FROM base AS prod
WORKDIR /app
COPY ./backend/ .

RUN npm ci
COPY --from=build /app/dist /app/frontend/dist

EXPOSE 8000
CMD ["npm","run", "start"]
