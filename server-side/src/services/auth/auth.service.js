import { jwtConfig } from "../../config/jwt.config.js";
import { AuthModel } from "../../models/auth/auth.model.js";

class AuthServices {
    async create(data) {
        try {
            const existingUserWithEmail = await this.findByEmail(data.email);
            if (existingUserWithEmail?.success) {
                return {
                    status: 400,
                    success: false,
                    message: "User already exist with this email",
                };
            }

            const existingUserWithMobile = await this.findByMobile(data.mobile);
            if (existingUserWithMobile?.success) {
                return {
                    status: 400,
                    success: false,
                    message: "User already exist with this mobile number",
                };
            }

            const existingUserWithUsername = await this.findByUsername(data.username);
            if (existingUserWithUsername?.success) {
                return {
                    status: 400,
                    success: false,
                    message: "The username is already taken",
                };
            }

            // Create User
            const result = await AuthModel.create(data);

            if (!result) {
                return {
                    status: 400,
                    success: false,
                    message: "Failed to create user",
                };
            }

            const tokenPayload = {
                id: result?.id,
                role: result?.role
            };

            // Generate tokens
            const accessToken = jwtConfig.generateAccessToken(tokenPayload);
            const refreshToken = jwtConfig.generateRefreshToken(tokenPayload);

            // 👉 SAVE refresh token in DB column 'accessToken'
            await result.update({ accessToken: refreshToken });

            return {
                status: 201,
                success: true,
                message: "User created successfully",
                data: result,
                accessToken,
                refreshToken
            };

        } catch (error) {
            if (
                error.name === "SequelizeValidationError" ||
                error.name === "SequelizeUniqueConstraintError"
            ) {
                return {
                    status: 400,
                    success: false,
                    message: "Validation error",
                    errors: error.errors?.map((err) => err.message),
                };
            }

            return {
                success: false,
                status: 500,
                message: "Internal server error while creating user",
                error: error.message,
            };
        }
    }

    async crateSessionToken(payload) {
        try {
            const tokenPayload = {
                id: payload?.id,
                role: payload?.role
            };;

            // Generate tokens
            const accessToken = jwtConfig.generateAccessToken(tokenPayload);
            const refreshToken = jwtConfig.generateRefreshToken(tokenPayload);

            const [updatedCount] = await AuthModel.update(
                {
                    accessToken
                },
                {
                    where: {
                        email: payload.email
                    }
                }
            );

            if (!updatedCount) {
                return {
                    success: false,
                    message: "Failed to update session token"
                };
            }

            return {
                success: true,
                message: "Session created successfully",
                accessToken,
                refreshToken
            };
        } catch (error) {
            return {
                success: false,
                message: "Error creating session token",
                error: error.message
            };
        }
    }
    async findByEmail(email) {
        try {
            if (!email || email.trim() === "") {
                return {
                    status: 400,
                    success: false,
                    message: "Please provided a email"
                }
            }
            const result = await AuthModel.findOne({
                where: { email }
            });

            if (!result) {
                return {
                    status: 404,
                    success: false,
                    message: "No user found with the provided email"
                };
            }

            return {
                status: 200,
                success: true,
                message: "User fetched successfully",
                data: result
            };

        } catch (error) {
            return {
                status: 500,
                success: false,
                message: "Internal server error",
                error: error.message || error
            };
        }
    }

    async findByMobile(mobile) {
        try {
            if (!mobile || mobile.trim() === "") {
                return {
                    status: 400,
                    success: false,
                    message: "Please provided a mobile"
                }
            }
            const result = await AuthModel.findOne({
                where: { mobile }
            });

            if (!result) {
                return {
                    status: 404,
                    success: false,
                    message: "No user found with the provided mobile"
                };
            }

            return {
                status: 200,
                success: true,
                message: "User fetched successfully",
                data: result
            };

        } catch (error) {
            return {
                status: 500,
                success: false,
                message: "Internal server error",
                error: error.message || error
            };
        }
    }

    async findByUsername(username) {
        try {
            if (!username || username.trim() === "") {
                return {
                    status: 400,
                    success: false,
                    message: "Please provided a username"
                }
            }
            const result = await AuthModel.findOne({
                where: { username }
            });

            if (!result) {
                return {
                    status: 404,
                    success: false,
                    message: "No user found with the provided username"
                };
            }

            return {
                status: 200,
                success: true,
                message: "User fetched successfully",
                data: result
            };

        } catch (error) {
            return {
                status: 500,
                success: false,
                message: "Internal server error",
                error: error.message || error
            };
        }
    }

    async getAccessToken(token) {
        try {
            if (!token) {
                return {
                    status: 401,
                    success: false,
                    code: "JWTAUTH",
                    message: "No token provided"
                }
            }

            const decoded = jwtConfig.verifyRefreshToken(token);

            if (!decoded) {
                return {
                    status: 403,
                    success: false,
                    message: "Invalid or expired refresh token"
                };
            }

            const user = await AuthModel.findOne({
                where: { id: decoded.id },
            });

            if (!user || user.refreshToken !== token) {
                return {
                    status: 403,
                    success: false,
                    message: "Refresh token mismatch"
                };
            }

            // Generate NEW access token
            const newAccessToken = jwtConfig.generateAccessToken({
                id: user._id,
                role: user.role
            });

            return {
                status: 200,
                success: true,
                message: "New access token generated",
                accessToken: newAccessToken,
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: "Error in getting access token",
                error
            }
        }
    }

}

export const authService = new AuthServices();