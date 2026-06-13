import { Request, Response } from 'express';
import JobPosting from '../models/JobPosting';
import Team from '../models/Team';
import { AuthRequest } from '../middleware/auth.middleware';

export class JobController {
  // List all job postings
  static async listJobs(req: Request, res: Response) {
    try {
      const { sport, position, status = 'active', limit = 20, offset = 0 } = req.query;
      const where: any = {};

      if (sport) where.sport = sport;
      if (position) where.position = position;
      if (status) where.status = status;

      const jobs = await JobPosting.findAndCountAll({
        where,
        include: ['Team'],
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        order: [['createdAt', 'DESC']]
      });

      res.json(jobs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get job posting details
  static async getJob(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const job = await JobPosting.findByPk(id, {
        include: ['Team']
      });

      if (!job) {
        return res.status(404).json({ error: 'Job posting not found' });
      }

      res.json(job);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create job posting
  static async createJob(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId;
      const { title, description, sport, position, requirements, salaryRange, deadline } = req.body;

      // Get team associated with user
      const team = await Team.findOne({ where: { userId } });
      if (!team) {
        return res.status(400).json({ error: 'Team profile not found' });
      }

      const job = await JobPosting.create({
        teamId: team.id,
        title,
        description,
        sport,
        position,
        requirements,
        salaryRange,
        deadline
      });

      res.status(201).json({
        message: 'Job posting created',
        job
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update job posting
  static async updateJob(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, sport, position, requirements, salaryRange, status, deadline } = req.body;

      const job = await JobPosting.findByPk(id, { include: ['Team'] });
      if (!job) {
        return res.status(404).json({ error: 'Job posting not found' });
      }

      // Check ownership
      if (job.Team.userId !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      await job.update({
        title,
        description,
        sport,
        position,
        requirements,
        salaryRange,
        status,
        deadline
      });

      res.json({
        message: 'Job posting updated',
        job
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete job posting
  static async deleteJob(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const job = await JobPosting.findByPk(id, { include: ['Team'] });

      if (!job) {
        return res.status(404).json({ error: 'Job posting not found' });
      }

      // Check ownership
      if (job.Team.userId !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      await job.destroy();
      res.json({ message: 'Job posting deleted' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
