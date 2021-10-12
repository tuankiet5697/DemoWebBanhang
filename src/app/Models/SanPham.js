const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const SanPham = new Schema({
    tenSP: { type: String},
    loaiSP: {type: String},
    giaSP: {type: Number},
    motaSP: {type: String},
    image: {type: String},
    slug: {type: String, slug:'tenSP', unique:true},
})

mongoose.plugin(slug);
SanPham.plugin(mongooseDelete, {deletedAt : true,
    overrideMethods: true,
    });

module.exports = mongoose.model('SanPham',SanPham);