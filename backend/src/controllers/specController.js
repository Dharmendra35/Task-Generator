import { Spec } from '../models/Spec.js';
import { generateSpec } from '../utils/generateSpec.js';

export const generateSpecController = async (req, res) => {
  try {
    const formData = req.body;
    const specData = generateSpec(formData);
    
    const spec = new Spec({
      ...specData,
      userId: req.user.id
    });
    await spec.save();
    
    res.status(201).json(spec);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecentSpecs = async (req, res) => {
  try {
    const specs = await Spec.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(5);
    res.status(200).json(specs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSpec = async (req, res) => {
  try {
    const { id } = req.params;
    const { tasks, userStories } = req.body;
    
    const spec = await Spec.findById(id);
    
    if (!spec) {
      return res.status(404).json({ error: 'Spec not found' });
    }

    if (spec.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this spec' });
    }

    if (tasks) spec.tasks = tasks;
    if (userStories) spec.userStories = userStories;
    
    await spec.save();
    res.status(200).json(spec);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSpec = async (req, res) => {
  try {
    const { id } = req.params;
    const spec = await Spec.findById(id);
    
    if (!spec) {
      return res.status(404).json({ error: 'Spec not found' });
    }

    if (spec.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this spec' });
    }

    await Spec.findByIdAndDelete(id);
    res.status(200).json({ message: 'Spec deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
