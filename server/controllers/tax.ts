import Tax from '../models/tax';
import BaseCtrl from './base';

export default class TaxCtrl extends BaseCtrl {

  model = Tax;

  getTaxes = async (req, res) => {
    try {
      const obj = await this.model.find({});
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  
}
