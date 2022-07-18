// Initializes the `badge` service on path `/badge`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Badge } from './badge.class';
import createModel from '../../models/badge.model';
import hooks from './badge.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'badge': Badge & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/badge', new Badge(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('badge');

  service.hooks(hooks);
}
