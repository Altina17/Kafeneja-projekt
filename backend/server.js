import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
  res.json({ msg: 'Hello!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveri po punon ne port ${PORT}`);
});

/*
e kam shtu route e re 
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoute from './routes/userRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoute);

app.get('/', (req, res) => {
  res.json( "Hello" );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveri po punon ne port ${PORT}`);
});
*/