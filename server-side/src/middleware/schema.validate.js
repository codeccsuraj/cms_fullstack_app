export const validateSchema = (schema) => {
    return (req, res, next) => {
        const options = {
            abortEarly: false, // return all errors at once
            allowUnknown: false, // disallow extra fields
            stripUnknown: true, // remove unknown fields
        };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((err) => err.message),
            });
        }

        req.body = value; // sanitized data
        next();
    }
} 