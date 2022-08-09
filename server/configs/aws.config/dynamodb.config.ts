import getEnvVar from "configs/getEnvVar";

export const dynamodb_config = {
  create: getEnvVar("AWS_DYNAMODB_CREATE") === "true"
};
