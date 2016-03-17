console.log("LOADED");

var urls = [];
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.reddit.com/r/wackytictacs.json", true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
    var resp = JSON.parse(xhr.responseText);
    resp["data"]["children"].forEach(function(item) {
        if(item["data"]["url"].indexOf("imgur.com") != -1){
            urls.push(
                "https://i.imgur.com/"+
                item["data"]["url"].split("?")[0].split("/").slice(-1)[0]
                .split(".")[0]+".jpg"
            );
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

