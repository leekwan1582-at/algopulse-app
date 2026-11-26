const { Router } = require('express');
const s = require('../controllers/strategyController');
const { getOrders } = require('../controllers/orderController');
const { runBacktest } = require('../controllers/backtestController');

// Express 5 forwards rejected promises to the error handler automatically.
const router = Router();

router.get('/strategies', s.getStrategies);
router.get('/strategies/:id', s.getStrategyById);
router.post('/strategies', s.createStrategy);
router.put('/strategies/:id', s.updateStrategy);
router.patch('/strategies/:id/status', s.toggleStrategy);
router.delete('/strategies/:id', s.deleteStrategy);

router.get('/orders', getOrders);
router.post('/backtest', runBacktest);

module.exports = router;
