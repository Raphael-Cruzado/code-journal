/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var currentDataJSON = localStorage.getItem('data-entries-storage');
if (currentDataJSON !== null) {
  data = JSON.parse(currentDataJSON);
}

window.addEventListener('beforeunload', function (e) {
  this.localStorage.setItem('data-entries-storage', JSON.stringify(data));
});
