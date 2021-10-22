const { hostname, port } = require('./config');
const initServer = require('./server');



initServer(hostname, port);
