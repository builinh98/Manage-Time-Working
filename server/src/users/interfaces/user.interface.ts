import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string,
  readonly password: string,
  readonly firstname: string,
  readonly lastname: string,
  readonly gender: boolean,
  readonly dob: string,
  readonly position: [string],
  readonly avatar: string,
  readonly createdBy: string,
  readonly createdAt: Date,
  readonly role_id: string
}