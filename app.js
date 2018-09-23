var localData;

// Inject data
chrome.tabs.query({url: 'http://orteil.dashnet.org/cookieclicker/' }, function(params) {
  chrome.tabs.executeScript(params[0].id, {
    file: "js/injector.js"
  });
})


chrome.runtime.onMessage.addListener(function (msg) {
console.log(msg);
localData = msg;
let localDiv = document.getElementById('localStorage');
localDiv.innerHTML = msg.ascendMeter + ' | ' + msg.date;
addBTNlistener();
});
// chrome.storage.sync.set({'CookieClickerGameSave': zed}, function() {
//     console.log('Value is set to ' + zed);
//   });

function addBTNlistener(params) {
  
  let btn = document.getElementById('saveBtn');
  btn.addEventListener('click', function() {
    chrome.storage.sync.set({'emCC': JSON.stringify(localData)}, function() {
      console.log('Value is set to ' + JSON.stringify(localData));
    });
  })
}


  chrome.storage.sync.get(['emCC'], function(result) {
    console.log(result);
    result = JSON.parse(result.emCC);
    let chromeStorageDiv = document.getElementById('chromeStorage');
    chromeStorageDiv.innerHTML = result.ascendMeter + ' | ' + result.date;
  });

  

// chrome.storage.sync.getBytesInUse(['CookieClickerGameSave'], function(result) {
//     console.log(result);
//   });