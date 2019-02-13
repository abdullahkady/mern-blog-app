const mongoose = require('mongoose');
const app = require('./app');
const CONFIG = require('./config');

const bootServer = async () => {
  try {
    // For the new MongoDB driver: https://mongoosejs.com/docs/deprecations.html
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

    await mongoose.connect(CONFIG.MONGO_URI);
    app.listen(CONFIG.PORT, console.log(`Server started on port: ${CONFIG.PORT}`));
  } catch (error) {
    throw new Error('Mongo Connection failed');
  }
};

bootServer();
