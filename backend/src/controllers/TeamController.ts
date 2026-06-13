import { Request, Response } from 'express';
import Team from '../models/Team';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth.middleware';

export class TeamController {
  // List all teams
  static async listTeams(req: Request, res: Response) {
    try {
      const { sport, location, limit = 20, offset = 0 } = req.query;
      const where: any = {};

      if (sport) where.sport = sport;
      if (location) where.location = location;

      const teams = await Team.findAndCountAll({
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

      res.json(teams);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get team details
  static async getTeam(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const team = await Team.findByPk(id, {
        include: [
          {
            model: User,
            attributes: { exclude: ['password'] }
          }
        ]
      });

      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }

      res.json(team);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create team profile
  static async createProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId;
      const { teamName, sport, location, description, website, logoUrl } = req.body;

      const team = await Team.create({
        userId,
        teamName,
        sport,
        location,
        description,
        website,
        logoUrl
      });

      res.status(201).json({
        message: 'Team profile created',
        team
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update team profile
  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { teamName, sport, location, description, website, logoUrl } = req.body;

      const team = await Team.findByPk(id);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }

      // Check ownership
      if (team.userId !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      await team.update({
        teamName,
        sport,
        location,
        description,
        website,
        logoUrl
      });

      res.json({
        message: 'Team profile updated successfully',
        team
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
