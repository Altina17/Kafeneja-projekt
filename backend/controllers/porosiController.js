import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../models/porosiModel.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Porosia nuk u gjet' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const postOrder = async (req, res) => {
  try {
    const newOrder = await createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const putOrder = async (req, res) => {
  try {
    const updated = await updateOrder(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const removeOrder = async (req, res) => {
  try {
    await deleteOrder(req.params.id);
    res.status(200).json({ message: 'Porosia u fshi' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};