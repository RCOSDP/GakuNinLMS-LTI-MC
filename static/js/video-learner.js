var myPlayer = videojs('video_player');

/* Added fast forward / fast rewind buttons */
myPlayer.seekButtons({
    forward: 15,
    back: 15
});

/* Save the volume positio */
myPlayer.persistvolume({
    namespace: "Virality-Is-Reality"
});

/* Log records */
function log_post(event,detail) {
    $.ajax({
        type: 'POST',
        url: LTI_URL + '/call/log.php',
        data: {
            event : event,
            detail : detail,
            file : info['videofile'],
            query : info['videoquery'],
            current : myPlayer.currentTime(),
            rid : info['rid'],
            uid : info['uid'],
            cid : info['cid'],
            //key : info['key'],
            nonce : info['nonce']
        },
    });
}
/* Log records */
function change_page(event,detail) {
    $.ajax({
        type: 'POST',
        url: LTI_URL + '/call/log.php',
        data: {
            event : event,
            detail : detail,
            file : "",
            query : "",
            current : "",
            rid : info['rid'],
            uid : info['uid'],
            cid : info['cid'],
            //key : info['key'],
            nonce : info['nonce']
        },
    });
}

/* Record the start and end of seek time */
var previousTime = 0;
var currentTime = 0;
var seekStart = null;
myPlayer.on('timeupdate', function() {
    previousTime = currentTime;
    currentTime = myPlayer.currentTime();
});
myPlayer.on('seeking', function() {
    if(seekStart === null) {
        seekStart = previousTime;
    }
});
myPlayer.on('seeked', function() {
    log_post('seeked',seekStart);
    seekStart = null;
});

/* Record subtitle information */
var timeout;
myPlayer.textTracks().on("change", function action(event) {
    clearTimeout(timeout)
    var showing = this.tracks_.filter(function (track) {
        if (track.kind === "subtitles" && track.mode === "showing") {
            srclang = track.language;
            return true;
        }else{
            return false;
        }
    })[0]
    timeout = setTimeout(function () {
        myPlayer.trigger("subtitleChanged", showing)
    }, 10);
})
myPlayer.on("subtitleChanged", function (event, track) {
    if(track){
        log_post("trackchange",track.language);
    }else{
        log_post("trackchange","off");
    }
})

myPlayer.on('firstplay', function() {
    log_post('firstplay')
});
myPlayer.on('play', function() {
    log_post('play')
});
myPlayer.on('pause', function() {
    log_post('pause')
});
myPlayer.on('ratechange', function() {
    log_post('ratechange',myPlayer.playbackRate());
});
myPlayer.on('ended', function() {
    log_post('ended');
    $('.carousel-control-next').click();
});
window.addEventListener("beforeunload", function (event) {
    log_post('beforeunload-ended');
});
window.addEventListener("pagehide", function (event) {
    log_post('pagehide-ended');
});
window.addEventListener("unload", function (event) {
    log_post('unload-ended');
});
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState == "hidden") { 
        log_post('hidden-ended'); 
    }
});
$(function(){
    setInterval(function(){
        log_post('current-time'); 
    },10000);
});
