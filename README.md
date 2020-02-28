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

