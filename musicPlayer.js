// Select all the elements in the HTML page
// and assign them to a variable
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

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let current_track = document.createElement('audio');

// Define the list of tracks that have to be played
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
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    current_track.src = track_list[track_index].path;
    current_track.load();
    
    // Update details of the track
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    current_track.addEventListener("ended", nextTrack);
    
    // Apply a random background color
    random_bg_color();
    }
    
    function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    // Construct a color with the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    // Set the background to the new color
    document.body.style.background = bgColor;
    }
    
    // Function to reset all values to their default
    function resetValues() {
    current_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }
    
    function playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        // Play the loaded track
        current_track.play();
        isPlaying = true;
        
        // Replace icon with the pause icon
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        // Pause the loaded track
        current_track.pause();
        isPlaying = false;
        
        // Replace icon with the play icon
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        }
        
        function nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        // Go back to the last track if the
        // current one is the first in the track list
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
        


        function seekTo() {
            // Calculate the seek position by the
            // percentage of the seek slider
            // and get the relative duration to the track
            seekTo = current_track.duration * (seek_slider.value / 100);
            
            // Set the current track position to the calculated seek position
            current_track.currentTime = seekTo;
            }
            
            function setVolume() {
            // Set the volume according to the
            // percentage of the volume slider set
            current_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            
            // Check if the current track duration is a legible number
            if (!isNaN(current_track.duration)) {
                seekPosition = current_track.currentTime * (100 / current_track.duration);
                seek_slider.value = seekPosition;
            
                // Calculate the time left and the total duration
                let currentMinutes = Math.floor(current_track.currentTime / 60);
                let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(current_track.duration / 60);
                let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);
            
                // Add a zero to the single digit time values
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                // Display the updated duration
                current_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }
            