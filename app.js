var localData;
var storageData;

// Inject data
chrome.tabs.query({
  url: 'http://orteil.dashnet.org/cookieclicker/'
}, function (params) {
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

function addBTNlistener(params) {

  let btn = document.getElementById('saveBtn');
  btn.addEventListener('click', function () {
    chrome.storage.sync.set({
      'emCC': JSON.stringify(localData)
    }, function () {
      console.log('Value is set to ' + JSON.stringify(localData));
    });
  })

  let copyBtn = document.getElementById('copyBtn');
  copyBtn.addEventListener('click', function (event) {
    let input = document.getElementById('chromeStorageHash');
    input.value = storageData
  })
}


chrome.storage.sync.get(['emCC'], function (result) {
  result = JSON.parse(result.emCC);
  storageData = result.CookieClickerGame
  let chromeStorageDiv = document.getElementById('chromeStorage');
  chromeStorageDiv.innerHTML = result.ascendMeter + ' | ' + result.date;
});