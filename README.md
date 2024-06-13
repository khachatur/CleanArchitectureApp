# CleanArchitectureApp

## Overview

CleanArchitectureApp is a modern, enterprise, test-covered, clean architecture application built with:

- ASP.NET Core
- Entity Framework Core
- Microsoft Azure (App Services and Azure SQL)
- React with Recoil
- Tailwind CSS

## Architecture

The project follows the Clean Architecture principles to ensure separation of concerns and maintainability.

## Projects Structure

- **Application**: Contains the business logic, DTOs, service interfaces, AutoMapper profiles, and validation.
- **Core**: Contains the core entities and repository interfaces.
- **Infrastructure**: Contains the data access logic, dependency injection configurations, and infrastructure-specific services.
- **Presentation**: Contains the **REST API** and web front-end in **React**.
- **Tests**: Contains unit and integration tests.

## Getting Started

### Prerequisites

- .NET 8.0 SDK
- Node.js and npm
- Azure account (for deployment)

### Running the API

1. Navigate to the API project:
   ```bash
   cd src/Presentation/API
   ```
2. Run the project:
   ```bash
   dotnet run
   ```

### Running the Frontend

1. Navigate to the front-end project:
   ```bash
   cd src/Presentation/Web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the project:
   ```bash
   npm start
   ```

### Running Tests

1. Navigate to the tests directory:
   ```bash
   cd tests
   ```
2. Run unit tests:
   ```bash
   dotnet test UnitTests/UnitTests.csproj
   ```
3. Run integration tests:
   ```bash
   dotnet test IntegrationTests/IntegrationTests.csproj
   ```

## Deployment

Follow the steps to deploy the application to Azure App Services and Azure SQL.

1. Azure App Services:
   * Deploy the ASP.NET Core backend.
   * Continuous deployment using GitHub Actions.     
2. Azure SQL Database:
   * Provision and configure the database.
   * Migrate database schema using Entity Framework migrations.

## CI/CD Pipeline

Use GitHub Actions for CI/CD.
Example workflow:

```bash
name: CI/CD Pipeline

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Setup .NET
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: '5.0.x'
    - name: Restore dependencies
      run: dotnet restore
    - name: Build
      run: dotnet build --no-restore
    - name: Run tests
      run: dotnet test --no-build --verbosity normal
    - name: Publish
      run: dotnet publish -c Release -o out
    - name: Deploy to Azure Web App
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'YOUR_APP_NAME'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: './out'
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Create a pull request
