import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  }
}); 