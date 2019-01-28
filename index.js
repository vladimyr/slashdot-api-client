'use strict';

const { URL } = require('url');
const apiKey = require('./.authrc.js');
const debug = require('debug')('client');
const pkg = require('./package.json');
const r = require('got').extend({
  baseUrl: `${pkg.config.baseUrl}/api/v1`,
  query: { api_key: apiKey },
  json: true
});

const reStoryId = /\d{2}\/\d{2}\/\d{2}\/\d+|\d+/;
const isUrl = str => /^https?:\/\//.test(str);

module.exports = {
  fetchStory,
  fetchStories,
  fetchMOTD,
  getStoryId
};

async function fetchStory(input) {
  const storyId = getStoryId(input);
  const resp = await r.get(`/story/${storyId}.json`);
  return resp.body;
}

async function fetchStories(options = {}) {
  options.limit = Math.min(options.limit || 50, 50);
  const resp = await r.get('/stories.json', { query: options });
  return resp.body.stories;
}

async function fetchMOTD() {
  const resp = await r.get('/motd.json');
  return resp.body.motd;
}

function getStoryId(str) {
  if (isUrl(str)) {
    const { pathname } = new URL(str);
    debug('patname: %s', pathname);
    str = pathname;
  }
  const match = str.match(reStoryId);
  if (!match || !match.length) {
    throw new TypeError(`Failed to extract story id from: ${str}`);
  }
  const storyId = match[0];
  debug('story id: %s', storyId);
  return storyId;
}
