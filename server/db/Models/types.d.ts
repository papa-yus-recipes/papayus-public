import type { Document } from "dynamoose/dist/Document";
import type { ModelType } from "dynamoose/dist/General";
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
  | ModelType<Document>;

export type AttributeDefinition = Exclude<SchemaDefinition[string], AttributeType | any[]>;

export interface HasId {
  id: string;
}

export type HasTimestamps = Record<keyof TimestampObject, Date>;
