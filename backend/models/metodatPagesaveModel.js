import pool from '../config/db.js';

export const getAllMetodat = async () => {
  const [rows] = await pool.query('SELECT * FROM metodat_pageses');
  return rows;
};