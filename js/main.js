/* global data */
/* exported data */

var $imageDisplay = document.querySelector('#display-image');
var $photoURL = document.querySelector('#image-input');
var dataEntries = data.entries;

$photoURL.addEventListener('input', function (e) {
  $imageDisplay.src = $photoURL.value;
});

var $titleBox = document.querySelector('#input-box');
var $notesBox = document.querySelector('textarea');
var $formHeading = document.querySelector('h1');
var $form = document.querySelector('form');
var $dltEntry = document.querySelector('.delete');

if ($formHeading.textContent === 'New Entry') {
  data.view = 'entry-form';
  $dltEntry.className = 'hidden';
}

$form.addEventListener('submit', function (e) {
  e.preventDefault();

  var newObj = {};

  if (data.view === 'edit') {
    newObj.entryId = data.editing;
    newObj.image = $imageDisplay.src;
    newObj.title = $titleBox.value;
    newObj.notes = $notesBox.value;
    for (let i = 0; i < dataEntries.length; i++) {
      if (data.editing === dataEntries[i].entryId) {
        data.entries[i] = newObj;
        break;
      }
    }
    var $listItems = document.querySelectorAll('li');
    var editedTree = addEntry(newObj);
    for (let j = 0; j < $listItems.length; j++) {
      if (parseInt($listItems[j].getAttribute('data-entry-id')) === data.editing) {
        $listItems[j].replaceWith(editedTree);
      }
    }
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
  listItem.setAttribute('data-entry-id', entry.entryId);

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
  $formHeading.textContent = 'New Entry';
  $form.reset();
  if (viewForm.className === 'hidden') {
    viewEntries.className = 'hidden';
    viewForm.className = '';
    $imageDisplay.src = 'images/placeholder-image-square.jpg';
  }
});

var $ulItem = document.querySelector('ul');

window.addEventListener('DOMContentLoaded', function (e) {
  for (let i = 0; i < dataEntries.length; i++) {
    var newEntry = addEntry(dataEntries[i]);
    $ulItem.prepend(newEntry);
  }
});

$ulItem.addEventListener('click', function (e) {
  var dataEntryId = e.target.getAttribute('data-entry-id');

  if (e.target.className === 'fas fa-pen') {
    $dltEntry.className = 'delete';
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
});

var $main = document.querySelector('.main');
var $modal = document.querySelector('.container-modal');
var $cancelBtn = document.querySelector('#cancel-btn');
var $deleteBtn = document.querySelector('#confirm-btn');

$dltEntry.addEventListener('click', function (e) {
  if ($modal.className === 'container-modal hidden') {
    $modal.className = 'container-modal';
    $main.className = 'backdrop-modal';
  }
});

$cancelBtn.addEventListener('click', function (e) {
  if ($modal.className === 'container-modal') {
    $modal.className = 'container-modal hidden';
    $main.className = '';
  }
});

// delete works BUT when page refreshes it returns, how to perm dlt?
$deleteBtn.addEventListener('click', function (e) {
  var $listItems = document.querySelectorAll('li');
  for (let i = 0; i < dataEntries.length; i++) {
    if (data.editing === dataEntries[i].entryId) {
      dataEntries.splice(i, 1);
      break;
    }
  }

  for (let j = 0; j < $listItems.length; j++) {
    if (parseInt($listItems[j].getAttribute('data-entry-id')) === data.editing) {
      $listItems[j].remove();
      break;
    }
  }

  if (viewEntries.className === 'hidden') {
    viewForm.className = 'hidden';
    viewEntries.className = '';
  }
  if ($modal.className === 'container-modal') {
    $modal.className = 'container-modal hidden';
    $main.className = '';
  }
});
