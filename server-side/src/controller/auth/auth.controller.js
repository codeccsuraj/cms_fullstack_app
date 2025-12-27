import { authService } from "../../services/auth/auth.service.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
    try {
        const data = req.body;
        const result = await authService.create(data);
        // Set refresh token cookie
        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: true,            // true in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured whild adding user",
            error
        })
    }
}

export const authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email/Username and password are required"
            });
        }

        const getUserByEmail = await authService.findByEmail(email);
        const getUserByUsername = await authService.findByUsername(email);

        if (!getUserByEmail.success && !getUserByUsername.success) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        
        const user = getUserByEmail?.data || getUserByUsername?.data;
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const tokenPayload = {
            id: user.id,
            role: user.role
        };

        const getToken = await authService.crateSessionToken(user);

        if (!getToken.success) {
            return res.status(500).json({
                success: false,
                message: "Unable to create session",
                getToken
            });
        }

        // Set refresh token cookie
        res.cookie("refreshToken", getToken.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                accessToken: getToken.accessToken,
                user,
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred in login",
            error: error.message
        });
    }
};

export const refreshAccessToken = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken
        const result = await authService.getAccessToken(token);
        return res.status(result.status).json(result);
    } catch (error) {
        console.error("Refresh token error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
