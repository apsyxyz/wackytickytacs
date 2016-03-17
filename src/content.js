
/* update the changed elements */
function update(updated){
    chrome.storage.local.get("wackytictacs",function(items) {
        var imgs = items["wackytictacs"];
        var regex = RegExp("\(minion\)|\(Despicable.Me\)","i");
        var results = regex.exec(updated.innerHTML);
        var width = 0;
        var height = 0;
        if(results != null){
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
observer.observe(document.body, config);

/* set up */
update(document.body);
