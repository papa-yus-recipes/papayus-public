import type { ModelType } from "dynamoose/dist/General";
import type { Item } from "dynamoose/dist/Item";
import type { Schema, SchemaDefinition, TimestampObject } from "dynamoose/dist/Schema";

export type AttributeType =
  | string
  | StringConstructor
  | BooleanConstructor
  | NumberConstructor
  | BufferConstructor
  | DateConstructor
  | ObjectConstructor
  | ArrayConstructor
  | SetConstructor
  | symbol
  | Schema
  | ModelType<Item>;

export type AttributeDefinition = Exclude<SchemaDefinition[string], AttributeType | any[]>;

export type Item<T> = T & Item;

export type HasId = {
  id: string;
};

export type HasTimestamps<K = keyof TimestampObject> = Record<K, Date>;
