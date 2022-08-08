import { config } from "dotenv-safe";

// Initialize environment variables.
config();

import { server_config } from "configs";
import { server } from "connections";

server.listen(server_config.port, server_config.hostname, () =>
  console.log(`Listening on http://${server_config.hostname}:${server_config.port}`)
);
