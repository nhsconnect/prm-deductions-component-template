import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendStatus(200).send('hello world authenticated');
});

export default router;
