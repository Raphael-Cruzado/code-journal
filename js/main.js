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
  $ulItem.appendChild(addEntry(newObj));
  $form.reset();
  if ($photoURL.value === '') {
    $imageDisplay.src = 'images/placeholder-image-square.jpg';
  }
});

// <ul>
//   <li class="column-full">
//     <div class="column-half" style="float: left">
//       <img class="column-full" id="entry-image" src="images/placeholder-image-square.jpg" alt="user-image">
//     </div>
//     <div class="column-half" id="entry-content" style="float: right">
//       <h4><label for="user-text"></label></h4>
//       <p></p>
//   </li>
// </ul>

function addEntry(entry) {
  var listItem = document.createElement('li');
  var itemCard1 = document.createElement('div');
  var userImage = document.createElement('img');
  var itemCard2 = document.createElement('div');
  var headingTitle = document.createElement('h4');
  var headingLabel = document.createElement('label');
  var userText = document.createElement('p');

  listItem.setAttribute('class', 'column-full');

  itemCard1.setAttribute('class', 'column-half');
  itemCard1.style.float = 'left';
  listItem.appendChild(itemCard1);

  userImage.setAttribute('class', 'column-half');
  userImage.setAttribute('id', 'entry-image');
  userImage.setAttribute('src', entry.image);
  itemCard1.appendChild(userImage);

  itemCard2.setAttribute('class', 'column-half');
  itemCard2.style.float = 'right';
  listItem.appendChild(itemCard2);

  itemCard2.appendChild(headingTitle);

  headingLabel.setAttribute('for', 'user-text');
  headingLabel.textContent = entry.title;
  headingTitle.appendChild(headingLabel);

  itemCard2.appendChild(userText);
  userText.textContent = entry.notes;

  return listItem;
}

var $ulItem = document.querySelector('ul');

var dataEntries = data.entries;

for (let i = 0; i < dataEntries.length; i++) {
  $ulItem.appendChild(addEntry(dataEntries[i]));
}
