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


//iphone compatablility
import {normalizeURL} from 'ionic-angular';

MediaSource = document.createElement("audio");
MediaSource.src = normalizeURL(cordova.file.dataDirectory + file.fullPath);

//----------------------------------------------

$(document).ready(function(){
    $(".owl-carousel").owlCarousel();
  });


var owl = $('.owl-carousel');
owl.owlCarousel({
    loop: true,
    items: 1,
    dots: false,

});

owl.on('mousewheel', function (e) {
    if (e.originalEvent.deltaY < 0) {
        owl.trigger('prev.owl.carousel');
    } else {
        owl.trigger('next.owl.carousel');
    }
    e.preventDefault();
});


const items = [
    {
      className: 'item1',
      imageSrc: 'images/EeeHawa.jpeg',
      audioSrc: 'https://firebasestorage.googleapis.com/v0/b/storage-bucket-575e1.appspot.com/o/music%2Fin-y2mate.com%20-%20E%20Hawa%20%20Meghdol%20X%20Hawa%20Film%20%20Aluminium%20Er%20Dana.mp3?alt=media&token=3724b578-ea7e-45c9-8ada-9dd5db28fca9',
      title: 'E Hawa'
    },
    {
      className: 'item2',
      imageSrc: 'images/Ghorgari.png',
      audioSrc: 'https://firebasestorage.googleapis.com/v0/b/storage-bucket-575e1.appspot.com/o/music%2Fin-y2mate.com%20-%20GhorGari%20%E0%A6%98%E0%A6%B0%E0%A6%97%E0%A6%A1%20%20Album%20Train%20Poka%20%20HIGHWAY.mp3?alt=media&token=5c83592f-9ec2-48ed-b44a-3865a15ae03a',
      title: 'GhorGari'
    },
    {
      className: 'item3',
      imageSrc: 'images/Obosthan.jpeg',
      audioSrc: 'https://firebasestorage.googleapis.com/v0/b/storage-bucket-575e1.appspot.com/o/music%2FObosthan.mp3?alt=media&token=9f0c0914-2ff4-40f5-8545-f23df037532b',
      title: 'Obosthan'
    },
    {
      className: 'item4',
      imageSrc: 'images/sakkhi.jpg',
      audioSrc: 'https://firebasestorage.googleapis.com/v0/b/storage-bucket-575e1.appspot.com/o/music%2FSakkhi.mp3?alt=media&token=c8365f21-07f1-4021-900b-96cf1997d4e2',
      title: 'Sakkhi'
    }
  ];

  document.querySelectorAll('.item').forEach(item => {
    const className = item.getAttribute('data-info');
    const itemData = items.find(i => i.className === className);
    
    if (itemData) {
      item.innerHTML = `
        <div class="pad-content">
          <div class="img-container">
            <img class="img-fluid play-img change" src="${itemData.imageSrc}" alt="${itemData.title}">
            <h2>${itemData.title}</h2>
            <audio id="${itemData.className}" controls controlsList="nodownload noplaybackrate">
              <source src="${itemData.audioSrc}">
            </audio>
          </div>
        </div>
      `;
    }
  });