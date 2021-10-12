const SanPham = require('../Models/SanPham');
const {multipleMongooseToObject} = require('../../util/mongoose');
const {MongooseToObject} = require('../../util/mongoose');
const session = require('express-session');
const User = require('../Models/User');
class QLController {


    
    create(req, res, next){
        res.render('QuanLySP/create');
    }
    addnew(req, res, next){
        const formData = req.body;
        const sanpham = new SanPham(formData);
        if(req.file){
            sanpham.image = req.file.filename;
        }
        sanpham.save()
        .then(()=> res.redirect('/quanly/stored'))
        .catch(error =>{

        });
    }
    edit(req, res, next){
        SanPham.findById(req.params.id)
        .then(sanpham => res.render('QuanLySP/edit',{
            sanpham: MongooseToObject(sanpham)
        }))
        .catch(next);
    }

    stored(req,res,next){
        Promise.all([SanPham.find({}), SanPham.countDocumentsDeleted()])
        .then(([sanpham, deletedCount]) =>
        res.render('QuanLySP/stored',{
            deletedCount,
            sanpham: multipleMongooseToObject(sanpham)
        }))
        .catch(next);
    }

    update(req, res, next){
        SanPham.updateOne({ _id: req.params.id}, req.body)
        .then(() => res.redirect('/quanly/stored'))
        .catch(next);
    }

    destroy(req, res, next){
        SanPham.delete({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }

    trashProduct(req, res, next){
        SanPham.findDeleted({})
        .then(sanpham => res.render('QuanLySP/trash',{
            sanpham: multipleMongooseToObject(sanpham)
        }))
        .catch(next);
    }

    restore(req, res, next){
        SanPham.restore({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }

    forcedestroy(req, res, next){
        SanPham.deleteOne({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }

    login(req,res,next){
        
        if(req.session.isAuth){
            res.redirect('/quanly/menu');
        }
        else{
            res.render('QuanLySP/login');
        }
    }

    loginSuccess(req, res, next){
        User.findOne({username: req.body.username, password: req.body.password}, function(err,user){
            if(err) {
                console.log(err);
            }
            if(!user){  
                return res.json('Error!!');
            }
            if(user === true){
                req.session.user = user;
            }
            req.session.isAuth = true;
            if(req.session.isAuth){
                next();
            }else{
                res.redirect('QuanLySP/login');
            }
            
             res.redirect('/quanly/menu');
        })
        .then(user =>res.redirect('/quanly/menu',{
            user:MongooseToObject(user)
        })
        .catch(next))
    }

    logout(req, res, next){
        req.session.destroy((err) =>{
            if(err) throw err;
            res.redirect('/');
        });
    }

    menu(req, res, next){
        res.render('QuanLySP/menu');
    }
    
}


module.exports = new QLController;