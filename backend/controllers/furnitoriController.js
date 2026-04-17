import * as Furnitori from '../models/furnitoriModel.js';

export const getAll = async (req, res) => {
  try {
    const data = await Furnitori.getAllFurnitoret();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const data = await Furnitori.getFurnitorById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Nuk u gjet' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const data = await Furnitori.createFurnitor(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const data = await Furnitori.updateFurnitor(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await Furnitori.deleteFurnitor(req.params.id);
    res.json({ message: 'U fshi me sukses' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};