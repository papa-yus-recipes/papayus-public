import type { ITag } from "./Models/Tag.types";

import { Tag } from "./Models";

export const getTag = (name: ITag["name"]) => Tag.get(name);
