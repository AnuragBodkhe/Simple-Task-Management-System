FROM node:14

WORKDIR /usr/src/app

# Copy only package files
COPY package*.json ./

# Install dependencies INSIDE container (Linux compatible)
RUN npm install

# Now copy rest of code (excluding node_modules)
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
