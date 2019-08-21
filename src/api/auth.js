import { users } from "./mock";
import { simulateLoading } from "./helpers";

async function login(email, password) {
  // set this on top of fn to simulate loading time for both success and error
  await simulateLoading();
  const existingUser = users.find(user => user.email === email);

  if (!existingUser) {
    throw new Error("Invalid credentilas! Please, try again.");
  }
  if (existingUser.password !== password) {
    throw new Error("Invalid credentilas! Please, try again.");
  }

  return existingUser;
}

async function register(email, password, confirmPassword) {
  // set this on top of fn to simulate loading time for both success and error
  await simulateLoading();
  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    throw new Error("Email already in use!");
  }
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match!");
  }
  users.push({ email, password });
}

export { login, register };
