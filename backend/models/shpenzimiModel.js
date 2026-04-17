import pool from '../config/db.js';

export const getAllShpenzimet = async () => {
  const [rows] = await pool.query('SELECT * FROM shpenzimet');
  return rows;
};

export const getShpenzimById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM shpenzimet WHERE shpenzim_id = ?', [id]
  );
  return rows[0];
};

export const createShpenzim = async ({ kategoria, pershkrimi, shuma, data, metoda_pageses }) => {
  const [result] = await pool.query(
    'INSERT INTO shpenzimet (kategoria, pershkrimi, shuma, data, metoda_pageses) VALUES (?, ?, ?, ?, ?)',
    [kategoria, pershkrimi, shuma, data, metoda_pageses]
  );
  return { id: result.insertId, kategoria };
};

export const updateShpenzim = async (id, { kategoria, pershkrimi, shuma, data, metoda_pageses }) => {
  await pool.query(
    'UPDATE shpenzimet SET kategoria=?, pershkrimi=?, shuma=?, data=?, metoda_pageses=? WHERE shpenzim_id=?',
    [kategoria, pershkrimi, shuma, data, metoda_pageses, id]
  );
  return { id, kategoria };
};

export const deleteShpenzim = async (id) => {
  await pool.query('DELETE FROM shpenzimet WHERE shpenzim_id = ?', [id]);
};