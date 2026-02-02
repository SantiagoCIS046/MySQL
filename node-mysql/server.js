// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de conexión MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test'
});

// Conectar a MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ 
    message: 'Servidor MySQL funcionando',
    status: 'OK'
  });
});

// Ruta para probar la conexión a la base de datos
app.get('/test-db', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ 
      message: 'Conexión a MySQL exitosa',
      result: results[0].solution 
    });
  });
});

// Ruta para obtener datos de ejemplo
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});