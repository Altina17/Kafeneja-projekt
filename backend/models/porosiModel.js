import pool from '../config/db.js';

export const getAllOrders = async () => {
  const [rows] = await pool.query('SELECT * FROM porosite');
  return rows;
};

export const getOrderById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM porosite WHERE porosi_id = ?', [id]
  );
  return rows[0];
};

export const createOrder = async ({ tavolina_id, kamarier_id, shuma_totale, statusi, metoda_pageses }) => {
  const [result] = await pool.query(
    'INSERT INTO porosite (tavolina_id, kamarier_id, shuma_totale, statusi, metoda_pageses) VALUES (?, ?, ?, ?, ?)',
    [tavolina_id, kamarier_id, shuma_totale, statusi, metoda_pageses]
  );
  return { id: result.insertId, tavolina_id, kamarier_id, shuma_totale, statusi };
};

export const updateOrder = async (id, { tavolina_id, kamarier_id, shuma_totale, statusi, metoda_pageses }) => {
  await pool.query(
    'UPDATE porosite SET tavolina_id=?, kamarier_id=?, shuma_totale=?, statusi=?, metoda_pageses=? WHERE porosi_id=?',
    [tavolina_id, kamarier_id, shuma_totale, statusi, metoda_pageses, id]
  );
  return { id, tavolina_id, kamarier_id, shuma_totale, statusi };
};

export const deleteOrder = async (id) => {
  await pool.query('DELETE FROM porosite WHERE porosi_id = ?', [id]);
};