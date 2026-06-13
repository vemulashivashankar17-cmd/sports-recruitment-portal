import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Athlete from './Athlete';
import JobPosting from './JobPosting';

class Application extends Model {
  public id!: number;
  public athleteId!: number;
  public jobPostingId!: number;
  public status!: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  public coverLetter!: string;
  public readonly appliedAt!: Date;
  public readonly updatedAt!: Date;
}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    athleteId: {
      type: DataTypes.INTEGER,
      references: { model: Athlete, key: 'id' },
      onDelete: 'CASCADE',
      field: 'athlete_id'
    },
    jobPostingId: {
      type: DataTypes.INTEGER,
      references: { model: JobPosting, key: 'id' },
      onDelete: 'CASCADE',
      field: 'job_posting_id'
    },
    status: {
      type: DataTypes.ENUM('pending', 'reviewed', 'accepted', 'rejected'),
      defaultValue: 'pending'
    },
    coverLetter: {
      type: DataTypes.TEXT,
      field: 'cover_letter'
    }
  },
  {
    sequelize,
    tableName: 'applications',
    timestamps: true,
    createdAt: 'applied_at',
    updatedAt: 'updated_at',
    underscored: true
  }
);

Application.belongsTo(Athlete, { foreignKey: 'athleteId' });
Application.belongsTo(JobPosting, { foreignKey: 'jobPostingId' });

export default Application;
