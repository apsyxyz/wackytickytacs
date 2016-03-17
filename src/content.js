chrome.storage.local.get("wackytictacs",function(items) {
    var imgs = items["wackytictacs"];
    var regex = RegExp("\(minion\)|\(Despicable.Me\)","i");
    var results = regex.exec(document.body.innerHTML);
    if(results != null){
        var fun = document.getElementsByTagName("img");
        for(i = 0;i < fun.length;i++){
            fun[i].src = imgs[Math.floor(Math.random()*imgs.length)];
        }
    }
});
