import * as PorositeFurnitor from '../models/porositeFurnitorModel.js';

export const getAll = async (req, res) => {
  try {
    const data = await PorositeFurnitor.getAllPorositeFurnitor();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const data = await PorositeFurnitor.getPorositeFurnitorById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Nuk u gjet' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const data = await PorositeFurnitor.createPorositeFurnitor(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const data = await PorositeFurnitor.updatePorositeFurnitor(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await PorositeFurnitor.deletePorositeFurnitor(req.params.id);
    res.json({ message: 'U fshi me sukses' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};