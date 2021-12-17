exports.seed = function(knex) {
    return knex('users')
      .truncate()
      .then(function() {
        return knex('users').insert([
          { username: 'Hughes', password: '1234'},
          { username: 'Bobby', password: 'abcd'},
          { username: 'Angelique', password: 'ab12'},
          { username: 'Felipe', password: '12ab'},
          { username: 'Mark', password: 'cd34'}
        ]);
      });
  }; 