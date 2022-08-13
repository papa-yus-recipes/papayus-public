import getEnvVar from "./getEnvVar";

export const bcrypt_config = {
  salt: +getEnvVar("BCRYPT_SALT")
};
