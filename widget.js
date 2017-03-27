new Ajax('https://api.github.com/search/repositories?q={query}')
  .then( x => console.log(x.items[0]))
  .catch( e => {
    console.error(e);
    return 'There was an error with your request!';
  })
  .catch( x => alert(x))
  .get();
