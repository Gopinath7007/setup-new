import * as mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
