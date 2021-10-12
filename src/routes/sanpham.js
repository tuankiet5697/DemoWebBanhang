const express = require('express');
const router = express.Router();

const SPController = require('../app/Controller/SPController');


router.get('/', SPController.show);
router.get('/thongtin/:slug',SPController.detail);
router.get('/khoai-lang',SPController.getKhoaiLang);
router.get('/bi',SPController.getBi);
router.get('/hanh-tay',SPController.getHanhTay);
router.get('/khoai-tay',SPController.getKhoaiTay);
router.get('/toi',SPController.getToi);
router.get('/ot',SPController.getot);

module.exports = router;