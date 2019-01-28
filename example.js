'use strict';

const slashdot = require('./');

slashdot.fetchStories()
  .then(stories => {
    stories.map((it, i) => console.log('[%d] %s', i + 1, it.title));
  });
