/* --------------------- js fetch api will go here -------------------------*/

const voiceAudio = document.getElementById("sheldonVoice");

/*
function instantNotify() {
    voiceAudio.play(); // this function will instantly play the voice.
}

*/

document.body.addEventListener("mousemove", function () {
    voiceAudio.play();
})