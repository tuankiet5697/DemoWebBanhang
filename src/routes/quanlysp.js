const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const QLController = require('../app/Controller/QLController');

const isAuth = (req, res, next) =>{
    if(req.session.isAuth){
        next();
    }
    else{
        res.redirect('/quanly')
    }
};

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'src/public/images');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3
    }
});

router.get('/create',isAuth,QLController.create);
router.post('/addnew',upload.single('image'),isAuth,QLController.addnew);
router.get('/:id/edit',isAuth, QLController.edit);
router.get('/stored',isAuth,QLController.stored);
router.put('/:id',isAuth, QLController.update);
router.patch('/:id/restore',isAuth, QLController.restore);
router.delete('/:id',isAuth, QLController.destroy);
router.delete('/:id/force',isAuth, QLController.forcedestroy);
router.get('/trashProduct',isAuth, QLController.trashProduct);
router.get('/', QLController.login);
router.post('/login/success', QLController.loginSuccess);
router.post('/logout',QLController.logout);
router.get('/menu',QLController.menu);

module.exports = router;