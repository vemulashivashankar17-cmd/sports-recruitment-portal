import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Athlete from '../models/Athlete';
import Team from '../models/Team';

export class AuthController {
  // Register a new user
  static async register(req: Request, res: Response) {
    try {
      const { email, password, userType, firstName, lastName } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Create new user
      const user = await User.create({
        email,
        password,
        userType,
        firstName,
        lastName
      });

      // Create profile based on user type
      if (userType === 'athlete') {
        await Athlete.create({ userId: user.id });
      } else if (userType === 'recruiter') {
        await Team.create({ userId: user.id, teamName: firstName || 'My Team' });
      }

      const token = this.generateToken(user);

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          userType: user.userType
        },
        token
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Login user
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Compare password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = this.generateToken(user);

      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          userType: user.userType,
          firstName: user.firstName,
          lastName: user.lastName
        },
        token
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Logout user
  static async logout(req: Request, res: Response) {
    try {
      res.json({ message: 'Logout successful' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Refresh token
  static async refreshToken(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Token required' });
      }

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newToken = this.generateToken(user);
      res.json({ token: newToken });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  private static generateToken(user: User): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        userType: user.userType
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );
  }
}
