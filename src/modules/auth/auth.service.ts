import bcrypt from "bcrypt";
import User from "../../models/User.model";

interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

const registerUser = async (payload: RegisterUserPayload) => {
  const { name, email, password } = payload;

  // Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new Error("Invalid credentials");
  }

  return user;
};

export const AuthService = {
  registerUser,
  loginUser,
};