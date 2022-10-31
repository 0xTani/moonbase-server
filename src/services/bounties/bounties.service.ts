// Initializes the `bounties` service on path `/bounties`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Bounties } from './bounties.class';
import createModel from '../../models/bounties.model';
import hooks from './bounties.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'bounties': Bounties & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/bounties', new Bounties(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('bounties');

  service.hooks(hooks);
}
