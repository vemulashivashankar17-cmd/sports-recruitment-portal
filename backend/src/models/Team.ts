import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Team extends Model {
  public id!: number;
  public userId!: number;
  public teamName!: string;
  public sport!: string;
  public location!: string;
  public description!: string;
  public website!: string;
  public logoUrl!: string;
  public verified!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      references: { model: User, key: 'id' },
      onDelete: 'CASCADE',
      field: 'user_id'
    },
    teamName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'team_name'
    },
    sport: {
      type: DataTypes.STRING(100)
    },
    location: {
      type: DataTypes.STRING(255)
    },
    description: {
      type: DataTypes.TEXT
    },
    website: {
      type: DataTypes.STRING(255)
    },
    logoUrl: {
      type: DataTypes.STRING(255),
      field: 'logo_url'
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    tableName: 'teams',
    timestamps: true,
    underscored: true
  }
);

Team.belongsTo(User, { foreignKey: 'userId' });

export default Team;
