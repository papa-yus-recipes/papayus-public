import { SecretsManagerCache } from "aws-secrets-manager-cache";

import { secrets_manager_config } from "configs";

class SecretsManager extends SecretsManagerCache {
  #jwt_token_secrets_name: string;

  constructor(options: Omit<typeof secrets_manager_config, "ttl">) {
    super({ ttl: secrets_manager_config.ttl, ...options });

    this.#jwt_token_secrets_name = options.jwt_token_secrets_name;
  }

  getJwtWebTokenSecrets() {
    return <Promise<{ JWT_ACCESS_TOKEN_SECRET: string; JWT_REFRESH_TOKEN_SECRET: string }>>(
      (<Promise<any>>this.getSecret(this.#jwt_token_secrets_name, true))
    );
  }
}

export const secrets_manager = new SecretsManager({
  jwt_token_secrets_name: secrets_manager_config.jwt_token_secrets_name
});
