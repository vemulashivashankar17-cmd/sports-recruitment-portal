import { Request, Response } from 'express';
import Application from '../models/Application';
import Athlete from '../models/Athlete';
import JobPosting from '../models/JobPosting';
import { AuthRequest } from '../middleware/auth.middleware';

export class ApplicationController {
  // Submit application
  static async submitApplication(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId;
      const { jobPostingId, coverLetter } = req.body;

      // Get athlete
      const athlete = await Athlete.findOne({ where: { userId } });
      if (!athlete) {
        return res.status(400).json({ error: 'Athlete profile not found' });
      }

      // Check if job exists
      const job = await JobPosting.findByPk(jobPostingId);
      if (!job) {
        return res.status(404).json({ error: 'Job posting not found' });
      }

      // Check if already applied
      const existingApp = await Application.findOne({
        where: { athleteId: athlete.id, jobPostingId }
      });
      if (existingApp) {
        return res.status(400).json({ error: 'Already applied to this job' });
      }

      const application = await Application.create({
        athleteId: athlete.id,
        jobPostingId,
        coverLetter
      });

      res.status(201).json({
        message: 'Application submitted',
        application
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get application details
  static async getApplication(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const application = await Application.findByPk(id, {
        include: ['Athlete', 'JobPosting']
      });

      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }

      res.json(application);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update application status
  static async updateStatus(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const application = await Application.findByPk(id, {
        include: ['JobPosting']
      });
      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }

      // Check if user is the recruiter
      const job = application.JobPosting;
      const team = await (job as any).getTeam();
      if (team.userId !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      await application.update({ status });
      res.json({
        message: 'Application status updated',
        application
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Withdraw application
  static async withdrawApplication(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const application = await Application.findByPk(id);

      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }

      // Check ownership
      const athlete = await Athlete.findByPk(application.athleteId);
      if (athlete?.userId !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      await application.destroy();
      res.json({ message: 'Application withdrawn' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
