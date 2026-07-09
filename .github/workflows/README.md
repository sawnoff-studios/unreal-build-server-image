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
                "cloudformation:DeleteStack",
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
                "iam:CreateInstanceProfile",
                "iam:DeleteInstanceProfile"
            ],
            "Resource": "*"
        }
    ]
}
```