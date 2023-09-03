let now_playing = document.getElementById("NowPlaying");
let track_art = document.getElementById("track-art");
let track_name = document.getElementById("track-name");
let track_artist = document.getElementById("track-artist");

let playpause_btn = document.getElementById("Playpause");
let next_btn = document.getElementById("Next-Song-play");
let prev_btn = document.getElementById("Prev-Song");

let current_time = document.getElementById("currentTime");
let total_duration = document.getElementById("TotaltimeDuration");

let seek_slider = document.getElementById("Volume-Seek-slider");
let volume_slider = document.getElementById("volumeSlider");


let track_index = 0;
let isPlaying = false;
let updateTimer;


let current_track = document.createElement('audio');


let track_list = [
{
	name: "Kushi's Aradhya Song",
	artist: "Hesham Abdul Wahab",
	image: "https://th.bing.com/th/id/OIP.Ohn9f5T-TkaekWRAl5o4sgHaHa?pid=ImgDet&rs=1",
	path: "Aradhya.mp3"
},
{
	name: "Hungry Cheetah BGM Effect",
	artist: "Thaman S",
	image: "https://naasongs.to/wp-content/uploads/2023/09/OG-2023-Hungry-Cheetah-250x250.jpg",
	path: "Hungry Cheetah.mp3"
},
{
	name: "Jailer Song Kavali",
	artist: "Anirudh Ravichander",
	image: "https://naasongs.to/wp-content/uploads/2023/07/Jailer-2023-Kaavaali-250x250.jpg",
	path: "kavaali.mp3",
},
];

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    
    
    current_track.src = track_list[track_index].path;
    current_track.load();
    
    
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    
    updateTimer = setInterval(seekUpdate, 1000);
    current_track.addEventListener("ended", nextTrack);
    
    random_bg_color();
    }
    
function random_bg_color() {
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
   document.body.style.background = bgColor;
}
    
    
function resetValues() {
	current_time.textContent = "00:00";
        total_duration.textContent = "00:00";
        seek_slider.value = 0;
}
    
function playpauseTrack() {
        if (!isPlaying) playTrack();
        else pauseTrack();
}
        
function playTrack() {
        current_track.play();
        isPlaying = true;
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
        
function pauseTrack() {
        current_track.pause();
        isPlaying = false;
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
        
        
function nextTrack() {
      if (track_index < track_list.length - 1)
            track_index += 1;
      else track_index = 0;
      
      loadTrack(track_index);
      playTrack();
}
        

function prevTrack() {
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
        
        
        loadTrack(track_index);
        playTrack();
}
        


function seekTo() {
            seekTo = current_track.duration * (seek_slider.value / 100);
            current_track.currentTime = seekTo;
}
            
function setVolume() {
            current_track.volume = volume_slider.value / 100;
}
            

function seekUpdate() {
            let seekPosition = 0;
            if (!isNaN(current_track.duration)) {
                seekPosition = current_track.currentTime * (100 / current_track.duration);
                seek_slider.value = seekPosition;
            
        
	    let currentMinutes = Math.floor(current_track.currentTime / 60);
            let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(current_track.duration / 60);
            let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);
            

            if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            

            current_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
            
