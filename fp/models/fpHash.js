const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fpSchema = new mongoose.Schema(
    {
        hashVal: { type: String, trim: true },
        hitQuantity: { type: Number, default: 1 }
    },
    {
        timestamps: true
    });
const FingerPrint = mongoose.model("FingerPrint", fpSchema);

module.exports = FingerPrint;