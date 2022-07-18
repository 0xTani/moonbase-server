import assert from 'assert';
import app from '../../src/app';

describe('\'badge\' service', () => {
  it('registered the service', () => {
    const service = app.service('badge');

    assert.ok(service, 'Registered the service');
  });
});
