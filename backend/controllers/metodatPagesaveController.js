import { getAllMetodat } from '../models/metodatPagesaveModel.js';

export const getMetodat = async (req, res) => {
  try {
    const metodat = await getAllMetodat();
    res.status(200).json(metodat);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};