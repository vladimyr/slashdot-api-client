'use strict';

const debug = require('debug')('auth');
const path = require('path');
const pkg = require('./package.json');
const r = require('got');
const writeFile = require('util').promisify(require('fs').writeFile);

const BASE_URL = pkg.config.baseUrl;
const authrc = path.join(__dirname, '.authrc.js');
const reApiKey = /apiKey:\s*'(.*?)'/;

module.exports = {
  fetchApiKey,
  storeApiKey
};

if (require.main === module) {
  fetchApiKey()
    .then(key => storeApiKey(key))
    .then(key => console.error('.authrc.js updated: apiKey=%s\n', key));
}

async function fetchApiKey() {
  const resp = await r.get(`${BASE_URL}/story/`);
  const match = resp.body.match(reApiKey);
  if (!match || !match.length) throw new Error('Failed to fetch apiKey');
  debug('apiKey: %s', match[1]);
  return match[1];
}

async function storeApiKey(apiKey) {
  await writeFile(authrc, `module.exports = '${apiKey}';`);
  return apiKey;
}
