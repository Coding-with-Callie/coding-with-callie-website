import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig();

const config = {
  secret: process.env.JWT_SECRET,
};

export default registerAs('jwt', () => config);
