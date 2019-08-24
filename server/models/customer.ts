import * as mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Customer = mongoose.model('Bill', customerSchema);

export default Customer;
