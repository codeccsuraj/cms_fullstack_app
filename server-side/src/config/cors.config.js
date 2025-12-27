import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

class CorsConfig {
    constructor(options = {}) {
        // Environment-driven config (comma-separated list)
        // Example: CORS_ALLOWED_ORIGINS="http://localhost:5173,https://example.com"
        const envOrigins = process.env.CORS_ALLOWED_ORIGINS || "";
        this.allowedOrigins = options.allowedOrigins || envOrigins.split(",").map(s => s.trim()).filter(Boolean);

        // Allow credentials (cookies) — set true if you use httpOnly cookies for refresh tokens
        this.credentials = (options.credentials ?? process.env.CORS_ALLOW_CREDENTIALS) === "true" || options.credentials === true;

        // Allowed methods and headers
        this.methods = options.methods || (process.env.CORS_ALLOWED_METHODS ? process.env.CORS_ALLOWED_METHODS.split(",").map(m => m.trim()) : ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]);
        this.allowedHeaders = options.allowedHeaders || (process.env.CORS_ALLOWED_HEADERS ? process.env.CORS_ALLOWED_HEADERS.split(",").map(h => h.trim()) : ["Content-Type", "Authorization", "X-Requested-With", "Accept"]);
        this.exposedHeaders = options.exposedHeaders || (process.env.CORS_EXPOSE_HEADERS ? process.env.CORS_EXPOSE_HEADERS.split(",").map(h => h.trim()) : []);
        this.maxAge = options.maxAge ?? (process.env.CORS_MAX_AGE ? parseInt(process.env.CORS_MAX_AGE, 10) : 600); // seconds

        // Security and logging
        this.debug = options.debug || process.env.CORS_DEBUG === "true" || false;
        // Accept wildcard if explicitly set
        this.allowWildcard = options.allowWildcard || process.env.CORS_ALLOW_WILDCARD === "true" || false;

        // Normalize patterns: allow exact strings, wildcard like *.example.com, or regex strings starting with "regex:"
        this._compileAllowedOrigins();
    }

    _compileAllowedOrigins() {
        this._exact = [];
        this._wildcards = []; // store domain patterns without protocol, e.g. *.example.com
        this._regex = [];

        this.allowedOrigins.forEach((orig) => {
            if (!orig) return;

            // If origin provided as regex marker: "regex:^https?:\/\/(.*\.)?example\.com$"
            if (orig.toLowerCase().startsWith("regex:")) {
                try {
                    const pattern = orig.slice(6);
                    this._regex.push(new RegExp(pattern));
                } catch (e) {
                    if (this.debug) console.warn("Invalid CORS regex pattern:", orig, e);
                }
                return;
            }

            // If it's wildcard subdomain like: https://*.example.com or *.example.com
            if (orig.includes("*")) {
                // remove protocol if present
                const cleaned = orig.replace(/^https?:\/\//, "");
                this._wildcards.push(cleaned);
                return;
            }

            // normalized exact origin (keep scheme if present)
            this._exact.push(orig);
        });
    }

    // check origin against allowlist; origin === undefined or null indicates same-origin or non-browser request (allow)
    _isOriginAllowed(origin) {
        if (!origin) {
            // Non-browser request (e.g. curl, server-to-server) or same-origin; allow by default
            return true;
        }

        if (this.allowWildcard) {
            return true; // only enable explicitly in very specific dev cases
        }

        // Exact match
        if (this._exact.includes(origin)) return true;

        // Check wildcard patterns
        // Compare hostname-level (strip protocol for comparison)
        try {
            const url = new URL(origin);
            const hostname = url.hostname; // e.g. api.sub.example.com
            for (const pattern of this._wildcards) {
                // pattern could be "*.example.com" or "api.*.example.com"
                // convert wildcard to regex
                const escaped = pattern.replace(/\./g, "\\.").replace(/\*/g, ".*");
                const re = new RegExp(`^${escaped}$`);
                if (re.test(hostname) || re.test(url.host) || re.test(origin)) return true;
            }
        } catch (e) {
            // If origin is not a valid URL string, fallback to pattern matching direct string
            for (const pattern of this._wildcards) {
                const escaped = pattern.replace(/\./g, "\\.").replace(/\*/g, ".*");
                const re = new RegExp(`^${escaped}$`);
                if (re.test(origin)) return true;
            }
        }

        // Regex matches
        for (const rg of this._regex) {
            if (rg.test(origin)) return true;
        }

        return false;
    }

    // Generate a CORS middleware compatible with `cors` package
    getMiddleware() {
        const self = this;

        const corsOptions = {
            origin: function (origin, callback) {
                // origin param will be undefined for same-origin requests or server-side requests
                const allowed = self._isOriginAllowed(origin);
                if (self.debug) console.log("[CORS] origin:", origin, "allowed:", allowed);
                if (allowed) return callback(null, true);
                return callback(new Error("Not allowed by CORS"));
            },
            credentials: this.credentials,
            methods: this.methods.join(","),
            allowedHeaders: this.allowedHeaders.join(","),
            exposedHeaders: this.exposedHeaders.length ? this.exposedHeaders.join(",") : undefined,
            maxAge: this.maxAge,
            preflightContinue: false,
            optionsSuccessStatus: 204,
        };

        return cors(corsOptions);
    }

    // Class attachTo method fix
    attachTo(app, path = "/") {
        app.use(this.getMiddleware());

        // Preflight (OPTIONS) handler
        app.options(path, this.getMiddleware());

        if (this.debug) console.log("[CORS] middleware attached. Allowed origins:", this.allowedOrigins);
    }
}

export default CorsConfig;
