import { Application } from '../declarations';
import users from './users/users.service';
import badge from './badge/badge.service';
import organization from './organization/organization.service';
import event from './event/event.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(badge);
  app.configure(organization);
  app.configure(event);
}
