export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isValidPassword = (password: string) => password.length >= 6;

export const isValidName = (name: string) => name.trim().length >= 3;

export interface FieldErrors {
  [key: string]: string | undefined;
}

export const validateLogin = (email: string, password: string): FieldErrors => {
  const errors: FieldErrors = {};
  if (!email.trim()) errors.email = "Email is required";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email";

  if (!password) errors.password = "Password is required";

  return errors;
};

export const validateRegister = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): FieldErrors => {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Name is required";
  else if (!isValidName(name)) errors.name = "Name must be at least 3 characters";

  if (!email.trim()) errors.email = "Email is required";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email";

  if (!password) errors.password = "Password is required";
  else if (!isValidPassword(password))
    errors.password = "Password must be at least 6 characters";

  if (confirmPassword !== password)
    errors.confirmPassword = "Passwords do not match";

  return errors;
};
