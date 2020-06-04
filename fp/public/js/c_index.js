"use strict";

//Derived from the github: https://github.com/artem0/canvas-fingerprinting/blob/440a48ce2baf0240844be67e977d48753fa8b743/fingerprinting/fingerprint.js#L182
function canvasFingerprint() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    var txt = 'CANVAS_FINGERPRINT';
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125,1,62,20);
    ctx.fillStyle = "#069";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText(txt, 4, 17);
    return canvas.toDataURL();
}
(async () => {
    console.log("Inside self-inv func");

    let testRes = {};
    let resObj = {};

    // add more here - make it cleaner. add functions, etc.
    testRes["userAgent"] = navigator.userAgent;
    testRes["language"] = navigator.language;
    testRes["colorDepth"]  = window.screen.colorDepth;
    testRes["deviceMemory"] = window.deviceMemory;
    testRes["devicePixelRatio"] = window.devicePixelRatio;
    testRes["availWidth"] = window.screen.availWidth;
    testRes["availHeight"] = window.screen.availHeight;
    testRes["platform"] = navigator.platform;
    testRes["webdriver"] = navigator.webdriver
    testRes["cpuClass"] = navigator.cpuClass
    testRes["doNotTrack"] =navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack
    testRes["hardwareConcurrency"] = navigator.hardwareConcurrency
    testRes["oscpu"] = navigator.oscpu
    testRes["platform"] = navigator.platform
    testRes["canvasURL"] = canvasFingerprint();
    resObj['result'] = testRes;

    const response = await fetch('/fetch_api', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'same-origin', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'same-origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(resObj) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
})();