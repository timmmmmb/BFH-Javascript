function getQuote() {
    return new Promise(function(resolve, reject){
        $.ajax({
            url: "https://www.sws.bfh.ch/~locher/js/services/quote.php",
            success: function (data) {
                resolve(data);
            },
            error: function(data){
                reject(data.responseText);
            }
        });
    });
}

function toMorse(text) {
    return new Promise(function(resolve, reject){
        $.ajax({
            url: "https://www.sws.bfh.ch/~locher/js/services/morse.php?text="+text,
            success: function (data) {
                resolve(text+data);
            },
            error: function(data){
                reject(data.responseText);
            }
        });
    });
}
    