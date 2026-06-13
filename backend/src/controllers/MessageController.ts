import { Request, Response } from 'express';
import Message from '../models/Message';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth.middleware';

export class MessageController {
  // Get user's messages
  static async getMessages(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId;
      const { unreadOnly = false, limit = 20, offset = 0 } = req.query;
      const where: any = { recipientId: userId };

      if (unreadOnly === 'true') where.read = false;

      const messages = await Message.findAndCountAll({
        where,
        include: [
          {
            model: User,
            as: 'sender',
            attributes: { exclude: ['password'] }
          }
        ],
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        order: [['createdAt', 'DESC']]
      });

      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Send message
  static async sendMessage(req: AuthRequest, res: Response) {
    try {
      const senderId = req.userId;
      const { recipientId, subject, message } = req.body;

      // Check if recipient exists
      const recipient = await User.findByPk(recipientId);
      if (!recipient) {
        return res.status(404).json({ error: 'Recipient not found' });
      }

      const newMessage = await Message.create({
        senderId,
        recipientId,
        subject,
        message
      });

      res.status(201).json({
        message: 'Message sent',
        data: newMessage
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get message details
  static async getMessage(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      const message = await Message.findByPk(id, {
        include: [
          {
            model: User,
            as: 'sender',
            attributes: { exclude: ['password'] }
          }
        ]
      });

      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }

      // Check if user is recipient
      if (message.recipientId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      res.json(message);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Mark message as read
  static async markAsRead(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      const message = await Message.findByPk(id);
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }

      // Check if user is recipient
      if (message.recipientId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      await message.update({ read: true });
      res.json({ message: 'Message marked as read', data: message });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
