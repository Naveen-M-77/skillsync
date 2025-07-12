import { Skill } from '../models/Skill.js';
import { Availability } from '../models/Availability.js';

/**
 * @desc   Create a new skill for the logged-in mentor
 * @route  POST /api/mentor/skills
 * @access Private (Mentor only)
 */
export const addSkill = async (req, res) => {
  try {
    if (req.user.role !== 'Mentor') {
      return res.status(403).json({ message: 'Only mentors can add skills' });
    }

    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Skill name is required' });
    }

    const skill = await Skill.create({
      mentor: req.user._id,
      name,
      description,
    });

    res.status(201).json(skill);
  } catch (err) {
    console.error('Add skill error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc   Get all skills for the logged-in mentor
 * @route  GET /api/mentor/skills
 * @access Private (Mentor only)
 */
export const getSkills = async (req, res) => {
  try {
    if (req.user.role !== 'Mentor') {
      return res.status(403).json({ message: 'Only mentors can view skills' });
    }

    const skills = await Skill.find({ mentor: req.user._id }).sort('-createdAt');
    res.json(skills);
  } catch (err) {
    console.error('Get skills error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc   Add availability slot for the mentor
 * @route  POST /api/mentor/availability
 * @access Private (Mentor only)
 */
export const addAvailability = async (req, res) => {
  try {
    if (req.user.role !== 'Mentor') {
      return res.status(403).json({ message: 'Only mentors can set availability' });
    }

    const { day, from, to } = req.body;
    if (!day || !from || !to) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const slot = await Availability.create({
      mentor: req.user._id,
      day,
      from,
      to,
    });

    res.status(201).json(slot);
  } catch (err) {
    console.error('Add availability error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc   Get all availability slots for the mentor
 * @route  GET /api/mentor/availability
 * @access Private (Mentor only)
 */
export const getAvailability = async (req, res) => {
  try {
    if (req.user.role !== 'Mentor') {
      return res.status(403).json({ message: 'Only mentors can view availability' });
    }

    const slots = await Availability.find({ mentor: req.user._id }).sort('day from');
    res.json(slots);
  } catch (err) {
    console.error('Get availability error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
