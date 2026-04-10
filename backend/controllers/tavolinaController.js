import { getAllTables, getTableById, createTable, updateTable, deleteTable } from '../models/tavolinaModel.js';

export const getTables = async (req, res) => {
  try {
    const tables = await getAllTables();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const getTable = async (req, res) => {
  try {
    const table = await getTableById(req.params.id);
    if (!table) return res.status(404).json({ message: 'Tavolina nuk u gjet' });
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const postTable = async (req, res) => {
  try {
    const newTable = await createTable(req.body);
    res.status(201).json(newTable);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const putTable = async (req, res) => {
  try {
    const updated = await updateTable(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const removeTable = async (req, res) => {
  try {
    await deleteTable(req.params.id);
    res.status(200).json({ message: 'Tavolina u fshi' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};