import assert from 'assert';
import app from '../../src/app';

describe('\'meme\' service', () => {
  it('registered the service', () => {
    const service = app.service('meme');

    assert.ok(service, 'Registered the service');
  });
});
