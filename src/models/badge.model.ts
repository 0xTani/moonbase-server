// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const badge = sequelizeClient.define('badge', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    definition: {
      type: DataTypes.STRING,
      allowNull: true
    },
    maxUsers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (badge as any).associate = function (models: any): void {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return badge;
}
