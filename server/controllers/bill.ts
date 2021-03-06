import Bill from '../models/bill';
import Customer from '../models/customer';
import Vehicle from '../models/vehicle';
import Spare from '../models/spare';
import Work from '../models/work';
import BaseCtrl from './base';

export default class BillCtrl extends BaseCtrl {

  model = Bill;
  customerModel = Customer;
	vehicleModel = Vehicle;
	spareModel = Spare;
  getBills = async (req, res) => {
    console.log(req.query);
   
    try {
      let docs = { data: [], count: 0 };
      let result = { data: [], count: 0 };;
      if(req.query.from) {
        let search = "\"" + req.query.search+  "\"" ;
        let status = req.query.status;
        
        // string.replace(""", '');
        // string.replace(""", '');
        
        search = ".*" + search +".*";
        search = search.replace('"', '');
        search = search.replace('"', '');
        // console.log( search)
        let from = new Date();
        let to = new Date();
        if(req.query.from === '' || req.query.to === '') {
          from = new Date();
          to = new Date();
          from.setDate(to.getDate() - 1);
          to.setDate(to.getDate() + 1);
          console.log("Currrent Date Set")
        } else {
          from = new Date(req.query.from) ;
          to = new Date(req.query.to);
          // from.setHours(0,0,0);
          // to.setHours(59,59,59);
          // from.setDate(from.getDate() +1);
          // to.setDate(to.getDate() +1);
          console.log("Actual Date")
        }

        var moment = require('moment');

        
        // let startNew = `${from.getFullYear()}-${from.getMonth()+1}-${from.getDay()}`;
        // let endNew = `${to.getFullYear()}-${to.getMonth()+1}-${to.getDay()}`;
        // var start = moment( startNew, "YYYY-MM-DD").toArray();
        // var end = moment(endNew, "YYYY-MM-DD").toArray();

        // console.log(start);
        // console.log( end);
        console.log(to.getFullYear(),to.getMonth() + 1,to.getDate());
        console.log( from.getFullYear(),from.getMonth()+ 1,from.getDate());
        
        result.data = await this.model.find({
          customerName: { 
            $regex: search, 
            '$options': 'i'
          },
          // vehicleNumber: req.query.search,
          status: status,
          'createdAt': {
            '$lt': new Date(to),
            '$gt': new Date(from)
          },

          // 'createdAt': {
          //   $lte: new Date(`${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`) ,
          //   $gte: new Date(`${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`)
            
          // },
          // 'createdAt': {
          //   $date: new Date(`${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`), 
          //   // $lte: new Date(`${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`) 
          // }
          
        }).skip(req.query.count * req.query.page).limit(Number(req.query.count));      

        result.count = await this.model.count({
          customerName: { 
            $regex: search, 
            '$options': 'i'
          },
          // vehicleNumber: req.query.search,
          status: status,
          'createdAt': {
            '$lt': new Date(to),
            '$gt': new Date(from)
          },
        });

        console.log('bills')
      } else {
        result.data = await this.model.find({});
        result.count = await this.model.count({});
        console.log('Non Bills')
      }
      
      res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  getCounts = async (req, res) => {
    console.log("====================================")
    // let docs = {
    //   bills: {},
    //   spares: {},
    //   works: {},      
    // }
    try {

      let docs = {
			bills: 0,
			spares: 0,
			vehicles: 0,
			works: 0
	  } 
      docs.bills = await this.model.count({});
      docs['works'] = await Work.count({});
			docs['spares'] = await Spare.count({});
			docs['vehicles'] = await Vehicle.count({});
	  console.log(docs)
	  console.log("==================")

      res.send(docs);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    

    // let bills = await this.model.find({

    // });
    // res.status(200).json(docs);
  } 

  insertBill = async (req, res) => {
    try {


		const Nexmo = require('nexmo');

		const nexmo = new Nexmo({
		  apiKey: '9e4f9e2a',
		  apiSecret: '7ghOOW4XRfWMEFpP',
		});
		
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
			
			const from = 'AcmeInc';
			const to = billData.phoneNumber;
			const text = 'Hi, Your approximate bill amount ' +  billData.amount;
			nexmo.message.sendSms(from, `91${to}`, text);
      	  // console.log(customerDetail);	
      	  // const customerDetail = await new this.customerModel(customerData).save();
      } else {
          const customerDetail = await new this.customerModel(customerData).save();
		  const billData = await new this.model(req.body).save();
		
		  
		  const from = 'AcmeInc';
		  const to = billData.phoneNumber;
		  const text = 'Hi, Your approximate bill amount ' +  billData.amount;
		  console.log(`91${to}`);
		  nexmo.message.sendSms(from, `91${to}`, text);

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
