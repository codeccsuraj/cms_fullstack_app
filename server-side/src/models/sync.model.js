import { AuthModel } from "./auth/auth.model.js";

export const syncDataBaseModels = async () => {
    try {
        console.log("🔄 Syncing models...");
        await AuthModel.sync({ alter: true });
        console.log("✅ Auth model synced");
    } catch (error) {
        console.error("❌ Model syncing failed:", error.message);
    }
}