import * as bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
};

export const verifyPasswordMatches = async (pass: string, user) => {
  return await bcrypt.compare(pass, user.password);
};
