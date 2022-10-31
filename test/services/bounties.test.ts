import assert from 'assert';
import app from '../../src/app';

describe('\'bounties\' service', () => {
  it('registered the service', () => {
    const service = app.service('bounties');

    assert.ok(service, 'Registered the service');
  });
});
