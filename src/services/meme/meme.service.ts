// Initializes the `meme` service on path `/meme`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Meme } from './meme.class';
import createModel from '../../models/meme.model';
import hooks from './meme.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'meme': Meme & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/meme', new Meme(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('meme');

  service.hooks(hooks);
}
