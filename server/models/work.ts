import * as mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  name: String,
  price: Number,
  hsnId: Object,
  total: Number
});

const Work = mongoose.model('Work', workSchema);

export default Work;

