/* global data */
/* exported data */

var $imageDisplay = document.querySelector('#display-image');
var $photoURL = document.querySelector('#image-input');

$photoURL.addEventListener('input', function (e) {
  $imageDisplay.src = $photoURL.value;
});

var $titleBox = document.querySelector('#input-box');
var $notesBox = document.querySelector('textarea');
var $form = document.querySelector('form');

$form.addEventListener('submit', function (e) {
  e.preventDefault();
  var newObj = {};
  newObj.entryId = data.nextEntryId++;
  newObj.image = $imageDisplay.src;
  newObj.title = $titleBox.value;
  newObj.notes = $notesBox.value;
  data.entries.push(newObj);
  $form.reset();
  if ($photoURL.value === '') {
    $imageDisplay.src = 'images/placeholder-image-square.jpg';
  }
});
