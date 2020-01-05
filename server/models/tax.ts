import * as mongoose from 'mongoose';
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const TaxSchema = new mongoose.Schema({
  name: String,
  price: Number,
  hsnId: String,
  cGst: Number,
  sGst: Number,
  mrp: Number
});

// TaxSchema.plugin(AutoIncrement, {id: 'inhabitant_seq', inc_field: 'hsnId', reference_fields: ['name'] });

const Tax = mongoose.model('Tax', TaxSchema);

export default Tax;

