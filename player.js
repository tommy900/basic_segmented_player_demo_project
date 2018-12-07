var player = document.querySelector('.player');
var video = player.querySelector('.player-video');
var progress = player.querySelector('.progress');
var progressFilled = player.querySelector('.filled-progress');
var toggle = player.querySelector('.toggle-play');
var skippers = player.querySelectorAll('[data-skip]');
var ranges = player.querySelectorAll('.player-slider');

// Logic
function togglePlay() {
  var playState = video.paused ? 'play' : 'pause';
  video[playState](); // Call play or paused method 
}

function updateButton() {
  var togglePlayBtn = document.querySelector('.toggle-play');
  var toggleSkipBtn = document.querySelectorAll('.toggle-skip');
  if (this.paused) {
    togglePlayBtn.innerHTML = '<svg class="" width="16" height="16" viewBox="0 0 16 16"><title>play</title><path d="M3 2l10 6-10 6z"></path></svg>';
  } else {
    togglePlayBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16"><title>pause</title><path d="M2 2h5v12H2zm7 0h5v12H9z"></path></svg>';
  }
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
  video[this.name] = this.value;
}

function progressUpdate() {
  var percent = video.currentTime / video.duration * 100;
  progressFilled.style.flexBasis = percent + '%';
}

function scrub(e) {
  var scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
}

function changeInputValue(val){
    document.querySelector('.playback-rate').value = isNaN(parseFloat(val, 10)) ? 1 : parseFloat(val, 10);
}

function changeSliderValue(val){
    document.querySelector('.slider-rate').value = isNaN(parseFloat(val, 10)) ? 1 : parseFloat(val, 10);
}

// Event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressUpdate);

toggle.addEventListener('click', togglePlay);
skippers.forEach(function (button) {return button.addEventListener('click', skip);});
ranges.forEach(function (range) {return range.addEventListener('change', rangeUpdate);});
ranges.forEach(function (range) {return range.addEventListener('mousemove', rangeUpdate);});

var mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', function (e) {return mousedown && scrub(e);});
progress.addEventListener('mousedown', function () {return mousedown = true;});
progress.addEventListener('mouseup', function () {return mousedown = false;});
