document.querySelectorAll('.item').forEach(item => {
  const className = item.getAttribute('data-info');
  const itemData = items.find(i => i.className === className);

  if (itemData) {
    item.innerHTML = `
      <div class="pad-content">
        <div class="img-container">
          <img class="img-fluid play-img change" src="${itemData.imageSrc}" alt="${itemData.title}">
          <h2>${itemData.title}</h2>
          <audio id="audio-element-${itemData.className}" src="${itemData.audioSrc}"></audio>
          <div class="controls">  
            <button class="play-pause play"></button>
            <input type="range" class="seek-bar" value="0" max="100" step="0.001">
            <button class="qr-icon"></button>
          </div>
          <div class="qr-bg hidden">
            <button class="cross-icon"></button>
            <button class="qrtoggle-icon"></button>
            <div class="qr-code">
              <img id="qr-code-${itemData.className}" src="/images/qrimg.png" style="height:200px; width:200px; border-radius:0px;" alt="QR Code">
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach event listeners to the current item
    const audio = item.querySelector('audio');
    const playPauseBtn = item.querySelector('.play-pause');
    const seekBar = item.querySelector('.seek-bar');
    const qrCodeImg = item.querySelector('.qr-code img');

    // Function to toggle play/pause
    const togglePlayPause = () => {
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentPlayPauseBtn.classList.remove('pause');
        currentPlayPauseBtn.classList.add('play');
      }

      if (audio.paused) {
        audio.play();
        playPauseBtn.classList.remove('play');
        playPauseBtn.classList.add('pause');
        startQRCodeUpdate();
        currentAudio = audio;
        currentPlayPauseBtn = playPauseBtn;
      } else {
        audio.pause();
        playPauseBtn.classList.remove('pause');
        playPauseBtn.classList.add('play');
        stopQRCodeUpdate();
        currentAudio = null;
        currentPlayPauseBtn = null;
      }
    };

    // Handle double-clicks on pad-content
    let clickCount = 0;
    let clickTimer;

    const handleDoubleClick = () => {
      clickCount++;
      clearTimeout(clickTimer);

      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 300); // 300ms for double-click detection

      if (clickCount === 2) {
        togglePlayPause(); // Trigger the play/pause function
        clickCount = 0; // Reset click count
      }
    };

    // Attach double-click handler to pad-content
    const padContent = item.querySelector('.pad-content');
    padContent.addEventListener('click', handleDoubleClick);

    // Play/Pause button event listener
    playPauseBtn.addEventListener('click', togglePlayPause);

    
    // Reset the button and audio when it ends
audio.addEventListener('ended', () => {
  playPauseBtn.classList.remove('pause');
  playPauseBtn.classList.add('play');
  currentAudio = null;
  currentPlayPauseBtn = null;
  stopQRCodeUpdate();

  // Slide to the next audio
  owl.trigger('next.owl.carousel');

  // After sliding, check if there's a next audio to play
  const nextIndex = getNextIndex(item); 
  function getNextIndex(currentItem) {
    const itemsArray = Array.from(document.querySelectorAll('.item'));
    const currentIndex = itemsArray.indexOf(currentItem);
    const nextIndex = (currentIndex + 1) % itemsArray.length; // Wrap around to the first item
    return nextIndex; // Return next index, or -1 if out of bounds
  }
  
  // Define this function to get the next index
  if (nextIndex !== -1) {
    const nextItem = document.querySelectorAll('.item')[nextIndex];
    const nextAudio = nextItem.querySelector('audio');
    const nextPlayPauseBtn = nextItem.querySelector('.play-pause');

    // Play the next audio automatically
    if (nextAudio) {
      nextAudio.play();
      nextPlayPauseBtn.classList.remove('play');
      nextPlayPauseBtn.classList.add('pause');
      currentAudio = nextAudio;
      currentPlayPauseBtn = nextPlayPauseBtn;
      startQRCodeUpdate(); // Start updating QR code for the next audio
    }
  }
});
  


    // Update seekBar value and background color as audio plays
    audio.addEventListener('timeupdate', () => {
      const percentage = (audio.currentTime / audio.duration) * 100;
      seekBar.value = percentage;
      updateSeekBarBackground(percentage);
    });

    // Update audio currentTime when seekBar is adjusted
    seekBar.addEventListener('input', () => {
      audio.currentTime = (seekBar.value / 100) * audio.duration;
      updateSeekBarBackground(seekBar.value);
    });

    // Function to update the background of the seekBar
    function updateSeekBarBackground(percentage) {
      seekBar.style.background = `linear-gradient(to right, #fff ${percentage}%, #8a8a8a ${percentage}%)`;
    }

    // Define colors for QR code
    const qrCodeColors = {
      white: '#FFFFFF',
      black: '#000000'
    };

    // Track the current color
    let currentQRCodeColor = qrCodeColors.black;

    // Toggle QR code color
    function toggleQRCodeColor() {
      currentQRCodeColor = currentQRCodeColor === qrCodeColors.black ? qrCodeColors.white : qrCodeColors.black;
      startQRCodeUpdate();
    }

    function startQRCodeUpdate() {
      qrCodeInterval = setInterval(() => {
        const currentTime = Math.floor(audio.currentTime);
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://flutedevelopment.vercel.app/?play=${itemData.className}&start=${currentTime}&play=true`)}&color=000000`;

        // Create a temporary image element
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // To avoid CORS issues
        img.src = qrCodeUrl;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) {
              data[i + 3] = 0; // Set alpha to 0 (transparent)
            }
          }

          ctx.putImageData(imageData, 0, 0);

          const transparentQrCodeUrl = canvas.toDataURL('image/png');

          qrCodeImg.src = transparentQrCodeUrl;
        };
      }, 1000); // Update every second
    }

    // Add event listener to toggle color button
    const toggleColorBtn = item.querySelector('.qrtoggle-icon');
    const qrCodeDiv = item.querySelector('.qr-code');

    if (toggleColorBtn) {
      toggleColorBtn.addEventListener('click', () => {
        qrCodeDiv.classList.toggle('invert'); // Toggle the 'invert' class on the qr-code div
      });
    }

    function stopQRCodeUpdate() {
      clearInterval(qrCodeInterval);
    }
  }
});


  // Function to get URL parameters
  function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      play: params.get('play'),
      start: params.get('start'),
      playImmediately: params.get('play') === 'true', // Check if 'play' parameter is 'true'
      item: params.get('item') // Added parameter to identify the carousel item
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    const params = getURLParams();

    if (params.play) {
      // Find the item element based on the 'item' parameter
      const item = document.querySelector(`[data-info="${params.play}"]`);

      if (item) {
        const playPauseBtn = item.querySelector('.play-pause');
        const audio = item.querySelector('audio');

        // Set the audio's currentTime based on the 'start' parameter
        if (params.start) {
          audio.currentTime = parseFloat(params.start);
        }

        // Trigger the play button click if 'playImmediately' is true
        if (params.playImmediately) {
          playPauseBtn.click(); // Simulate a click to start playback
        }
      }
    }
  });

  document.querySelectorAll('.item').forEach(item => {
    const qrIcon = item.querySelector('.qr-icon');
    const qrBg = item.querySelector('.qr-bg');
    const crossIcon = item.querySelector('.cross-icon');


    if (qrIcon && qrBg) {
      qrIcon.addEventListener('click', () => {
        qrBg.classList.remove('hidden'); // Show qr-bg
      });
    }
    if (crossIcon && qrBg) {
      crossIcon.addEventListener('click', () => {
        qrBg.classList.add('hidden'); // Hide qr-bg
      });
    }
  });




