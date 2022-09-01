// Initializes the `attendance` service on path `/attendance`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Attendance } from './attendance.class';
import createModel from '../../models/attendance.model';
import hooks from './attendance.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'attendance': Attendance & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/attendance', new Attendance(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('attendance');

  service.hooks(hooks);
}
