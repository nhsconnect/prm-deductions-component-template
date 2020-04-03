# prm-deductions-component-template

Template for PRM Deduction components, that can be used to make new components, as well as aligning current components.

1. Clone this template and push it to a new repo for the new Deductions component you are creating.
2. Create a security group for the new service in the prm-deductions-infra repository and export this to SSM.
3. Import the new security group id in to this terraform stack in data.tf and update ecs-service.tf with the new security group data name.
4. Create parameters in SSM for all environments (e.g. dev, test) for the authorization_key parameter.
5. Update any tfvars files (e.g. dev.tfvars, test.tfvars) with the name of the component.
6. Update the tasks file and make sure the new component name, make sure it matches what's been created in the above step.
7. Update the prm-deductions-base-infra repository and create a new ECR repo that matches the name of the new component
8. In terraform/alb.tf update the 'priority' parameter of the two listener rules, making sure that the value will be unique across all deductions components within the relevant vpc (e.g. deductions-private)
9. In acm.tf in prm-deductions-infra, create a new certificate for the domain of the new component and create a new aws_lb_listener_certificate resource to attach the new certificate to the ALB of the vpc.
10. Update the gocd/pipeline.gocd.yml file to reflect the new repo and component name
11. Add the git repo under Config Repositories (you'll need to be an admin)

## README Template (to include)

## Prerequisites

Follow the links to download

- [Node](https://nodejs.org/en/download/package-manager/#nvm) - version 12.x
- [Docker](https://docs.docker.com/install/)
- [kudulab/dojo](https://github.com/kudulab/dojo#installation)

## Directories

| Directory  | Description                                       |
| :--------- | :------------------------------------------------ |
| /docs      | Contains documentation such as Plantuml diagrams  |
| /test      | Contains end-to-end tests                         |
| /gocd      | Contains the GoCD pipeline files                  |
| /src       | The ExpressJS server side code                    |
| /terraform | Terraform to deploy app as a Fargate task in AWS  |
| /scripts   | Useful scripts (e.g. for sending canary messages) |

## Set up

1. Run `npm install` to install all node dependencies.
2. Create a .env file at the root of the directory
3. Copy the contents of the [.env.sample](./.env.sample) file at the root of the directory, and paste into the .env file. The .env.sample file contains template environment variables.

- `NHS_ENVIRONMENT` - is set to the current environment ('dev' for OpenTest and 'test' for PTL environment) in which the container is deployed. It is populated by the pipeline.gocd.yml
- `SERVICE_URL` -
- `REPOSITORY_URI` - This is prepopulated by `tasks` (based on `IMAGE_REPO_NAME`)
- `NODE_ENV` - set by the Docker files to be `local`
- `AUTHORIZATION_KEYS` - a comma-separated list of Authorization keys. These are taken from AWS Parameters Store in the 'dev' and 'test' environments.

4. If you would like to run locally, leave these blank, otherwise fill in the required fields.

## Starting the app

### Locally

1. Ensure you have done the above ['Set up' steps](#Set-up)
2. Run `npm run start:local`
3. If successful, you will be able to reach the Swagger docs: [http://localhost:3000/swagger/](http://localhost:3000/swagger/)

Note: `npm run start:nodemon` can be used to build the app before launching the Express server on port `3000` using [nodemon](https://www.npmjs.com/package/nodemon) - it will watch and reload the server upon any file changes.

### Productions Mode

A Docker image can be built locally with:

1. Run `npm run build`
2. Run `./tasks build_docker_local`. This builds the docker containers `deductions/<component-name>:<commit-no>` and `deductions/<component-name>:latest` with the app in.

## Swagger

The swagger documentation for the app can be found at [http://localhost:3000/swagger](http://localhost:3000/swagger). To update it, change the
`src/swagger.json` file. You can use [this editor](https://editor.swagger.io/) which will validate your changes.

## Tests

### Unit tests

Run the unit tests with `npm run test:unit` (or `npm test` to run it with lint). Alternatively `./tasks test` can be used to run the tests within Dojo.

### Integration tests

Run `npm run test:integration` or `./tasks test_integration` to run within Dojo.

### Coverage tests

Runs the coverage tests (unit test and integration test) and collects coverage metrics.

Run `npm run test:coverage` or `./tasks test_coverage` to run within Dojo.

### Local Docker tests

Run `./tasks test_docker_local`. Make sure you have followed the steps to start the app in production mode beforehand.

### Functional tests

Run `./tasks test_functional`. This will run the end to end tests within [./test/functional](./test/functional).

## Pre-commit Checks

Before commiting, ensure you run the following tests:

1. Unit tests
2. Integration tests
3. Coverage tests (ensure that the files you are commiting are 100% covered by tests)
4. Local docker test
