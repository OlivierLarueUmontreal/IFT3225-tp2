import { set, connect } from 'mongoose';

const connectDB = (url) => {
  set('strictQuery', true)
  return connect(url);
};

export default connectDB;