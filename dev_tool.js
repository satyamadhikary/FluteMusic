// document.addEventListener('contextmenu', function(event) {
//     event.preventDefault();
//   });
  
//   document.onkeydown = function(e) {
//     if (e.keyCode == 123) { // 123 is the keycode for F12
//         return false;
//   }
// }

// document.addEventListener('keydown', function(event) {
//     if (event.ctrlKey && event.shiftKey && event.key === 'I') {
//         event.preventDefault();
//     }
// });

$(document).on('keydown', function(event) {
    if (event.keyCode == 9) {   //tab pressed
       event.preventDefault(); // stops its action
    }
 });