const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User registered", user: { id: newUser.id, username, email } });
  } catch (err) {
    res.status(500).json({ error: "User registration failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
exports.userDetails = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ email: user.email, username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data" })
  }
}