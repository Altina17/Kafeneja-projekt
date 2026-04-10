import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../models/kategoriModel.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Kategoria nuk u gjet' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const postCategory = async (req, res) => {
  try {
    const newCategory = await createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const putCategory = async (req, res) => {
  try {
    const updated = await updateCategory(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const removeCategory = async (req, res) => {
  try {
    await deleteCategory(req.params.id);
    res.status(200).json({ message: 'Kategoria u fshi' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};