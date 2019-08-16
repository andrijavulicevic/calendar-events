import { users } from "./mock";

async function login(email, password) {
  const existingUser = users.find(user => user.email === email);

  if (!existingUser) {
    throw new Error("UNKNOWN_USER");
  }
  if (existingUser.password !== password) {
    throw new Error("INVALID_CREDENTIALS");
  }
  return true;
}

async function register(email, password, confirmPassword) {
  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    throw new Error("EMAIL_IN_USE");
  }
  if (password !== confirmPassword) {
    throw new Error("PASSWORDS_DONT_MATCH");
  }
  users.push({ email, password });
  return true;
}

export { login, register };
