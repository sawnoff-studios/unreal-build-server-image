# Unreal Build Server Image

Builds an EC2 Image Builder image for an Unreal Build Server

## Required IAM policy:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "cloudformation:CreateStack",
                "cloudformation:DescribeStacks",
                "cloudformation:CreateChangeSet",
                "cloudformation:DescribeChangeSet",
                "cloudformation:DescribeEvents",
                "cloudformation:DeleteChangeSet",
                "cloudformation:ExecuteChangeSet",
                "cloudformation:DeleteStack",
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
                "iam:CreateServiceLinkedRole",
                "iam:PassRole",
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
                "imagebuilder:GetImageRecipe",
                "imagebuilder:GetInfrastructureConfiguration",
                "imagebuilder:GetDistributionConfiguration",
                "imagebuilder:UpdateInfrastructureConfiguration",
                "imagebuilder:UpdateDistributionConfiguration",
                "s3:CreateBucket",
                "s3:PutEncryptionConfiguration",
                "s3:DeleteBucket",
                "s3:PutBucketVersioning",
                "s3:PutBucketPublicAccessBlock",
                "imagebuilder:StartImagePipelineExecution",
                "SNS:Publish"
            ],
            "Resource": "*"
        }
    ]
}
```