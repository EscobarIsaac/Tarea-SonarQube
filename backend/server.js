require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const zonesRoutes = require('./routes/zones');
const spacesRoutes = require('./routes/spaces');

const app = express();
const port = 3000;

// =========================
// Seguridad: ocultar fingerprinting
// =========================
app.disable('x-powered-by');

// =========================
// Middlewares
// =========================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// =========================
// CORS SEGURO
// =========================
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8080'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// =========================
// Rutas
// =========================
app.use('/zones', zonesRoutes);
app.use('/spaces', spacesRoutes);

// =========================
// Manejo seguro de errores
// =========================
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

// =========================
// Inicio del servidor
// =========================
app.listen(port, () => {
  console.log(`Server running securely on port ${port}`);
});
