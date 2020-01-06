import * as mongoose from 'mongoose';
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const TaxSchema = new mongoose.Schema({
  name: String,
  hsnId: String,
  cGst: Number,
  sGst: Number
});

// TaxSchema.plugin(AutoIncrement, {id: 'inhabitant_seq', inc_field: 'hsnId', reference_fields: ['name'] });

const Tax = mongoose.model('Tax', TaxSchema);

export default Tax;

