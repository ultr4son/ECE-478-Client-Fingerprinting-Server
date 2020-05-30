const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fpSchema = new mongoose.Schema(
    {
        hashVal: { type: String, trim: true },
        hitQuantity: { type: Number, default: 1 },
        language: {type: String },
        colorDepth: {type: String},
        deviceMemory: {type: Number},
        devicePixelRatio: {type: Number},
        availWidth: {type: Number},
        availHeight: {type: Number},
        platform: {type: String},
        webdriver: {type: String},
        cpuClass: {type: String},
        doNotTrack: {type: String},
        hardwareConcurrency: {type: String},
        oscpu: {type: String},
        
        remoteAddress: {type: String}
    },
    {
        timestamps: true
    });
const FingerPrint = mongoose.model("FingerPrint", fpSchema);

module.exports = FingerPrint;