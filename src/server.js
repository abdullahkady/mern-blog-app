const app = require('./app');
const CONFIG = require('./config');

const bootServer = async () => {
  app.listen(CONFIG.PORT, console.log(`Server started on port: ${CONFIG.PORT}`));
};

bootServer();
