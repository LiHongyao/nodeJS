const router = require('koa-router')();
const user = require('./user');
router.use(user);
module.exports = router;