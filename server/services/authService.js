const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

const registerUser = async (email, username, password) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password — 10 is the salt rounds (how many times it hashes)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to DB
  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword
    }
  });

  return { id: user.id, email: user.email, username: user.username };
};

const loginUser = async (email, password) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Compare entered password with stored hash
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { token, username: user.username };
};

module.exports = { registerUser, loginUser };