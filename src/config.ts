import dotenv from 'dotenv';
dotenv.config();

const {
  PORT,
  NODE_ENV,
  POSTGRESHOST,
  POSTGRESPORT,
  POSTGRESDB,
  POSTGRESDB_TEST,
  POSTGRESUSER,
  POSTGRESPASSWORD,
  BCRYPT_PASSWROD,
  SLART,
  SECRET,
} = process.env;

export default {
  port: PORT,
  dbPort: POSTGRESPORT,
  host: POSTGRESHOST,
  database: NODE_ENV === 'dev' ? POSTGRESDB : POSTGRESDB_TEST,
  user: POSTGRESUSER,
  password: POSTGRESPASSWORD,
  pepper: BCRYPT_PASSWROD,
  salt: SLART,
  jwtSecret: SECRET,
};
