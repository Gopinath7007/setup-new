import * as mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: String,
  brand: String
});

const Vechicle = mongoose.model('Bill', vehicleSchema);

export default Vechicle;
