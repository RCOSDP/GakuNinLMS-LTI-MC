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

myPlayer.on('ended', function() {
    $('.carousel-control-next').click();
});
