import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../models/produktiModel.js';

export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produkti nuk u gjet' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const postProduct = async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const putProduct = async (req, res) => {
  try {
    const updated = await updateProduct(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.status(200).json({ message: 'Produkti u fshi' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};