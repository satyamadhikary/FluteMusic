//Current audio stops playing when different audio is played

document.addEventListener('DOMContentLoaded', () => {
  const audios = document.querySelectorAll('audio');

  audios.forEach(audio => {
      audio.addEventListener('play', () => {
          audios.forEach(otherAudio => {
              if (otherAudio !== audio) {
                  otherAudio.pause();
                  otherAudio.currentTime = 0; // Optionally reset to start
              }
          });
      });
  });
});

//--------------------------------------------------------------------------------------

