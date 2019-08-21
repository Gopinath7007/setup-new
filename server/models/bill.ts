import * as mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  amount: Number,
  works: [[]]
});

const Bill = mongoose.model('Bill', billSchema);

export default Bill;
