FROM node:18-slim

WORKDIR /frontend

COPY ./frontend /frontend/

RUN yarn install --frozen-lockfile

CMD ["yarn", "start"]
