workflow "Build and deploy on push" {
  on = "push"
  resolves = [
    "NPM Build",
    "Copy Files to S3",
  ]
}

action "NPM Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm install"
}

action "NPM Build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = [ "NPM Install" ]
  runs = "npm run build"
}

action "Terraform Init" {
  uses = "hashicorp/terraform-github-actions/init@v0.2.0"
  secrets = [
    "GITHUB_TOKEN",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
  ]
  env = {
    TF_ACTION_WORKING_DIR = "terraform"
  }
}

action "Terraform Plan" {
  uses = "hashicorp/terraform-github-actions/plan@v0.2.0"
  needs = "Terraform Init"
  secrets = [
    "GITHUB_TOKEN",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
  ]
  env = {
    TF_ACTION_WORKSPACE = "prod"
    TF_ACTION_WORKING_DIR = "terraform"
    TF_ACTION_COMMENT = "false"
  }
  args = "-out prod.tfplan -var deploy_iam_role=arn:aws:iam::232825056036:role/LandingPageDeployAssumeRole"
}

action "Terraform Apply" {
  uses = "samelogic/github-actions/terraform-apply@v1.0"
  needs = [
    "Terraform Plan",
    "NPM Build",
  ]
  secrets = [
    "GITHUB_TOKEN",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
  ]
  env = {
    TF_ACTION_WORKING_DIR = "terraform"
    TF_ACTION_WORKSPACE = "prod"
    TF_ACTION_COMMENT = "false"
  }
}

action "Copy Files to S3" {
  uses = "samelogic/github-actions/aws@v1.0"
  needs = [ "Terraform Apply" ]
  secrets = [ "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY" ]
  env = {
    ROLE_ARN = "arn:aws:iam::232825056036:role/LandingPageDeployAssumeRole"
  }
  args = "s3 sync dist/ s3://samelogic.com/ --delete"
}
