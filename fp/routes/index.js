const express = require('express');
const router = express.Router();

const hashFunc = require('object-hash');
const fpModel = require('../models/fpHash');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Digital Fingerprinting' });
});

router.get('/dataview', (req, res, next) => {
  userInfo = fpModel.find({}).exec((err, result) => {
    schemaKeys = Object.keys(fpModel.schema.obj)
    relevantResults = result.map(doc => {

      relevant = {}
      schemaKeys.forEach(rk => relevant[rk] = doc[rk])

      return relevant;
    })

    res.render("dataview", { "entries": relevantResults});
  
    
  })
})

router.post('/fetch_api', (req, res, next) => {

  console.log("req body: ", req.body, "body result: ", req.body.result);
  let fpRes = req.body.result;
  let totalObj = {};
  fpRes["remoteAddress"] = (req.connection.remoteAddress); // gets ip address
  
  const totalFPContent = Object.values(fpRes).join();
  totalObj['result'] = totalFPContent;

  const hashGen = hashFunc(totalFPContent);

  fpModel.countDocuments({ hashVal: hashGen }, function (err, count) {

    if (count != 0 && count >= 1) {

      fpModel.findOneAndUpdate({ hashVal: hashGen }, { $inc: { "hitQuantity": 1 }, $set: {        
        language: fpRes.language,
        colorDepth: fpRes.colorDepth,
        deviceMemory: fpRes.deviceMemory,
        devicePixelRatio: fpRes.devicePixelRatio,
        availWidth: fpRes.availWidth,
        availHeight: fpRes.availHeight,
        platform: fpRes.platform,
        webdriver: fpRes.webdriver,
        cpuClass: fpRes.cpuClass,
        doNotTrack: fpRes.doNotTrack,
        hardwareConcurrency: fpRes.hardwareConcurrency,
        oscpu: fpRes.oscpu,
        remoteAddress: fpRes.remoteAddress
      } 
    }, { new: true }, (err, result) => {
        if (err) {
          console.error("Error from finding & updating document hit Quantity Count: ", err);
        }
        else {
          console.log("Successfully incremented the hitQuantity", result)
        }
      });
    }
    else {
      const tbAdded = new fpModel({ hashVal: hashGen,       
        language: fpRes.language,
        colorDepth: fpRes.colorDepth,
        deviceMemory: fpRes.deviceMemory,
        devicePixelRatio: fpRes.devicePixelRatio,
        availWidth: fpRes.availWidth,
        availHeight: fpRes.availHeight,
        platform: fpRes.platform,
        doNotTrack: fpRes.doNotTrack });
      tbAdded.save(function (err) {
        if (err) return handleError(err);
        console.log("Successfully added document w/ unique hash. Quantity: 1")
      })
    }
  })

  console.log("FPContent: ", totalFPContent, "\t", "hash result: ", hashGen);

  res.status(200).json({ status: 1 }); // received data
})

router.get('/delete_db_data', (req, res, next) => {
  console.warn("deleting all docuements within fp db and fingerprints collection! ");

  fpModel.deleteMany({}, function (err) {
    res.status(200).json({ status: "deleted documents within db" });
  })
})

module.exports = router;
