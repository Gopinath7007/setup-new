import * as express from 'express';

import CatCtrl from './controllers/cat';
import WorkCtrl from './controllers/work';
import UserCtrl from './controllers/user';
import BillCtrl from './controllers/bill';
import SpareCtrl from './controllers/spare';
import CustomerCtrl from './controllers/customer';
import VehicleCtrl from './controllers/vehicle';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const workCtrl = new WorkCtrl();
  const billCtrl = new BillCtrl();
  const spareCtrl = new SpareCtrl();
  const customerCtrl = new CustomerCtrl();
  const vehicleCtrl = new VehicleCtrl();
   
  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Works
  router.route('/works').get(workCtrl.getAll);
  router.route('/works/count').get(workCtrl.count);
  router.route('/work').post(workCtrl.insert);
  router.route('/work/:id').get(workCtrl.get);
  router.route('/work/:id').put(workCtrl.update);
  router.route('/work/:id').delete(workCtrl.delete);


  // Billing
  router.route('/bills').get(billCtrl.getAll);
  router.route('/bills/count').get(billCtrl.count);
  router.route('/bill').post(billCtrl.insertBill);
  router.route('/bill/:id').get(billCtrl.get);
  router.route('get/bill/:id').put(billCtrl.update);
  router.route('/bill/:id').delete(billCtrl.delete);
  router.route('/distinct').post(billCtrl.getDistinct);

  // Customer
  router.route('/customer').post(customerCtrl.insert);


  // spares
  router.route('/spares').get(spareCtrl.getAll);
  router.route('/spares/count').get(spareCtrl.count);
  router.route('/spare').post(spareCtrl.insert);
  router.route('/spare/:id').get(spareCtrl.get);
  router.route('/spare/:id').put(spareCtrl.update);
  router.route('/spare/:id').delete(spareCtrl.delete);

  // vehicles
  router.route('/vehicles').get(vehicleCtrl.getAll);
  router.route('/vehicles/count').get(vehicleCtrl.count);
  router.route('/vehicle').post(vehicleCtrl.insert);
  router.route('/vehicle/:id').get(vehicleCtrl.get);
  router.route('/vehicle/:id').put(vehicleCtrl.update);
  router.route('/vehicle/:id').delete(vehicleCtrl.delete);


  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
