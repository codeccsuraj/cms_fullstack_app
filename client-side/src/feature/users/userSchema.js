import * as Yup from 'yup'

export const personalDetailsSchema = Yup.object({
    firstName: Yup.string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .required("First name is required"),

    middleName: Yup.string()
        .trim()
        .nullable(),

    lastName: Yup.string()
        .trim()
        .min(2, "Last name must be at least 2 characters")
        .required("Last name is required"),

    fatherName: Yup.string()
        .trim()
        .min(2, "Father name must be at least 2 characters")
        .required("Father name is required"),

    motherName: Yup.string()
        .trim()
        .min(2, "Mother name must be at least 2 characters")
        .required("Mother name is required"),

    dob: Yup.date()
        .nullable()
        .required("Date of birth is required")
        .max(new Date(), "Date of birth cannot be in future"),

    gender: Yup.string()
        .oneOf(["male", "female", "other"], "Invalid gender")
        .required("Gender is required"),

    maritalStatus: Yup.string()
        .oneOf(["single", "married", "divorced", "widowed"], "Invalid marital status")
        .required("Marital status is required"),

    nationality: Yup.string()
        .trim()
        .min(2, "Nationality must be at least 2 characters")
        .required("Nationality is required"),

    altEmail: Yup.string()
        .trim()
        .email("Invalid email format")
        .nullable(),

    altPhone: Yup.string()
        .trim()
        .matches(/^[6-9]\d{9}$/, "Invalid phone number")
        .nullable(),
});