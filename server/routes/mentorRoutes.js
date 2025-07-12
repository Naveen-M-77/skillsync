import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  addSkill,
  getSkills,
  addAvailability,
  getAvailability
} from '../controllers/mentorController.js';

const router = express.Router();

// Skill routes
router.post('/skills', protect, addSkill);
router.get('/skills', protect, getSkills);

// Availability routes
router.post('/availability', protect, addAvailability);
router.get('/availability', protect, getAvailability);

export default router;
