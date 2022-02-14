FROM node:lts-alpine
RUN apk update
RUN apk add git
RUN apk add coreutils 

LABEL name="wizardmc-frontend"
LABEL version="1.0"

ARG STRIPE_PUBLIC_KEY
ARG RECAPTCHA_PUBLIC_KEY

ENV STRIPE_PUBLIC_KEY $STRIPE_PUBLIC_KEY
ENV RECAPTCHA_PUBLIC_KEY $RECAPTCHA_PUBLIC_KEY

ENV FRONTEND_URL=http://wizardmc.fr
ENV API_URL=http://api.wizardmc.fr
ENV ADMIN_URL=http://admin.wizardmc.fr
ENV CLOUD_URL=http://wizardmc.fr/cloud

ENV NODE_ENV development

RUN [ "mkdir", "/app" ]
WORKDIR /app
ADD "https://api.github.com/repos/Galitan-dev/wizardmc.fr/commits?per_page=1" /cache/commit
RUN [ "git", "clone", "https://github.com/Galitan-dev/wizardmc.fr/", "." ]

WORKDIR /app/frontend
ADD "https://raw.githubusercontent.com/Galitan-dev/wizardmc.fr/master/frontend/package.json" /cache/package1
RUN [ "yarn", "--ignore-platform" ]
ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" /cache/random
RUN [ "yarn", "build" ]

ENV NODE_ENV production

ENTRYPOINT [ "yarn", "start" ]
CMD [ "" ]
