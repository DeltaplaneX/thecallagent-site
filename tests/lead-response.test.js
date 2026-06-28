/* Contract test for the contact-form lead response handling (js/main.js).
 *
 * The backend (Railway /lead) signals the business outcome with BOTH an HTTP
 * status and a JSON `success` flag. The form must only show "message sent" when
 * the lead was actually accepted — i.e. res.ok AND data.success === true.
 *
 * Run: node --test tests/
 * No npm dependencies, no build step (matches the static-site constraint).
 */
const { test } = require('node:test');
const assert = require('node:assert');

const { leadSucceeded } = require('../js/main.js');

test('happy path: 200 + {success:true} -> accepted', () => {
  assert.strictEqual(leadSucceeded({ ok: true }, { success: true }), true);
});

test('consent rejected: 200 + {success:false} -> NOT accepted (no false positive)', () => {
  assert.strictEqual(leadSucceeded({ ok: true }, { success: false }), false);
});

test('validation error: 422 + {detail:[...]} -> NOT accepted', () => {
  assert.strictEqual(leadSucceeded({ ok: false }, { detail: [{ msg: 'Field required' }] }), false);
});

test('server error: !ok + null body -> NOT accepted', () => {
  assert.strictEqual(leadSucceeded({ ok: false }, null), false);
});

test('defensive: ok but unparseable/empty body -> NOT accepted', () => {
  assert.strictEqual(leadSucceeded({ ok: true }, null), false);
});

test('defensive: success present but not strictly true -> NOT accepted', () => {
  assert.strictEqual(leadSucceeded({ ok: true }, { success: 'true' }), false);
});
