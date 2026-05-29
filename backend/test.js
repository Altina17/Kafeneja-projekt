import bcrypt from 'bcryptjs';
const hash = '$2b$10$WvVtgoP01GJDjtUEILOvnuBZbyPSzR0Lwh3v39ir2MK7nFwt7OlIa';
const result = await bcrypt.compare('Kamarier1!', hash);
console.log('Match:', result);