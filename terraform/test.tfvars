environment          = "test"
component_name       = "generic-component"
dns_name             = "generic-component"
repo_name            = "prm-deductions-component-template"

task_cpu             = 256
task_memory          = 512
port                 = 3000

service_desired_count   = "2"

alb_deregistration_delay = 15