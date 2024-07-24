FROM node:20-alpine as build
WORKDIR /app
COPY ./frontend/ .
ENV VITE_environment production
RUN npm install
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY ./backend .
ENV PORT 8000
ENV FRONTEND_URL "http://localhost:5173"
RUN npm install
COPY --from=build /app/dist /app/dist

EXPOSE 8000
CMD ["npm","run", "start"]
