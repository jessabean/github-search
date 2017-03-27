const form = document.getElementById('search-form');
const input = document.getElementById('search-form-input');
const results = document.getElementById('search-results');

class List {
  constructor() {
    this._list = document.createElement('ul');
  }

  createItem() {
    return document.createElement('li');
  }

  addItem(item) {
    this._list.appendChild(item);
  }

  renderList() {
    return this._list;
  }
}

class Search {
  constructor() {
    this._input = document.getElementById('search-form-input');
    this._query = this._input.value;
  }
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  results.innerHTML = '';
  let search = new Search();

  new Ajax(`https://api.github.com/search/repositories?access_token=0769f07df1f34bacf719bd46c1ef19722c4c0d92&q={${search._query}}`)
    .then( x => {
      let repos = x.items;
      let list = new List();
      results.appendChild(list.renderList());

      repos.forEach(function(repo){
        let item = list.createItem();
        let itemLink = document.createElement('a');
        let itemImg = document.createElement('img');
        let itemText = document.createElement('span');
        itemLink.href = repo.html_url;
        itemImg.src = repo.owner.avatar_url;
        itemText.innerHTML = repo.name;
        itemLink.appendChild(itemImg);
        itemLink.appendChild(itemText);
        item.appendChild(itemLink);
        list.addItem(item);
      })
    })
    .catch( e => {
      console.error(e);
      return 'There was an error with your request!';
    })
    .get();
})
