import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import produktiRoute from './routes/produktiRoute.js';
import kategoriRoute from './routes/kategoriRoute.js';
import porosiRoute from './routes/porosiRoute.js';
import tavolinaRoute from './routes/tavolinaRoute.js';
import punetoriRoute from './routes/punetoriRoute.js';
import inventariRoute from './routes/inventariRoute.js';
import furnitoriRoute from './routes/furnitoriRoute.js';
import rezervimiRoute from './routes/rezervimiRoute.js';
import turniRoute from './routes/turniRoute.js';
import shpenzimiRoute from './routes/shpenzimiRoute.js';
import porositeFurnitorRoute from './routes/porositeFurnitorRoute.js';

const app = express();

app.use(cors());
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

app.get('/', (req, res) => {
  res.send("HI!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveri po punon ne port ${PORT}`);
});