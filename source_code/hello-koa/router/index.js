const router = require('koa-router')();
const user = require('./user');
const orders = require('./orders');

router.use('/user', user);
router.use('/orders', orders);

module.exports = router;