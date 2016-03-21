icons = [
            "disabled",
            "minionhate",
            "wackytictacs",
            "reallywackytictacs"
        ];


/* update the changed elements */
function update(updated){
    chrome.storage.local.get("wackytictacs-urls",function(items) {
        var imgs = items["wackytictacs-urls"];
        var regex = RegExp("\(minion\)|\(Despicable.Me\)","i");
        var results = regex.exec(updated.innerHTML);
        var width = 0;
        var height = 0;
        if(results != null){
            document.body.style.textTransform = "uppercase";
            var fun = updated.getElementsByTagName("img");
            for(i = 0;i < fun.length;i++){
                /* Save the height/width to avoid messing up the pages */
                width = fun[i].clientWidth;
                height = fun[i].clientHeight;
                /* assign new image */
                fun[i].src = imgs[Math.floor(Math.random()*imgs.length)];
                fun[i].width = width;
                fun[i].height = height;
            }
        }
    });
};



/* handle page changes */
var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
              update(mutation.target);
    });    
});
var config = {
                attributes: true, 
                subtree: true
            };



chrome.storage.local.get("wackytictacs-settings",function(items) {
    if(chrome.runtime.lastError){
            return;
    }

    var settings = items["wackytictacs-settings"];
    var current = settings;
    if (current != 0) {
        document.title = "FWD: "+document.title;
        observer.observe(document.body, config);
        update(document);
    }
});
