'use strict';

const client = require('./');
const test = require('tape');

const first = arr => arr[0];
const last = arr => arr[arr.length - 1];

test('Fetch story using canonical url', async t => {
  const stoid = '196287';
  const slug = 'ask-slashdot-command-line-interfaces----what-is-out-there';
  const url = 'https://ask.slashdot.org/story/13/12/31/2325227/ask-slashdot-command-line-interfaces----what-is-out-there';
  t.comment(`url=${url}`);
  const story = await client.fetchStory(url);
  t.plan(2);
  t.equals(story.stoid, stoid, `collects story info [stoid=${stoid}]`);
  t.equals(story.title_slug, slug, `slug=${slug}`);
});

test('Fetch story using short url', async t => {
  const sid = '19/01/19/0112239';
  const canonicalUrl = 'https://news.slashdot.org/story/19/01/19/0112239/github-seeks-feedback-on-open-source-sustainability';
  const url = 'https://slashdot.org/story/351014';
  t.comment(`url=${url}`);
  const story = await client.fetchStory(url);
  t.plan(2);
  t.equals(story.sid, sid, `collects story info [sid=${sid}]`);
  t.equals(story.canonical_url, canonicalUrl, `canonical_url=${canonicalUrl}`);
});

test('Fetch story using `stoid`', async t => {
  const stoid = '196287';
  const canonicalUrl = 'https://ask.slashdot.org/story/13/12/31/2325227/ask-slashdot-command-line-interfaces----what-is-out-there';
  const sid = '13/12/31/2325227';
  t.comment(`stoid=${stoid}`);
  const story = await client.fetchStory(stoid);
  t.plan(2);
  t.equals(story.sid, sid, `collects story info [sid=${sid}]`);
  t.equals(story.canonical_url, canonicalUrl, `canonical_url=${canonicalUrl}`);
});

test('Fetch story using `sid`', async t => {
  const sid = '19/01/19/0112239';
  const canonicalUrl = 'https://news.slashdot.org/story/19/01/19/0112239/github-seeks-feedback-on-open-source-sustainability';
  const stoid = '351014';
  t.comment(`sid=${sid}`);
  const story = await client.fetchStory(sid);
  t.plan(2);
  t.equals(story.stoid, stoid, `collects story info [stoid=${stoid}]`);
  t.equals(story.canonical_url, canonicalUrl, `canonical_url=${canonicalUrl}`);
});

test('Fetch stories', async t => {
  const limit = 25;
  const [firstPage, secondPage] = await Promise.all([
    client.fetchStories({ limit }),
    client.fetchStories({ limit, offset: limit })
  ]);
  t.plan(4);
  t.equals(firstPage.length, limit, 'retrieves first page');
  t.equals(secondPage.length, limit, 'retrieves second page');
  t.equals(
    last(firstPage).prev_stoid,
    first(secondPage).stoid,
    'first page points to second'
  );
  t.equals(
    first(secondPage).next_stoid,
    last(firstPage).stoid,
    'second page points to first'
  );
});

test('Fetch _Message Of The Day_', async t => {
  const motd = await client.fetchMOTD();
  t.plan(1);
  t.comment(`MOTD=${JSON.stringify(motd)}`);
  t.equals(typeof motd, 'string', 'MOTD is a `string`');
});
