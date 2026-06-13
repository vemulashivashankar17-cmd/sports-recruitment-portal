import { Request, Response } from 'express';
import Athlete from '../models/Athlete';
import User from '../models/User';
import Skill from '../models/Skill';
import Application from '../models/Application';
import { AuthRequest } from '../middleware/auth.middleware';

export class AthleteController {
  // List all athletes
  static async listAthletes(req: Request, res: Response) {
    try {
      const { sport, location, limit = 20, offset = 0 } = req.query;
      const where: any = { profileCompleted: true };

      if (sport) where.sports = { [require('sequelize').Op.contains]: [sport] };
      if (location) where.location = location;

      const athletes = await Athlete.findAndCountAll({
        where,
        include: [
          {
            model: User,
            attributes: { exclude: ['password'] }
          }
        ],
        limit: parseInt(limit as string),
        offset: parseInt(offset as string)
      });

      res.json(athletes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get athlete details
  static async getAthlete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const athlete = await Athlete.findByPk(id, {
        include: [
          {
            model: User,
            attributes: { exclude: ['password'] }
          },
          {
            model: Skill
          }
        ]
      });

      if (!athlete) {
        return res.status(404).json({ error: 'Athlete not found' });
      }

      res.json(athlete);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create athlete profile
  static async createProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId;
      const { bio, sports, height, weight, birthDate, location, videoUrl } = req.body;

      const athlete = await Athlete.create({
        userId,
        bio,
        sports,
        height,
        weight,
        birthDate,
        location,
        videoUrl,
        profileCompleted: true
      });

      res.status(201).json({
        message: 'Athlete profile created',
        athlete
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update athlete profile
  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { bio, sports, height, weight, birthDate, location, videoUrl } = req.body;

      const athlete = await Athlete.findByPk(id);
      if (!athlete) {
        return res.status(404).json({ error: 'Athlete not found' });
      }

      // Check ownership
      if (athlete.userId !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      await athlete.update({
        bio,
        sports,
        height,
        weight,
        birthDate,
        location,
        videoUrl
      });

      res.json({
        message: 'Profile updated successfully',
        athlete
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get athlete's applications
  static async getApplications(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const athlete = await Athlete.findByPk(id);

      if (!athlete) {
        return res.status(404).json({ error: 'Athlete not found' });
      }

      const applications = await Application.findAll({
        where: { athleteId: id },
        include: ['JobPosting']
      });

      res.json(applications);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
