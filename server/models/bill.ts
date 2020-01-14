import * as mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  amount: Number,
  amountPaid: Number,
  works: [],
  spares: [],
  customerName: String,
  customerAddress: String,
  vehicleNumber: String,
  phoneNumber: String,
  gstNumber: String,
  status: String,
  gstStatus: String,
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
billSchema.index({ name: 'text'});
billSchema.index({ name: 1 });
const Bill = mongoose.model('Bill', billSchema);

export default Bill;
