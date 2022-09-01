// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const attendance = sequelizeClient.define('attendance', {
    poapMinted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    privateAttendance: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (attendance as any).associate = function (models: any): void {
    attendance.belongsTo(models.users)
    attendance.belongsTo(models.event)
  };

  return attendance;
}
