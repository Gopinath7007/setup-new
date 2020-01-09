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
    //   console.log(req.body);
      let customerData = {
      	name: req.body.customerName,
				phone: req.body.phoneNumber,
				customerAddress:req.body.customerAddress
      }
    //   console.log(customerData);
      
    let result = {};
    this.vehicleModel.findOne({ vehicleNumber: req.body.vehicleNumber }, async (err, vehicle) => {
    	if (!vehicle) {
    		let vehicles = { vehicleNumber: req.body.vehicleNumber, brand: '', customerId: customerData.phone } 
		    const vehicleData = await new this.vehicleModel(vehicles).save();	  
		    // console.log("Vehicle Inserted")		
    	} else {
          var query = { vehicleNumber: req.body.vehicleNumber, customerId: customerData.phone },
		  update = { expire: new Date() },
		  options = { upsert: true, new: true, setDefaultsOnInsert: true };
    	    this.vehicleModel.findOneAndUpdate(query, update, options,async function(error, result) {
		    if (error) return;
		    // console.log('Vehicle Updated');	
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
		    // console.log('Updated');	
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

	downloadBills = async function(req, res) {

		var excel = require('excel4node');

		var workbook = new excel.Workbook();
		
		var workbook = workbook.addWorksheet('report 1');
		var workbook = workbook.addWorksheet('report 2');
		res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + workbook);

		workbook.cell(2,1).string('string');
		await workbook.write('report.xlsx', res);
		res.end();
	};
	

	downloadBill = async (data,res) => {
					// Require library

				
			var xl = require('excel4node');
			
			// Create a new instance of a Workbook class
			var wb = new xl.Workbook();
			
			// Add Worksheets to the workbook
			var ws = wb.addWorksheet('Sheet 1');
			var ws2 = wb.addWorksheet('Sheet 2');
			var ws3 = wb.addWorksheet('Sheet 2');
			
			
			// Create a reusable style
			var style = wb.createStyle({
				font: {
					color: 'green',
					size: 12,
				},
			});
			
			var styleHeading = wb.createStyle({
				font: {
					color: 'green',
					size: 13,
					bold: true					
				}
			});
			
		
			// Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
	
			console.log(data.body);
			console.log('data.body.spares');

			
			ws.cell(5, 1)
			.string('S.NO')
			.style(styleHeading);
		
			ws.cell(5, 2)
			.string('Product/Service')
			.style(styleHeading);

			ws.cell(5, 3)
			.string('HsnId/ Tax Id')
			.style(styleHeading);

			ws.cell(5, 4)
			.string('Price Mrp')
			.style(styleHeading);
		
			ws.cell(5, 5)
			.string('Quantity')
			.style(styleHeading);

			ws.cell(5, 6)
			.string('Total')
			.style(styleHeading);
			
			ws.cell(5, 7)
			.string('Taxable Value')
			.style(styleHeading);
			
			ws.cell(5, 8)
			.string('CGST %')
			.style(styleHeading);

			ws.cell(5, 9)
			.string('SGST %')
			.style(styleHeading);
			
			

			// if(data.body.spares.length > 0) {
				data.body.spares.map((item, index)=> {
					function calculateGst() {
						let totalTax = item.hsnId.cGst + item.hsnId.sGst;
						var mrp =  (item.price * totalTax /100) + item.price;
						return mrp * item.count;
					} 
					ws.cell(index+6, 1)
					.number(index + 1)
					.style(style);

					ws.cell(index+6, 2)
					.string(item.name)
					.style(style);

					ws.cell(index+6, 3)
					.string(item.hsnId.hsnId)
					.style(style);

					ws.cell(index+6, 4)
					.number(item.price)
					.style(style);
				

					ws.cell(index+6, 5)
					.number(item.count)
					.style(style);
					
					ws.cell(index+6, 6)
					.number(calculateGst())
					.style(style);
						
					ws.cell(index+6, 7)
					.number(calculateGst())
					.style(style);
						
					ws.cell(index+6, 8)
					.number(item.hsnId.cGst)
					.style(style);

						
					ws.cell(index+6, 9)
					.number(item.hsnId.sGst)
					.style(style);
					
				})		
			// }	

			res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			res.setHeader("Content-Disposition", "attachment; filename=" + wb);
			
			wb.write('Excel.xlsx');
			// wb.write('ExcelOne.xlsx',  res);
			// wb.write('ExcelFile.xlsx', res);
	}
}
