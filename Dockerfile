FROM node:18-slim

WORKDIR /app

# Install system dependencies for sharp
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    pkg-config \
    libc6-dev \
    libpng-dev \
    libvips-dev \
 && rm -rf /var/lib/apt/lists/*

# Copy package files first for dependency caching
COPY package.json yarn.lock ./

# Install dependencies (only production)
RUN yarn install --frozen-lockfile --production

# Copy project files
COPY . .

# Build Strapi admin
RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]