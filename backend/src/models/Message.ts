import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Message extends Model {
  public id!: number;
  public senderId!: number;
  public recipientId!: number;
  public subject!: string;
  public message!: string;
  public read!: boolean;
  public readonly createdAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    senderId: {
      type: DataTypes.INTEGER,
      references: { model: User, key: 'id' },
      onDelete: 'CASCADE',
      field: 'sender_id'
    },
    recipientId: {
      type: DataTypes.INTEGER,
      references: { model: User, key: 'id' },
      onDelete: 'CASCADE',
      field: 'recipient_id'
    },
    subject: {
      type: DataTypes.STRING(255)
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    tableName: 'messages',
    timestamps: true,
    updatedAt: false,
    underscored: true
  }
);

Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });

export default Message;
