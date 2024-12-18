let now_playing = document.querySelector(".now-playing");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");


let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.getElementById("music");

let track_list = [
   {
        name:"LOL",
        artist:"syudou",
        path:"./music/LOL.mp3"
    },
   {
        name:"Annoyance",
        artist:"syudou",
        path:"./music/Annoyance.mp3"
    },
   {
        name:"The Religion of Loneliness",
        artist:"syudou",
        path:"./music/The Religion of Loneliness.mp3",
    },
   {
        name:"Hebereke Junkie",
        artist:"syudou",
        path:"./music/Hebereke Junkie.mp3"
    },
    {
        name:"Bitter Choco Decoration",
        artist:"syudou",
        path:"./music/Bitter Choco Decoration.mp3"
    },
    {
        name:"Flamingo",
        artist:"syudou",
        path:"./music/Flamingo.mp3"
    },
    {
        name:"Call Boy",
        artist:"syudou",
        path:"./music/Call Boy.mp3"
    }
];

function loadTrack(track_index){
  clearInterval(updateTimer);
  resetValues();

  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "Playing " + (track_index + 1) + " of " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);

}

function resetValues(){
  curr_time.textContent = "0:00";
  total_duration.textContent = "0:00";
  seek_slider.value = 0;
}

loadTrack(track_index);

function playpauseTrack(){
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack(){
  curr_track.play();
  isPlaying = true;

  playpause_btn.innerHTML = '<i class="fas fa-solid fa-pause"></i>';
}

function pauseTrack(){
  curr_track.pause();
  isPlaying = false;

  playpause_btn.innerHTML = '<i class="fas fa-solid fa-play"></i>';
}

function nextTrack(){
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack(){
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo(){
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume(){
  curr_track.volume = volume_slider.value / 100;
}

setVolume();

function seekUpdate(){
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)){
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10){ currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10){ durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10){ currentMinutes = currentMinutes; }
    if (durationMinutes < 10){ durationMinutes = durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}