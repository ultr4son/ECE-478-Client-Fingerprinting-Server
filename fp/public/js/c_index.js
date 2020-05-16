"use strict";

(async () => {
    console.log("Inside self-inv func");

    let testRes = [];
    let resObj = {};

    // add more here - make it cleaner. add functions, etc.
    testRes.push(navigator.userAgent,
        navigator.language,
        window.screen.colorDepth,
        navigator.deviceMemory,
        window.devicePixelRatio,
        window.screen.availWidth,
        window.screen.availHeight,
        navigator.platform,
        navigator.doNotTrack
    );

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