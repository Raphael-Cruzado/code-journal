/* global data */
/* exported data */

var $imageDisplay = document.querySelector('#display-image');
var $photoURL = document.querySelector('#image-input');

$photoURL.addEventListener('input', function (e) {
  $imageDisplay.src = $photoURL.value;
});

var $titleBox = document.querySelector('#input-box');
var $notesBox = document.querySelector('textarea');
var $formHeading = document.querySelector('h1');
var $form = document.querySelector('form');

$form.addEventListener('submit', function (e) {
  e.preventDefault();

  var newObj = {};

  var indexPos = data.entries.findIndex((element, index) => {
    if (element.entryId === data.editing) {
      return true;
    }
  });

  if (data.view === 'edit') {
    newObj.entryId = data.editing;
    newObj.image = $imageDisplay.src;
    newObj.title = $titleBox.value;
    newObj.notes = $notesBox.value;
    data.entries[indexPos] = newObj;
    $ulItem.append(addEntry(newObj)); // it works!! now just do it so that it does it BEFORE page reload
    $form.reset();
  } else if (data.view === 'entry-form') {
    newObj.entryId = data.nextEntryId++;
    newObj.image = $imageDisplay.src;
    newObj.title = $titleBox.value;
    newObj.notes = $notesBox.value;
    data.entries.push(newObj);
    $ulItem.prepend(addEntry(newObj));
    $form.reset();
  }

  if ($photoURL.value === '') {
    $imageDisplay.src = 'images/placeholder-image-square.jpg';
  } else {
    $imageDisplay.src = $photoURL.value;
  }
});

var $submitBtn = document.querySelector('#submit-btn');

$submitBtn.addEventListener('click', function (e) {
  if ($photoURL.value === '') {
    $imageDisplay.src = 'images/placeholder-image-square.jpg';
  } else {
    viewForm.className = 'hidden';
    viewEntries.className = '';
  }
});

// <ul>
//   <li class="column-full">
//     <div class="column-half" style="float: left">
//       <img class="column-full" id="entry-image" src="images/placeholder-image-square.jpg" alt="user-image">
//     </div>
//     <div class="column-half" id="entry-content" style="float: right">
//       <div class="title-column">
//          <h4><label for="user-text">Title</label></h4>
//           <i class="fas fa-pen"></i>
//        </div >
//       <p></p>
//   </li>
// </ul>

function addEntry(entry) {
  var listItem = document.createElement('li');
  var itemCard1 = document.createElement('div');
  var userImage = document.createElement('img');
  var itemCard2 = document.createElement('div');
  var titleCol = document.createElement('div');
  var headingTitle = document.createElement('h4');
  var icon = document.createElement('i');
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

  headingLabel.setAttribute('for', 'user-text');
  headingLabel.textContent = entry.title;
  headingTitle.appendChild(headingLabel);

  titleCol.setAttribute('class', 'title-column');
  itemCard2.appendChild(titleCol);

  titleCol.appendChild(headingTitle);

  icon.setAttribute('class', 'fas fa-pen');
  icon.setAttribute('data-entry-id', entry.entryId);
  titleCol.appendChild(icon);

  itemCard2.appendChild(userText);
  userText.textContent = entry.notes;

  return listItem;

}

var $navBar = document.querySelector('.nav-bar');
var viewForm = document.querySelector("[data-view='entry-form']");
var viewEntries = document.querySelector("[data-view='entries']");

$navBar.addEventListener('click', function (e) {
  if (viewEntries.className === 'hidden') {
    viewForm.className = 'hidden';
    viewEntries.className = '';
  }
});

var $titleHeading = document.querySelector('h3');

$titleHeading.addEventListener('click', function (e) {
  if (viewForm.className === 'hidden') {
    viewEntries.className = 'hidden';
    viewForm.className = '';
  }
});

var $newEntry = document.querySelector('#new-btn');

$newEntry.addEventListener('click', function (e) {
  data.view = 'entry-form';
  $form.reset();
  if (viewForm.className === 'hidden') {
    viewEntries.className = 'hidden';
    viewForm.className = '';
    $imageDisplay.src = 'images/placeholder-image-square.jpg';
  }
});

var $ulItem = document.querySelector('ul');
var dataEntries = data.entries;

window.addEventListener('DOMContentLoaded', function (e) {
  for (let i = 0; i < dataEntries.length; i++) {
    var newEntry = addEntry(dataEntries[i]);
    $ulItem.prepend(newEntry);
  }
});

$ulItem.addEventListener('click', function (e) {
  var dataEntryId = e.target.getAttribute('data-entry-id');

  if (e.target.className === 'fas fa-pen') {
    viewEntries.className = 'hidden';
    viewForm.className = '';
    $formHeading.textContent = 'Edit Entry';
    data.view = 'edit';
    data.editing = e.target.dataset.entryId;
    $photoURL.value = e.path[3].firstChild.firstChild.src;
    $imageDisplay.src = $photoURL.value;
    $titleBox.value = e.path[3].children[1].firstChild.firstChild.innerText;
    $notesBox.value = e.path[3].children[1].lastChild.innerText;
    data.editing = parseInt(dataEntryId);
  }

  for (let i = 0; i < dataEntries.length; i++) {
    var indexPos = data.entries.findIndex((element, index) => {
      if (element.entryId === data.editing) {
        return true;
      }
    });
  }

  console.log(indexPos);
});
