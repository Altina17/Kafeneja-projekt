import * as Inventari from '../models/inventariModel.js';

export const getAll = async (req, res) => {
  try {
    const data = await Inventari.getAllInventari();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const data = await Inventari.getInventariById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Nuk u gjet' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const data = await Inventari.createInventari(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const data = await Inventari.updateInventari(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await Inventari.deleteInventari(req.params.id);
    res.json({ message: 'U fshi me sukses' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};