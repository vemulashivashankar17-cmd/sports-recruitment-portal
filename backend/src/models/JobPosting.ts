import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Team from './Team';

class JobPosting extends Model {
  public id!: number;
  public teamId!: number;
  public title!: string;
  public description!: string;
  public sport!: string;
  public position!: string;
  public requirements!: string;
  public salaryRange!: string;
  public status!: 'active' | 'closed' | 'filled';
  public deadline!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

JobPosting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    teamId: {
      type: DataTypes.INTEGER,
      references: { model: Team, key: 'id' },
      onDelete: 'CASCADE',
      field: 'team_id'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sport: {
      type: DataTypes.STRING(100)
    },
    position: {
      type: DataTypes.STRING(100)
    },
    requirements: {
      type: DataTypes.TEXT
    },
    salaryRange: {
      type: DataTypes.STRING(100),
      field: 'salary_range'
    },
    status: {
      type: DataTypes.ENUM('active', 'closed', 'filled'),
      defaultValue: 'active'
    },
    deadline: {
      type: DataTypes.DATEONLY
    }
  },
  {
    sequelize,
    tableName: 'job_postings',
    timestamps: true,
    underscored: true
  }
);

JobPosting.belongsTo(Team, { foreignKey: 'teamId' });

export default JobPosting;
