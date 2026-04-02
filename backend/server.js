import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import produktiRoute from './routes/produktiRoute.js';
import kategoriRoute from './routes/kategoriRoute.js';
import porosiRoute from './routes/porosiRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoute); 
app.use('/api/auth', authRoute); //shtimi i auth route
app.use('/api/products', produktiRoute); //  shtimi i route-produktete
app.use('/api/categories', kategoriRoute); //shtimi i route-kategori
app.use('/api/orders', porosiRoute); //shtimi i route - porosi

app.get('/', (req, res) => {
  res.send("HI!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveri po punon ne port ${PORT}`);
});