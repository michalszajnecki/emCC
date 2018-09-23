chrome.runtime.sendMessage({
    CookieClickerGame: localStorage.getItem('CookieClickerGame'),
    ascendMeter: (document.getElementById('ascendNumber')).innerHTML,
    date: (new Date()).toISOString()
});

