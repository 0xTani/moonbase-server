// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');

  const users = sequelizeClient.define(
    'users',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      ethaddress: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      fobId: {
        type: DataTypes.STRING,
      },
      alias: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      credits: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      monthsActive: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      pfp: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      organizations: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      organizationsSelected: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      badges: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      bio: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      // @todo login with twitter soon, if it gets too big and cant self regulate
      twitter: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      telegram: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
    },
    {
      hooks: {
        beforeCount(options: any): HookReturn {
          options.raw = true;
        },
      },
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (users as any).associate = function (models: any): void {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return users;
}