import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import produktiRoute from './routes/produktiRoute.js';
import kategoriRoute from './routes/kategoriRoute.js';
import porosiRoute from './routes/porosiRoute.js';
import detajetPorosiseRoute from './routes/detajetPorosiseRoute.js';
import tavolinaRoute from './routes/tavolinaRoute.js';
import punetoriRoute from './routes/punetoriRoute.js';
import inventariRoute from './routes/inventariRoute.js';
import furnitoriRoute from './routes/furnitoriRoute.js';
import rezervimiRoute from './routes/rezervimiRoute.js';
import turniRoute from './routes/turniRoute.js';
import shpenzimiRoute from './routes/shpenzimiRoute.js';
import porositeFurnitorRoute from './routes/porositeFurnitorRoute.js';
import recetaRoute from './routes/recetaRoute.js';
import pushimiRoute from './routes/pushimiRoute.js';
import metodatPagesaveRoute from './routes/metodatPagesaveRoute.js';
import llojetProdukteveRoute from './routes/llojetProdukteveRoute.js';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));
app.use(express.json());

app.use('/api/employees', punetoriRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', produktiRoute);
app.use('/api/categories', kategoriRoute);
app.use('/api/orders', porosiRoute);
app.use('/api/tables', tavolinaRoute);
app.use('/api/inventari', inventariRoute);
app.use('/api/furnitoret', furnitoriRoute);
app.use('/api/rezervimet', rezervimiRoute);
app.use('/api/turnet', turniRoute);
app.use('/api/shpenzimet', shpenzimiRoute);
app.use('/api/porosite-furnitor', porositeFurnitorRoute);
app.use('/api/receta', recetaRoute);
app.use('/api/lejet', pushimiRoute);
app.use('/api/detajet-porosise', detajetPorosiseRoute);
app.use('/api/metodat-pageses', metodatPagesaveRoute);
app.use('/api/llojet-produkteve', llojetProdukteveRoute);

app.get('/', (req, res) => {
  res.send("HI!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveri po punon ne port ${PORT}`);
});