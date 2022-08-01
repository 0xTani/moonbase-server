// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const organization = sequelizeClient.define('organization', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telegramGroup: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    discord: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pfp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    backgroundColor: {
      type: DataTypes.STRING,
      defaultValue: '#3788d8'
    },
    admins: {
      type: DataTypes.JSON,
      defaultValue: []
    }
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (organization as any).associate = function (models: any): void {
  };

  return organization;
}
