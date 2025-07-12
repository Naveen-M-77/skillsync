import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  from: {
    type: String, // e.g. "14:00"
    required: true
  },
  to: {
    type: String, // e.g. "16:30"
    required: true
  }
}, { timestamps: true });

export const Availability = mongoose.model('Availability', availabilitySchema);
