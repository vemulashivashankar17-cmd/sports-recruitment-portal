import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Athlete extends Model {
  public id!: number;
  public userId!: number;
  public bio!: string;
  public sports!: string[];
  public height!: string;
  public weight!: string;
  public birthDate!: Date;
  public location!: string;
  public videoUrl!: string;
  public profileCompleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Athlete.init(
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
    bio: {
      type: DataTypes.TEXT
    },
    sports: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    height: {
      type: DataTypes.STRING(50)
    },
    weight: {
      type: DataTypes.STRING(50)
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      field: 'birth_date'
    },
    location: {
      type: DataTypes.STRING(255)
    },
    videoUrl: {
      type: DataTypes.STRING(255),
      field: 'video_url'
    },
    profileCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'profile_completed'
    }
  },
  {
    sequelize,
    tableName: 'athletes',
    timestamps: true,
    underscored: true
  }
);

Athlete.belongsTo(User, { foreignKey: 'userId' });

export default Athlete;
