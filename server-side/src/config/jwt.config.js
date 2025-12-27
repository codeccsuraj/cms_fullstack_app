import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import crypto from "crypto";

dotenv.config();
class JwtConfig {
    #ACCESS_TOKEN_SECRET;
    #REFRESH_TOKEN_SECRET;
    #ACCESS_TOKEN_EXPIRES_IN;
    #REFRESH_TOKEN_EXPIRES_IN;

    constructor() {
        // If secrets not found → automatically generate strong secrets
        this.#ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || crypto.randomBytes(64).toString("hex");
        this.#REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || crypto.randomBytes(128).toString("hex");

        this.#ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || "15m";   // short-lived
        this.#REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "1d"; // long-lived
    }

    generateAccessToken(payload) {
        return jwt.sign(payload, this.#ACCESS_TOKEN_SECRET, {
            expiresIn: this.#ACCESS_TOKEN_EXPIRES_IN
        });
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, this.#REFRESH_TOKEN_SECRET, {
            expiresIn: this.#REFRESH_TOKEN_EXPIRES_IN,
        });
    }

    verifyAccessToken(token) {
        try {
            return jwt.verify(token, this.#ACCESS_TOKEN_SECRET);
        } catch (err) {
            return null; // invalid token
        }
    }

    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, this.#REFRESH_TOKEN_SECRET);
        } catch (err) {
            return null;
        }
    }
}

export const jwtConfig = new JwtConfig();