import * as mongoose from 'mongoose';

const spareSchema = new mongoose.Schema({
  price: Number,
  availableItems: Number,
  hsnId: Object,
  name: String,  
  type: String,
  brand: String,
  total: Number
},{
  timestamps: true
});

const Spare = mongoose.model('Spare', spareSchema);

export default Spare;
