import * as express from 'express';

import CatCtrl from './controllers/cat';
import WorkCtrl from './controllers/work';
import ChannelCtrl from './controllers/channel';
import UserCtrl from './controllers/user';
import BillCtrl from './controllers/bill';
import SpareCtrl from './controllers/spare';
import CustomerCtrl from './controllers/customer';
import VehicleCtrl from './controllers/vehicle';
import TaxCtrl from './controllers/tax';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const workCtrl = new WorkCtrl();
  const taxCtrl = new TaxCtrl();
  const channelCtrl = new ChannelCtrl();
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
  router.route('/works').get(workCtrl.getWorks);
  router.route('/getWorks').get(workCtrl.getWorks);
  router.route('/works/count').get(workCtrl.count);
  router.route('/work').post(workCtrl.insert);
  router.route('/work/:id').get(workCtrl.get);
  router.route('/work/:id').put(workCtrl.update);
  router.route('/work/:id').delete(workCtrl.delete);


    // Taxes
    router.route('/taxes').get(taxCtrl.getAll);
    router.route('/taxes/count').get(taxCtrl.count);
    router.route('/taxes/getTaxes').get(taxCtrl.getTaxes);
    router.route('/tax').post(taxCtrl.insert);
    router.route('/tax/:id').get(taxCtrl.get);
    router.route('/tax/:id').put(taxCtrl.update);
    router.route('/tax/:id').delete(taxCtrl.delete);

    
  // Channels
  router.route('/channels').get(channelCtrl.getAll);
  router.route('/channels/count').get(channelCtrl.count);
  router.route('/channel').post(channelCtrl.insert);
  router.route('/channel/:id').get(channelCtrl.get);
  router.route('/channel/:id').put(channelCtrl.update);
  router.route('/channel/:id').delete(channelCtrl.delete);


  // Billing
  router.route('/bills').get(billCtrl.getAll);
  router.route('/getCounts').get(billCtrl.getCounts);
  router.route('/getBills').get(billCtrl.getBills);
  router.route('/bills/count').get(billCtrl.count);
  router.route('/bill').post(billCtrl.insertBill);
  router.route('/bill/:id').get(billCtrl.get);
  router.route('/bill/:id').put(billCtrl.update);
  router.route('/bill/:id').delete(billCtrl.delete);
  router.route('/distinct').post(billCtrl.getDistinct);
  router.route('/downloadBill').post(billCtrl.downloadBill);
  router.route('/bills/getCounts').get(billCtrl.getCounts);

  // Customer
  router.route('/customer').post(customerCtrl.insert);


  // spares
  router.route('/spares').get(spareCtrl.getAll);
  router.route('/getSpares').get(spareCtrl.getSpares);
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
