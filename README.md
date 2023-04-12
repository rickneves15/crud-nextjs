# CRUD Next.js
This repository contains a basic CRUD (Create, Read, Update, Delete) application built with Next.js and Laravel.

## Getting Started:

Prerequisites
  * Node.js
  * Composer
  * Docker and Docker-Composer

## Installing:

1. Clone the repository:

```bash

git clone https://github.com/rickneves15/crud-nextjs.git

```

2. Install the dependencies and Start the development server:

  #### Backend
    
    cd api/
    
    docker-compose up -d --build
    
    composer i
    
    docker exec -it api cp .env.example .env
    
    docker exec -it api composer i
    
    docker exec -it api php artisan key:generate
    
    docker exec -it api php artisan migrate --seed
    
  #### Frontend
  
    cd web/
    
    npm i
    
    npm run dev

## Set up the environment variables:

- DB_HOST
- DB_PORT
- DB_DATABASE
- DB_USERNAME
- DB_PASSWORD
- Note: Remember that Docker was configured with the PostgreSQL database.

## URLs:

- API home - http://localhost:8000
- Postgres - http://localhost:5432
- Postgres Admin - http://localhost:5050
- App home - http://localhost:3000
    
