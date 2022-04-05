/* global data */
/* exported data */

var $imageDisplay = document.querySelector('#display-image');

var $photoURL = document.querySelector('#image-input');

$photoURL.addEventListener('input', function (e) {
  $imageDisplay.src = $photoURL.value;
  if ($photoURL.value === '') {
    $imageDisplay.src = 'images/placeholder-image-square.jpg';
  }
});
