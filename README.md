# Unreal Build Server Image

Builds an EC2 Image Builder AMI for an Unreal Engine build server

# Architecture

![Unreal Build Server Image architecture diagram](architecture.png)

## Required IAM roles:

- AmazonS3FullAccess
- AWSCloudFormationFullAccess
- AWSLambda_FullAccess

## Required IAM policy:

```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"iam:CreateInstanceProfile",
				"iam:DeleteInstanceProfile",
				"iam:CreatePolicy",
				"iam:CreateRole",
				"iam:DeleteRole",
				"iam:DeletePolicy",
				"iam:AttachRolePolicy",
				"iam:DetachRolePolicy",
				"iam:AddRoleToInstanceProfile",
				"iam:RemoveRoleFromInstanceProfile",
				"iam:GetRolePolicy",
				"iam:PutRolePolicy",
				"iam:DeleteRolePolicy",
				"iam:GetRole",
				"iam:TagRole",
				"iam:GetInstanceProfile",
				"imagebuilder:CreateDistributionConfiguration",
				"imagebuilder:CreateComponent",
				"imagebuilder:CreateImagePipeline",
				"imagebuilder:CreateInfrastructureConfiguration",
				"imagebuilder:CreateImageRecipe",
				"imagebuilder:DeleteDistributionConfiguration",
				"imagebuilder:DeleteComponent",
				"imagebuilder:DeleteImagePipeline",
				"imagebuilder:DeleteInfrastructureConfiguration",
				"imagebuilder:DeleteImageRecipe",
				"imagebuilder:GetComponent",
				"imagebuilder:GetImage",
				"imagebuilder:GetImageRecipe",
				"imagebuilder:GetImagePipeline",
				"imagebuilder:GetInfrastructureConfiguration",
				"imagebuilder:GetDistributionConfiguration",
				"imagebuilder:UpdateInfrastructureConfiguration",
				"imagebuilder:UpdateDistributionConfiguration",
				"imagebuilder:StartImagePipelineExecution",
				"SNS:Publish",
				"secretsmanager:CreateSecret",
				"secretsmanager:GetSecretValue",
				"secretsManager:DeleteSecret",
				"secretsManager:UpdateSecret"
			],
			"Resource": "*"
		},
        {
            "Effect": "Allow",
            "Action": "iam:CreateServiceLinkedRole",
            "Resource": "arn:aws:iam::*:role/aws-service-role/://amazonaws.com",
            "Condition": {
                "StringLike": {
                    "iam:AWSServiceName": "spotfleet.amazonaws.com"
                }
            }
        },
        {
            "Effect": "Allow",
            "Action": "iam:PassRole",
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "iam:PassedToService": [
                        "ec2.amazonaws.com",
                        "ec2.amazonaws.com.cn"
                    ]
                }
            }
        }
	]
}
```