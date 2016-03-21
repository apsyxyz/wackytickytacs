icons = [
            "disabled",
            "minionhate",
            "wackytictacs",
            "reallywackytictacs"
        ];

function changeSource() {
    current++;
    if(current > icons.length-1){
        current = 0;
    }
    chrome.browserAction.setIcon({path:"icon/"+icons[current]+".png"});
    chrome.storage.local.set({"wackytictacs-settings" : current},
        function() {
            if (chrome.runtime.error) console.log("Runtime error.");
        }
    );
    reload();
}

function reload(){
    var urls = [];
    var xhr = new XMLHttpRequest();
    if(icons[current] == 0){
        return;
    }
    /* lol. this code is shit. */
    xhr.open("GET", "https://www.reddit.com/r/"+icons[current]+".json", true);
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
            chrome.storage.local.set({ "wackytictacs-urls" : urls}, function() {
                if (chrome.runtime.error) {
                    console.log("Runtime error.");
                }
            });
        }
    });}};
    xhr.send();
}


/* load setting */
current = 0;
chrome.storage.local.get("wackytictacs-settings",function(items) {
    if(chrome.runtime.lastError){
        chrome.storage.local.set({"wackytictacs-settings" : current},
            function() {
                if (chrome.runtime.error) console.log("Runtime error.");
            }
        );
    }
    current = items["wackytictacs-settings"];
});

chrome.browserAction.setIcon({path:"icon/"+icons[current]+".png"});

chrome.browserAction.onClicked.addListener(changeSource);

/* get latest */
reload();
