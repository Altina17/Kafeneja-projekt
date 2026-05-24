import { getAllLlojet } from '../models/llojetProdukteveModel.js';

export const getLlojet = async (req, res) => {
  try {
    const llojet = await getAllLlojet();
    res.status(200).json(llojet);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};