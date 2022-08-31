import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;


export default {
  before: {
    // all: [ authenticate('jwt') ],
    all: [ ],
    find: [],
    get: [],
    create: [(request: any)=> {
      try {
        delete request.arguments[0]['uuid']
      } catch (error) {
        console.error(error)
      }
    }],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
