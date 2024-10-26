function slideUp(element) {
    element.style.transform = 'translateY(-100%)'; // Slide up effect
    setTimeout(() => {
      element.style.opacity = '0'; // Start fading after sliding up mostly out of view
    }, 400); // Delay opacity fade to sync with slide-up
    setTimeout(() => {
      element.style.display = 'none'; // Hide splash after animation
    }, 600); // Total duration matches CSS transition time
  }

  window.onload = function() {
    // Show splash and animate
    const splash = document.getElementById('splash');
    splash.style.display = 'flex';
    
    // Automatically remove splash after 3 seconds
    setTimeout(() => {
      slideUp(splash);
    }, 2000); // 3-second delay
  };


   // LOGO Animation
// JavaScript (GSAP animation)
let timeline = gsap.timeline();

timeline.from(".f1", {
	y: 100,
	opacity: 0,
	duration: 1,
}, "0.1")
.from(".l2", {   		
	y: 100,
	opacity: 0,
	duration: 1.3,
}, "0.2")
.from(".u3", {   		
	y: 100,
	opacity: 0,
	duration: 1.6,
}, "0.3")
.from(".t4", {   		
	y: 100,
	opacity: 0,
	duration: 1.9,
}, "0.4")
.from(".e5", {   		
	y: 100,
	opacity: 0,
	duration: 2.1,
}, "0.5")
.from(".spinner", {   		
	y: 0,
	opacity: 0,
	duration: 2.3,
}, "1");
