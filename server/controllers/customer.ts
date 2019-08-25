import Customer from '../models/customer';
import BaseCtrl from './base';

export default class CustomerCtrl extends BaseCtrl {

  model = Customer;

  addCustomer = (req, res) => {
    this.model.findOne({ phone: req.body.phone }, (err, user) => {
      if (!user) {
       return res.sendStatus(403);
       console.log(req.body.phone + "Already Not Exists") 
      } else {
       console.log(req.body.phone + "Already Exists") 
      }
       
    });
  }
  
}
