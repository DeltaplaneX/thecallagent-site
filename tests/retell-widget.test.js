/* Contract test for the language passed to the Retell chat agent (js/main.js).
 *
 * FR, EN and ZH pages load the same Retell agent. The page language (read on
 * <html lang>) is sent as the dynamic variable {{site_language}} so the agent
 * greets and answers in the visitor's language instead of always in French.
 *
 * Run: node --test tests/
 */
const { test } = require('node:test');
const assert = require('node:assert');

const { retellDynamicVars } = require('../js/main.js');

test('French pages -> French', () => {
  assert.deepStrictEqual(retellDynamicVars('fr'), { site_language: 'French' });
});

test('English pages -> English', () => {
  assert.deepStrictEqual(retellDynamicVars('en'), { site_language: 'English' });
});

test('Chinese pages use lang="zh-CN" -> Simplified Chinese', () => {
  assert.deepStrictEqual(retellDynamicVars('zh-CN'), { site_language: 'Simplified Chinese' });
});

test('region subtags and case are ignored', () => {
  assert.deepStrictEqual(retellDynamicVars('EN-gb'), { site_language: 'English' });
});

test('missing or unknown lang -> French (main site)', () => {
  assert.deepStrictEqual(retellDynamicVars(''), { site_language: 'French' });
  assert.deepStrictEqual(retellDynamicVars(undefined), { site_language: 'French' });
  assert.deepStrictEqual(retellDynamicVars('de'), { site_language: 'French' });
});
