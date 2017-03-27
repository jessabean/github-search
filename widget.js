const form = document.getElementById('search-form');
const input = document.getElementById('search-form-input');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  let val = input.value;

  new Ajax(`https://api.github.com/search/repositories?q={${val}}`)
    .then( x => {
      var repos = x.items;

      repos.forEach(function(repo){
        console.log(repo.name);
      })
    })
    .catch( e => {
      console.error(e);
      return 'There was an error with your request!';
    })
    .catch( x => alert(x))
    .get();
})
