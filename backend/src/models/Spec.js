import mongoose from 'mongoose';

const specSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  goal: String,
  users: String,
  constraints: String,
  type: String,
  risks: String,
  userStories: [String],
  tasks: [
    {
      title: String,
      category: String,
      order: Number
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Spec = mongoose.model('Spec', specSchema);
