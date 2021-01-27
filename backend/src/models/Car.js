const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    marca:           String,
    modelo:          String,
    ano_fabricacao:  Number,
    placa:           String,
});

module.exports = mongoose.model('Car', CarSchema);