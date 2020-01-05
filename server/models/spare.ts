import * as mongoose from 'mongoose';

const spareSchema = new mongoose.Schema({
  price: Number,
  availableItems: Number,
  hsnId: String,
  name: String,  
  type: String,
  brand: String
},{
  timestamps: true
});

const Spare = mongoose.model('Spare', spareSchema);

export default Spare;
