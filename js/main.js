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

var $titleBox = document.querySelector('#input-box');
var $notesBox = document.querySelector('textarea');
var $saveButton = document.querySelector('button');
var $form = document.querySelector('form');

$saveButton.addEventListener('click', function (e) {
  e.preventDefault();
  var newObj = {};
  newObj.entryId = data.nextEntryId++;
  newObj.image = $imageDisplay.src;
  newObj.title = $titleBox.value;
  newObj.notes = $notesBox.value;
  console.log(newObj);
  data.entries.push(newObj);
  console.log(data.entries);
  $form.reset();
});
