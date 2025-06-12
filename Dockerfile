# Use official Nginx image
FROM nginx:alpine

# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy your static files to Nginx's HTML directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80