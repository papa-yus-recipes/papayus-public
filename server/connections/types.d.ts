import type { secrets_manager_config } from "configs";

export type SecretsManagerOptions = Omit<typeof secrets_manager_config, "ttl">;

export type JwtTokenSecrets = Record<
  "JWT_ACCESS_TOKEN_SECRET" | "JWT_REFRESH_TOKEN_SECRET",
  string
>;
