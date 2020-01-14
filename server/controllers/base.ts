abstract class BaseCtrl {

  abstract model: any;

  // Get all
  getAll = async (req, res) => {
    console.log(req.query);
   
    try {
      let docs = {};
      if(req.query.date) {
        let search = "\"" + req.query.search+  "\"" ;
        let status = req.query.status;
        
        // string.replace(""", '');
        // string.replace(""", '');
        
        search = ".*" + search +".*";
        search = search.replace('"', '');
        search = search.replace('"', '');
        console.log( search)
        docs = await this.model.find({
          customerName: { 
            $regex: search, 
            '$options': 'i'
          },
          status: status
        });        
        console.log('bills')
      } else {
        docs = await this.model.find({});
        console.log('Non Bills')
      }
      
      res.status(200).json(docs);
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
