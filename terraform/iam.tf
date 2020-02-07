data "aws_iam_policy_document" "ecs-assume-role-policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = [
        "ecs-tasks.amazonaws.com"
      ]
    }
  }
}

resource "aws_iam_role" "component-ecs-role" {
  name               = "${var.environment}-${var.component_name}-EcsTaskRole"
  assume_role_policy = data.aws_iam_policy_document.ecs-assume-role-policy.json
  description        = "Role assumed by ${var.component_name} ECS task"
}

data "aws_iam_policy_document" "ssm_policy_doc" {
  statement {
    actions = [
      "secretsmanager:*",
    ]

    resources = [
      "*"
    ]
  }
}

resource "aws_iam_policy" "ssm_policy" {
  name   = "${var.environment}-${var.component_name}-ssm"
  policy = "${data.aws_iam_policy_document.ssm_policy_doc.json}"
}

resource "aws_iam_role_policy_attachment" "ssm_police_attach" {
  role       = "${aws_iam_role.component-ecs-role.name}"
  policy_arn = aws_iam_policy.ssm_policy.arn
}