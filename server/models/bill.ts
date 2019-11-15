import * as mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  amount: Number,
  works: [],
  spares: [],
  customerName: String,
  vehicleNumber: String,
  phoneNumber: String,
  gstNumber: String,
  status: String,
});

const Bill = mongoose.model('Bill', billSchema);

export default Bill;
