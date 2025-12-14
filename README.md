<!-- # SweetShopManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

 -->


 project:
  title: "🍬 Sweet Shop Management System"
  description: "A modern full-stack Sweet Shop Management System built with Angular (frontend) and FastAPI (backend). Users can browse, search, and purchase sweets, while admins can manage stock and track all purchases."
  
features:
  - User registration & login
  - Admin & user dashboards
  - Browse and search sweets by name, category, and price range
  - Purchase sweets with stock tracking
  - Admin-only actions: add, restock, delete sweets
  - View purchase history (user-specific and all users for admin)
  - JWT-based authentication
  - Responsive UI with Angular

technology_stack:
  frontend:
    - Angular
    - TypeScript
    - HTML
    - CSS
  backend:
    - FastAPI
    - Python
    - SQLAlchemy
  database: SQLite
  authentication: JWT

project_structure:
  frontend:
    path: "src/app/"
    folders:
      - pages:
          - login
          - register
          - dashboard
          - admin
      - services
      - guards
      - models
    others:
      - environment
      - home
      - navbar
  backend:
    path: "sweet-backend/"
    files:
      - main.py
      - auth.py
      - crud.py
      - models.py
      - schemas.py
      - database.py
      - requirements.txt

backend_setup:
  steps:
    - "cd sweet-backend"
    - "python -m venv venv"
    - "source venv/bin/activate  # Linux/macOS"
    - "venv\\Scripts\\activate   # Windows"
    - "pip install -r requirements.txt"
    - "uvicorn main:app --reload"
  url: "http://127.0.0.1:8000/"
  admin_credentials:
    username: "admin"
    password: "admin123"

frontend_setup:
  steps:
    - "cd sweet-frontend"
    - "npm install"
    - "ng serve"
  url: "http://localhost:4200/"
  api_config: "src/environments/environment.ts"
  api_url: "http://127.0.0.1:8000/api"

running_locally:
  steps:
    - "Start backend server"
    - "Start Angular frontend server"
    - "Open browser at http://localhost:4200/"
    - "Register a new user or login as admin"

screenshots: "Add your screenshots here"

ai_usage:
  description: "This project was assisted by AI (ChatGPT) for generating Angular components, API services, FastAPI CRUD operations, and documentation."

notes:
  - "System uses JWT tokens for authentication"
  - "Admin users have full privileges, normal users have restricted access"
  - "Purchase history tracked per user and globally for admins"

license:
  type: "MIT License"
  description: "Open-source project"

