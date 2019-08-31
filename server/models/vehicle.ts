import * as mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: String,
  brand: String,
  customerId: String
});

const Vechicle = mongoose.model('Vehicle', vehicleSchema);

export default Vechicle;
