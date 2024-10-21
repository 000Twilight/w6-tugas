# Use the official Node.js image
FROM node:22

# Argument and environment variable for database URL
ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}

# Set the working directory in the container
WORKDIR /app

# Copy the package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci 

# Copy the rest of the app files
COPY . .

# Copy wait-for-it.sh to wait for MariaDB
ADD wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Run Prisma commands (generate, migrate, seed)
RUN echo "DATABASE_URL is: $DATABASE_URL"
RUN npx prisma generate

# Uncomment these lines to handle migration and seeding inside the Docker build process
# These could also be run at startup if desired
RUN npx prisma migrate deploy
RUN npx prisma db seed

# Build the app
RUN npm run build

# Set host and port environment variables
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Start the app, but first wait for MariaDB using wait-for-it.sh
CMD ["/app/wait-for-it.sh", "mariadb:3306", "--", "npm", "run", "start:migrate"]