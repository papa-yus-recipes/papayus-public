import getEnvVar from "./getEnvVar";

export const server_config = {
  port: +getEnvVar("PORT"),
  hostname: getEnvVar("HOSTNAME")
};
