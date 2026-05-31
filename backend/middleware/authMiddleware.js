import jwt from 'jsonwebtoken';


//frontend kerkese ne nje rruge te mbrojtur te header ne HTTP
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token mungon' });
  }
  //nese egziston; metoda jwt ia kalojm tokenin dhe process.env.JWT_SECRET
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);   //CELSI QE E DI VETEM SERVERI
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token i pavlefshëm' });
  }
};

export const protect = verifyToken;