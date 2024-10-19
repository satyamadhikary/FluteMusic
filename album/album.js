$(document).ready(function(){
    $("#hide").click(function(){
      $("#none").slideToggle(400).hide("slow");
    });
    $("#show").click(function(){
      $("#none").slideDown(500).show();
    });
});

let currentAudio = null; // To track the currently playing audio
let currentPlayPauseBtn = null; // To track the associated play/pause button

document.querySelectorAll('.list-item').forEach((album, index) => {
  const className = album.getAttribute('data-info');
  const itemData = albums.find(i => i.className === className);

  if (itemData) {
    album.innerHTML = `
      <li tabindex="1" class="list-items">
        <audio id="audio-element-${itemData.className}" src="${itemData.audioSrc}"></audio>
        <div class="list-play-icon play"></div> 
        <img class="song-img" src="${itemData.imageSrc}" alt="">
        <h5 class="song-name">${itemData.title}</h5>
      </li>
    `;

    const audio = album.querySelector('audio');
    const playPauseBtn = album.querySelector('.list-play-icon');
    
    // Variables for handling double-clicks
    let clickCount = 0;
    let clickTimer;

    // Function to handle play/pause functionality
    const togglePlayPause = () => {
      // If there's a currently playing audio and it's not the one being clicked
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause(); // Pause the currently playing audio
        currentAudio.currentTime = 0; // Reset to start
        currentPlayPauseBtn.classList.remove('pause'); // Reset button class
        currentPlayPauseBtn.classList.add('play'); // Set it to play
      }

      if (audio.paused) {
        audio.play();
        playPauseBtn.classList.remove('play');
        playPauseBtn.classList.add('pause');

        // Update the currently playing audio and button
        currentAudio = audio;
        currentPlayPauseBtn = playPauseBtn;
      } else {
        audio.pause();
        playPauseBtn.classList.remove('pause');
        playPauseBtn.classList.add('play');
        currentAudio = null; // Reset currently playing
        currentPlayPauseBtn = null; // Reset the button reference
      }
    };

    playPauseBtn.addEventListener('click', togglePlayPause);

    // Handle the double-click on the list item
    album.addEventListener('click', () => {
      clickCount++;
      clearTimeout(clickTimer); // Clear the timer if clicked again

      // Set a timer to reset click count after a short delay
      clickTimer = setTimeout(() => {
        clickCount = 0; // Reset the click count after delay
      }, 300); // Adjust the time as needed (300ms is a common threshold for double-clicks)

      // Check for double-click
      if (clickCount === 2) {
        togglePlayPause(); // Trigger the play/pause function
        clickCount = 0; // Reset click count
      }
    });

    // Reset the button and audio when it ends
    audio.addEventListener('ended', () => {
      playPauseBtn.classList.remove('pause');
      playPauseBtn.classList.add('play');
      currentAudio = null; // Reset currently playing
      currentPlayPauseBtn = null; // Reset the button reference

      // Play the next audio or restart from the beginning if it's the last audio
      const nextAlbum = document.querySelectorAll('.list-item')[index + 1];
      if (nextAlbum) {
        const nextAudio = nextAlbum.querySelector('audio');
        const nextPlayPauseBtn = nextAlbum.querySelector('.list-play-icon');

        nextAudio.play();
        nextPlayPauseBtn.classList.remove('play');
        nextPlayPauseBtn.classList.add('pause');

        // Update the currently playing audio and button
        currentAudio = nextAudio;
        currentPlayPauseBtn = nextPlayPauseBtn;
      } else {
        // Restart from the beginning
        const firstAlbum = document.querySelectorAll('.list-item')[0];
        const firstAudio = firstAlbum.querySelector('audio');
        const firstPlayPauseBtn = firstAlbum.querySelector('.list-play-icon');

        firstAudio.currentTime = 0; // Reset to start
        firstAudio.play();
        firstPlayPauseBtn.classList.remove('play');
        firstPlayPauseBtn.classList.add('pause');

        // Update the currently playing audio and button
        currentAudio = firstAudio;
        currentPlayPauseBtn = firstPlayPauseBtn;
      }
    });
  }
});