import * as Receta from '../models/recetaModel.js';

export const getAll = async (req, res) => {
  try {
    const data = await Receta.getAllReceta();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const getByProduktId = async (req, res) => {
  try {
    const data = await Receta.getRecetaByProduktId(req.params.produkt_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const data = await Receta.getRecetaById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Nuk u gjet' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const data = await Receta.createReceta(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const data = await Receta.updateReceta(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await Receta.deleteReceta(req.params.id);
    res.json({ message: 'U fshi me sukses' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};