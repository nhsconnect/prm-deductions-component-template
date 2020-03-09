import express from 'express';
import config from '../config';
const router = express.Router();

export const message = {
  version: '1.0.1',
  description: 'Health of Deduction PRM Component Template',
  status: 'running'
};

router.get('/', (req, res) => {
  res.status(200).json({ ...message, node_env: config.nodeEnv });
});

export default router;
