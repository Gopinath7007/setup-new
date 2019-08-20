import * as mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  total: String,
  works: Object[]
});

const Bill = mongoose.model('Bill', billSchema);

export default Bill;
