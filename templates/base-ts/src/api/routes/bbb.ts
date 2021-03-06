import express from 'express';

import * as bbb from '../controllers/bbb';

export const joinToRouter = (mainRouter: express.Router) : void => {
  const bbbRouter = express.Router();
  mainRouter.use('/bbb', bbbRouter);

  bbbRouter.get('/', (req, res) => res.send('get'));
  bbbRouter.post('/', (req, res) => res.send('post'));
  bbbRouter.put('/', (req, res) => res.send('put'));
  bbbRouter.delete('/', (req, res) => res.send('delete'));

  bbbRouter.post('/registredErrorExample', bbb.registredErrorExample);
  bbbRouter.post('/unregistredErrorExample', bbb.unregistredErrorExample);
};
