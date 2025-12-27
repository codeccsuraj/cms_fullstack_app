import Joi from 'joi';

export const addPersonalInfoSchemaValidation = Joi.object().keys({
    profilePic: Joi.string().uri().messages({
        "string.uri": "Profile picture must be a valid url"
    }),
    authId: Joi.string().required().messages({
        "string.empty": "authId is required",
    }),
    firstName: Joi.string().min(2).max(25).lowercase().required().messages({
        "string.empty": "First name is required",
        "string.min": "First name must be at least 2 characters",
        "string.max": "First name cannot be more than 25 characters",
    }),
    middleName: Joi.string().trim().min(2).max(25).allow("", null).optional().messages({
        "string.base": "Middle name must be a valid text",
        "string.min": "Middle name must be at least 2 characters long",
        "string.max": "Middle name must not exceed 25 characters",
    }),
    lastName: Joi.string().trim().lowercase().min(2).max(25).required().messages({
        "string.base": "Last name must be a valid text",
        "string.empty": "Last name is required",
        "string.min": "Last name must be at least 2 characters long",
        "string.max": "Last name must not exceed 25 characters",
        "any.required": "Last name is required",
    }),
    gender: Joi.string().valid("male", "female", "other").required().messages({
        "string.base": "Gender must be a valid text value",
        "any.only": "Gender must be one of: male, female, or other",
        "any.required": "Gender is required",
        "string.empty": "Gender is required",
    }),
    dob: Joi.date().less("now").required().messages({
        "date.less": "Date of birth must be in the past",
        "date.base": "Date of birth must be a valid date",
    }),
    nationality: Joi.string().trim().required().messages({
        "string.base": "Nationality must be a valid text",
        "string.empty": "Nationality is required",
        "any.required": "Nationality is required",
    }),
    maritalStatus: Joi.string().required().valid("single", "married", "divorced", "widowed").messages({
        "string.base": "Marital status must be a valid text value",
        "any.only": "Marital status must be one of: single, married, divorced, or widowed",
        "string.empty": "Marital status is required",
        "any.required": "Marital status is required",
    }),
    bio: Joi.string().min(10).max(100).optional().messages({
        "string.base": "Bio must be a valid text",
        "string.min": "Bio must be at least 10 characters long",
        "string.max": "Bio must not exceed 100 characters",
    }),
    description: Joi.string().min(10).max(2000).optional().messages({
        "string.base": "Description must be a valid text",
        "string.min": "Description must be at least 10 characters long",
        "string.max": "Description must not exceed 2000 characters",
    }),
    altEmail: Joi.string().email().lowercase().allow("", null).optional().messages({
        "string.base": "Alternate email must be a valid text",
        "string.email": "Alternate email must be a valid email address",
    }),
    altMobile: Joi.string().pattern(/^[6-9]\d{9}$/).allow("", null).optional().messages({
        "string.base": "Alternate mobile number must be a valid text",
        "string.pattern.base": "Alternate mobile number must be a valid 10-digit Indian mobile number",
    }),
    motherName: Joi.string().min(2).max(25).optional().lowercase().messages({
        "string.base": "Mother name must be a valid text",
        "string.min": "Mother name must be at least 2 characters long",
        "string.max": "Mother name must not exceed 25 characters",
    }),
    fatherName: Joi.string().min(2).max(25).optional().lowercase().messages({
        "string.base": "Father name must be a valid text",
        "string.min": "Father name must be at least 2 characters long",
        "string.max": "Father name must not exceed 25 characters", 
    })
});