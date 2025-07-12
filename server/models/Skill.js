import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  }
}, { timestamps: true });

export const Skill = mongoose.model('Skill', skillSchema);
