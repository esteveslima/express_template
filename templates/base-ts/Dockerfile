# Use the official image as a parent image(Beware of the choice).
FROM node:12-alpine as nodeBuilderStage

# Install extra useful packages for alpine version
RUN apk add --no-cache curl && \
    apk add --no-cache bash   

# Set the working directory.
WORKDIR /container

# Copy package.json first(that way if it hasn't changed npm install will be skipped)
COPY package.json .
# Run install command inside image filesystem 
RUN npm install 
    
# Copy project files from host to current location.
COPY . .
# Transpile ts to js and remove ts files and dev dependencies
RUN npm run build && \
    rm -rf src && \    
    npm uninstall --save-dev

# Checking container's health, using server status requisition inside the container
HEALTHCHECK --interval=5m --timeout=10s --start-period=10s --retries=5 CMD curl -f http://localhost:8080/public/status || exit 1

# Exposes ports to make them available for inter-container communication(external communication require publish)
EXPOSE 8080

# Run the specified command within the container.
CMD [ "npm", "start" ]



# Continue building image from the previous one if needed...
# FROM ...
# COPY --from=nodeBuilderStage <sourcePath> <targetPath>
# ...
