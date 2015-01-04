FROM dockerfile/nodejs:latest

# Install Git
RUN apt-get install -y git

# Add source
ADD ./node_modules /opt/insignia/node_modules
ADD . /opt/insignia

WORKDIR /opt/insignia

# Install app deps
RUN npm install

CMD ["npm", "start"]
