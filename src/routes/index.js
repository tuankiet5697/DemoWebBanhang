const HomeRouter = require('./home');
const SPRouter  = require('./sanpham');
const QLRouter = require('./quanlysp');

function route(app){
    
    app.use('/', HomeRouter);
    app.use('/sanpham',SPRouter);
    app.use('/quanly',QLRouter);
    
}
module.exports = route;