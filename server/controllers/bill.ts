import Bill from '../models/bill';
import Customer from '../models/customer';
import Vehicle from '../models/vehicle';
import BaseCtrl from './base';

export default class BillCtrl extends BaseCtrl {

  model = Bill;
  customerModel = Customer;
  vehicleModel = Vehicle;

  insertBill = async (req, res) => {
    try {
      console.log(req.body);
      let customerData = {
      	name: req.body.customerName,
      	phone: req.body.phoneNumber,
      }
      console.log(customerData);
      
    let result = {};
    this.vehicleModel.findOne({ vehicleNumber: req.body.vehicleNumber }, async (err, vehicle) => {
    	if (!vehicle) {
    		let vehicles = { vehicleNumber: req.body.vehicleNumber, brand: '', customerId: customerData.phone } 
		    const vehicleData = await new this.vehicleModel(vehicles).save();	  
		    console.log("Vehicle Inserted")		
    	} else {
          var query = { vehicleNumber: req.body.vehicleNumber, customerId: customerData.phone },
		  update = { expire: new Date() },
		  options = { upsert: true, new: true, setDefaultsOnInsert: true };
    	    this.vehicleModel.findOneAndUpdate(query, update, options,async function(error, result) {
		    if (error) return;
		    console.log('Vehicle Updated');	
		    // do something with the document
		});
    	}
    })	
 	this.customerModel.findOne({ phone: customerData.phone }, async (err, user) => {
      if (!user) { 
		  		      	  
      	  const customerDetail = await new this.customerModel(customerData).save();
      	  const billData = await new this.model(req.body).save();
      	  result['userStatus'] = 'inserted';
      	  result['userData'] = customerDetail;
      	  result['billStatus'] = true;
      	  result['billData'] = billData;
      	  // console.log(customerDetail);	
      	  // const customerDetail = await new this.customerModel(customerData).save();
      } else {
          const customerDetail = await new this.customerModel(customerData).save();
      	  const billData = await new this.model(req.body).save();
      	  result['userStatus'] = 'updated';
      	  result['userData'] = {};
      	  result['billStatus'] = true;
      	  result['billData'] = billData;

      	  var query = { phone: customerData.phone },
		  update = { expire: new Date() },
		  options = { upsert: true, new: true, setDefaultsOnInsert: true };

		// Find the document
		this.customerModel.findOneAndUpdate(query, update, options,async function(error, result) {
		    if (error) return;
		    console.log('Updated');	
		    // do something with the document
		});
      }
      // user.comparePassword(req.body.password, (error, isMatch) => {
      //   if (!isMatch) { return res.sendStatus(403); }
      //   const token = jwt.sign({ user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
      //   res.status(200).json({ token });
      // });
    });	
    res.status(201).json(result);
      // var query = { phone: customerData.phone },
      // update = { expire: new Date() },
      // options = { upsert: true, new: true, setDefaultsOnInsert: true };

// Find the document


	// this.customerModel.findOneAndUpdate(query, update, options, function(error, result) {
	//     if (error) return;

	//     // do something with the document
	// });

     
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }	
}
