import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  gender: Boolean,
  dob: String,
  position: [String],
  avatar: String,
  createdBy: ObjectId,
  createdAt: { type: Date, default: Date.now },
  role_id: ObjectId
});