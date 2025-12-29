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

export const addAddressSchemaValidation = Yup.object().shape({
    locality: Yup.string()
        .min(3, "Locality must be at least 3 characters")
        .max(100, "Locality must be at most 100 characters")
        .required("Locality is required"),

    city: Yup.string()
        .min(2, "City must be at least 2 characters")
        .max(50, "City must be at most 50 characters")
        .required("City is required"),

    state: Yup.string()
        .length(2, "State must be a 2-letter code (e.g. HR)")
        .required("State is required"),

    country: Yup.string()
        .length(2, "Country must be a 2-letter code (e.g. IN)")
        .required("Country is required"),

    zipcode: Yup.string()
        .matches(/^[0-9]{6}$/, "Zipcode must be a valid 6-digit pincode")
        .required("Zipcode is required"),

    livingType: Yup.string()
        .oneOf(["owned", "rented", "family"], "Invalid living type")
        .required("Living type is required"),

    livingFrom: Yup.date()
        .typeError("Living from must be a valid date")
        .required("Living from is required"),

    isActive: Yup.boolean().required("Active status is required"),
});
