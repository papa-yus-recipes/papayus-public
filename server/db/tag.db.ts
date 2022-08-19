import type { TagKey } from "./Models/Tag.types";

import { Tag } from "./Models";

export const getTag = (key: TagKey) => Tag.get(key);
