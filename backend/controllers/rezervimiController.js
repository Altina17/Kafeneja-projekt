import * as Rezervimi from '../models/rezervimiModel.js';

export const getAll = async (req, res) => {
  try {
    const data = await Rezervimi.getAllRezervimet();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const data = await Rezervimi.getRezervimById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Nuk u gjet' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const data = await Rezervimi.createRezervim(req.body);
    res.status(201).json(data);
  } catch (error) {
    if (error.message === 'Tavolina është e rezervuar për këtë datë dhe orë') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const data = await Rezervimi.updateRezervim(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await Rezervimi.deleteRezervim(req.params.id);
    res.json({ message: 'U fshi me sukses' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const getTavolinatZena = async (req, res) => {
  try {
    const { data, ora } = req.query;
    if (!data || !ora) return res.status(400).json({ message: 'Data dhe ora kërkohen' });
    const tavolinat = await Rezervimi.getTavolinatEZena(data, ora);
    res.status(200).json(tavolinat);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};