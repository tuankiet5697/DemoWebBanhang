const SanPham = require('../Models/SanPham');
const {multipleMongooseToObject} = require('../../util/mongoose');
const {MongooseToObject} = require('../../util/mongoose');
class SPController {

    show(req, res, next){
        SanPham.find({})
        .then(sanpham => {
            res.render('SanPham/show',{
                sanpham: multipleMongooseToObject(sanpham)
            });
        })
        .catch(next);
    }
    detail(req, res, next){
        SanPham.findOne({ slug:req.params.slug })
        .then(sanpham =>{
            res.render('SanPham/detail', {
                sanpham: MongooseToObject(sanpham)});
        } )
        .catch(next);
    }
    getKhoaiLang(req, res, next){
        SanPham.find({loaiSP:'Khoai Lang'})
        .then(sanpham => {
            res.render('SanPham/getSP',{
                sanpham:multipleMongooseToObject(sanpham)});
        })
        .catch(next);
    }
    getBi(req, res, next){
        SanPham.find({loaiSP:'Bí Đỏ'})
        .then(sanpham => {
            res.render('SanPham/getSP',{
                sanpham:multipleMongooseToObject(sanpham)});
        })
        .catch(next);
    }
    getHanhTay(req, res, next){
        SanPham.find({loaiSP:'Hành Tây'})
        .then(sanpham => {
            res.render('SanPham/getSP',{
                sanpham:multipleMongooseToObject(sanpham)});
        })
        .catch(next);
    }
    getKhoaiTay(req, res, next){
        SanPham.find({loaiSP:'Khoai Tây'})
        .then(sanpham => {
            res.render('SanPham/getSP',{
                sanpham:multipleMongooseToObject(sanpham)});
        })
        .catch(next);
    }
    getToi(req, res, next){
        SanPham.find({loaiSP:'Tỏi'})
        .then(sanpham => {
            res.render('SanPham/getSP',{
                sanpham:multipleMongooseToObject(sanpham)});
        })
        .catch(next);
    }
    getot(req, res, next){
        SanPham.find({loaiSP:'Ớt'})
        .then(sanpham => {
            res.render('SanPham/getSP',{
                sanpham:multipleMongooseToObject(sanpham)});
        })
        .catch(next);
    }

}


module.exports = new SPController;