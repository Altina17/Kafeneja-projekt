import pool from '../config/db.js';

export const getAllEmployees = async () => {
  const [rows] = await pool.query('SELECT * FROM punetoret');
  return rows;
};

export const getEmployeeById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM punetoret WHERE punetor_id = ?', [id]
  );
  return rows[0];
};

export const createEmployee = async ({ emri, mbiemri, pozita, telefoni, email, data_punesimit, paga, turni }) => {
  const [result] = await pool.query(
    'INSERT INTO punetoret (emri, mbiemri, pozita, telefoni, email, data_punesimit, paga, turni) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [emri, mbiemri, pozita, telefoni, email, data_punesimit, paga, turni]
  );
  return { id: result.insertId, emri, mbiemri, pozita };
};

export const updateEmployee = async (id, { emri, mbiemri, pozita, telefoni, email, data_punesimit, paga, turni }) => {
  await pool.query(
    'UPDATE punetoret SET emri=?, mbiemri=?, pozita=?, telefoni=?, email=?, data_punesimit=?, paga=?, turni=? WHERE punetor_id=?',
    [emri, mbiemri, pozita, telefoni, email, data_punesimit, paga, turni, id]
  );
  return { id, emri, mbiemri, pozita };
};

export const deleteEmployee = async (id) => {
  await pool.query('DELETE FROM punetoret WHERE punetor_id = ?', [id]);
};