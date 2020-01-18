import Bill from '../models/bill';
import Spare from '../models/spare';
import Work from '../models/work';
abstract class BaseCtrl {

  abstract model: any;
  bill = Bill;
  work = Work;

  spare = Spare;

  // Get all

  // getCounts= async (req,res) => {
 
    
  getCounts = async (req,res) => { 

    let docs = { bills: 0 };


    try {
      docs.bills = await await this.model.count({});
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

  }
  getAll = async (req, res) => {
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
  // Count all
  count = async (req, res) => {
    try {
      const count = await this.model.count();
      res.status(200).json(count);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Insert
  insert = async (req, res) => {
    try {

      req.body.createdAt = new Date();
      console.log(req.body);  
      console.log('empty');
      const obj = await new this.model(req.body).save();
      res.status(201).json(obj);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Get by id
  get = async (req, res) => {
    try {
      const obj = await this.model.findOne({ _id: req.params.id });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
 

  // Update by id
  update = async (req, res) => {
    try {
      await this.model.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Delete by id
  delete = async (req, res) => {
    try {
      await this.model.findOneAndRemove({ _id: req.params.id });
      res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // getDistinct = async (req, res) => {
  //   console.log(req)
  //   try {
  //     await this.model.distinct('vehicleNumber');
  //     res.sendStatus(200);
  //   } catch (err) {
  //     return res.status(400).json({ error: err.message });
  //   }
  // }
  getDistinct = async (req, res) => {
    console.log(req.body);
    try {
      const docs = await this.model.distinct(req.body.key);
      const allData = await this.model.find({ [req.body.key]: docs })
      res.status(200).json(allData);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default BaseCtrl;
