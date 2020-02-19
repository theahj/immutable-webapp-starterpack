terraform {
    required_version = ">= 0.12"
}

provider "aws" {
  region = "eu-north-1"
  version = "~> 2.47"
}

resource "aws_s3_bucket" "assets" {
  bucket = "tf-assets-thea"
  acl = "public-read"

  tags = {
    managed_by = "terraform"
    environment = "common"
    system = "immutable-webapp"
  }
}

resource "aws_s3_bucket" "host" {
  bucket = "tf-host-thea"
  acl = "public-read"

  tags = {
    managed_by = "terraform"
    environment = "test"
    system = "immutable-webapp"
  }
}