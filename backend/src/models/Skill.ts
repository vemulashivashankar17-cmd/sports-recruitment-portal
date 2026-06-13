import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Athlete from './Athlete';

class Skill extends Model {
  public id!: number;
  public athleteId!: number;
  public skillName!: string;
  public proficiencyLevel!: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  public readonly createdAt!: Date;
}

Skill.init(
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
    skillName: {
      type: DataTypes.STRING(255),
      field: 'skill_name'
    },
    proficiencyLevel: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced', 'expert'),
      field: 'proficiency_level'
    }
  },
  {
    sequelize,
    tableName: 'skills',
    timestamps: true,
    updatedAt: false,
    underscored: true
  }
);

Skill.belongsTo(Athlete, { foreignKey: 'athleteId' });

export default Skill;
