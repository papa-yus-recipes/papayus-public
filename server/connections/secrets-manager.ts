import { SecretsManagerCache } from "aws-secrets-manager-cache";

import type { JwtTokenSecrets, SecretsManagerOptions } from "./types";

import { secrets_manager_config } from "configs";

class SecretsManager extends SecretsManagerCache {
  #jwt_token_secrets_name: string;

  constructor(options: SecretsManagerOptions) {
    super({ ttl: secrets_manager_config.ttl, ...options });

    this.#jwt_token_secrets_name = options.jwt_token_secrets_name;
  }

  async getJwtWebTokenSecrets() {
    return <JwtTokenSecrets>(<any>await this.getSecret(this.#jwt_token_secrets_name, true));
  }
}

export const secrets_manager = new SecretsManager({
  jwt_token_secrets_name: secrets_manager_config.jwt_token_secrets_name
});
