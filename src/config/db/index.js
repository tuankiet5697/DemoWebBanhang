const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/VuaKhoaiNamTinh', {
              useNewUrlParser: true,
              useUnifiedTopology: true
        });
            console.log('Kết Nối Thành Công!');
      } catch (error) {
            console.log('Kết Nối Thất Bại!');
      }
}

module.exports = { connect };