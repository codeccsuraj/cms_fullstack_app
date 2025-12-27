import Joi from "joi";

export const createAuthDocumentValidationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
        "string.base": "Username must be a text value",
        "string.empty": "Username is required",
        "string.min": "Username must contain at least 3 characters",
        "string.max": "Username must not exceed 30 characters",
        "any.required": "Username is required",
    }),

    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.email": "Please enter a valid email address",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),

    mobile: Joi.string().pattern(/^[6-9]\d{9}$/).required().messages({
        "string.pattern.base": "Mobile number must be a valid 10-digit Indian number",
        "string.empty": "Mobile number is required",
        "any.required": "Mobile number is required",
    }),

    password: Joi.string().min(6).max(50).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password cannot exceed 50 characters",
        "any.required": "Password is required",
    }),

    status: Joi.string().valid("active", "inactive", "blocked").default("active").messages({
        "any.only": "Status must be one of: active, inactive, blocked",
    }),

    role: Joi.string().valid("Student", "Teacher", "Institute", "Admin").messages({
        "any.only": "Role must be Student, Teacher, Institute or Admin",
    }),
});
