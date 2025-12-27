import * as Yup from 'yup';


export const loginSchemaValidation = Yup.object({
  email: Yup.string()
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 8 characters long")
  });

export const registerSchemaValidation = Yup.object({
  username: Yup.string()
    .min(3, "Username must contain at least 3 characters")
    .max(30, "Username must not exceed 30 characters")
    .required("Username is required"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Mobile number must be a valid 10-digit Indian number")
    .required("Mobile number is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot exceed 50 characters")
    .required("Password is required"),

  status: Yup.string()
    .oneOf(["active", "inactive", "blocked"], "Status must be one of: active, inactive, blocked")
    .default("active"),

  role: Yup.string()
    .oneOf(["Student", "Teacher", "Institute", "Admin"], "Role must be Student, Teacher, Institute or Admin")
});