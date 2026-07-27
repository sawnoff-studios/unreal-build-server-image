const {
    SecretsManagerClient,
    GetSecretValueCommand
} = require("@aws-sdk/client-secrets-manager");

const jwt = require("jsonwebtoken");

const secretsManager = new SecretsManagerClient({});

const GITHUB_API = "https://api.github.com";

async function getSecret(secretName) {
    const command = new GetSecretValueCommand({
        SecretId: secretName
    });

    const response = await secretsManager.send(command);

    return JSON.parse(response.SecretString);
}

function createGitHubAppJWT(appId, privateKey) {
    const now = Math.floor(Date.now() / 1000);

    return jwt.sign(
        {
            iat: now - 60,
            exp: now + (10 * 60),
            iss: appId
        },
        privateKey,
        {
            algorithm: "RS256"
        }
    );
}

async function getInstallationToken(
    appJWT,
    installationId
) {
    const response = await fetch(
        `${GITHUB_API}/app/installations/${installationId}/access_tokens`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${appJWT}`,
                "Accept": "application/vnd.github+json"
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to get installation token: ${response.status} ${await response.text()}`
        );
    }

    const body = await response.json();

    return body.token;
}

async function createRunnerRegistrationToken(
    installationToken,
    organization
) {
    const response = await fetch(
        `${GITHUB_API}/orgs/${organization}/actions/runners/registration-token`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${installationToken}`,
                "Accept": "application/vnd.github+json"
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to create runner token: ${response.status} ${await response.text()}`
        );
    }

    const body = await response.json();

    return body.token;
}

exports.handler = async () => {
    const secret = await getSecret(
        process.env.SECRETS_MANAGER_KEY_NAME
    );
    
    const appJWT = createGitHubAppJWT(
        secret.app_id,
        atob(secret.private_key)
    );

    const installationToken =
        await getInstallationToken(
            appJWT,
            secret.installation_id
        );

    const runnerToken =
        await createRunnerRegistrationToken(
            installationToken,
            process.env.GITHUB_ORGANISATION
        );

    return {
        statusCode: 200,

        body: JSON.stringify({
            token: runnerToken
        })
    };
};