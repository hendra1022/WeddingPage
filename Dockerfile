FROM php:8.2-apache

# Enable Apache mod_rewrite (for future PHP routing)
RUN a2enmod rewrite

# Copy your HTML, CSS, JS, PHP files into /var/www/html
COPY . /var/www/html

# Expose port for Cloud Run
EXPOSE 8080

# Let Apache run on port 8080 for Cloud Run
RUN sed -i 's/80/8080/g' /etc/apache2/ports.conf /etc/apache2/sites-available/000-default.conf

CMD ["apache2-foreground"]
