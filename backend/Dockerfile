FROM php:8.3-apache

# Install ekstensi yang dibutuhkan Laravel & PostgreSQL (Supabase)
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql pgsql zip bcmath

# Mengarahkan Apache Document Root ke folder 'public' milik Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Mengaktifkan Apache mod_rewrite untuk URL routing Laravel
RUN a2enmod rewrite

# Menginstal Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Menentukan direktori kerja
WORKDIR /var/www/html

# Menyalin seluruh file backend ke dalam container
COPY . .

# Menginstal dependensi PHP
RUN composer install --optimize-autoloader --no-dev

# Memberikan hak akses folder agar Laravel bisa menyimpan log & cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Menjalankan migrasi dan server Apache
CMD php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    php artisan migrate --force && \
    apache2-foreground
