console.log("LOADED");
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.reddit.com/r/wackytictacs.json", true);
xhr.onreadystatechange = function() {
    urls = []
    if (xhr.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    var resp = JSON.parse(xhr.responseText);
    resp["data"]["children"].forEach(function(item) {
        if(item["data"]["url"].indexOf("imgur.com") != -1){
            urls.push("https://i.imgur.com/"+
            item["data"]["url"].split("?")[0].split("/").slice(-1)[0].split(".")[0]+
            ".jpg");
            chrome.storage.local.set({ "wackytictacs" : urls}, function() {
                if (chrome.runtime.error) {
                    console.log("Runtime error.");
                }
            });
        }
    });
  }
}
xhr.send();

