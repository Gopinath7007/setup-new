import Spare from '../models/spare';
import BaseCtrl from './base';

export default class SpareCtrl extends BaseCtrl {

  model = Spare;

  getSpares = async (req, res) => {
    let docs = {
      data: [],
      count: 0
    }
    
    let search = "\"" + req.query.search+  "\"" ;
    // let status = req.query.status;
    
    // string.replace(""", '');
    // string.replace(""", '');
    console.log(req.query);
    console.log("===============================");
    search = ".*" + search +".*";
    search = search.replace('"', '');
    search = search.replace('"', '');
    try {
      docs.data = await this.model.find({
        name: {
          $regex: search,
          '$options': 'i'
        }
      }).skip(req.query.count * req.query.page).limit(Number(req.query.count)); 

      docs.count = await this.model.count({
        name: {
          $regex: search,
          '$options': 'i'
        }
      })
      res.status(200).json(docs);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  
}
