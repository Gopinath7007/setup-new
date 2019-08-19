import * as express from 'express';

import CatCtrl from './controllers/cat';
import WorkCtrl from './controllers/work';
import UserCtrl from './controllers/user';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const workCtrl = new WorkCtrl();

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
