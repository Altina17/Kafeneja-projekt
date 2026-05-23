import { getAllDetajet, getDetajetByPorosi, createDetal, updateDetal, deleteDetal } from '../models/detajetPorosiseModel.js';

export const getDetajet = async (req, res) => {
  try {
    const detajet = await getAllDetajet();
    res.status(200).json(detajet);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const getDetajetPorosi = async (req, res) => {
  try {
    const detajet = await getDetajetByPorosi(req.params.porosi_id);
    res.status(200).json(detajet);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const postDetal = async (req, res) => {
  try {
    const detal = await createDetal(req.body);
    res.status(201).json(detal);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const putDetal = async (req, res) => {
  try {
    const detal = await updateDetal(req.params.id, req.body);
    res.status(200).json(detal);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const removeDetal = async (req, res) => {
  try {
    await deleteDetal(req.params.id);
    res.status(200).json({ message: 'Detali u fshi' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};