// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const event = sequelizeClient.define('event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start: {
      type: DataTypes.STRING,
      allowNull: false
    },
    end: {
      type: DataTypes.STRING,
      allowNull: false
    },
    backgroundColor: {
      type: DataTypes.STRING,
      defaultValue: '#3788d8'
    },
    url: { 
      type: DataTypes.STRING,
      defaultValue: ''
    },
    description: { 
      type: DataTypes.STRING,
      defaultValue: ''
    },
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (event as any).associate = function (models: any): void {
    event.belongsTo(models.organization, {foreignKey: {allowNull: false}})
  };

  return event;
}
