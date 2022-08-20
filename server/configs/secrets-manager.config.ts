import getEnvVar from "./getEnvVar";

export const secrets_manager_config = {
  jwt_token_secrets_name: getEnvVar("AWS_SECRETS_MANAGER_JWT_TOKEN_SECRETS_NAME"),
  ttl: +getEnvVar("AWS_SECRETS_MANAGER_TTL")
};
