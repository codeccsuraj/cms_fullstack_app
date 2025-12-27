import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import { sequelize } from "../../connections/sql.connection.js";

export const AuthModel = sequelize.define(
  "auth",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    mobile: { type: DataTypes.STRING(15), allowNull: false, unique: true, validate: { len: [10, 15] } },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("admin", "user", "guest"), defaultValue: "guest" },
    status: { type: DataTypes.ENUM("active", "inactive", "blocked"), defaultValue: "active" },
    isEmailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    isMobileVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    isResendPassword: { type: DataTypes.BOOLEAN, defaultValue: false },
    otp: { type: DataTypes.STRING, allowNull: true },
    otpExpiry: { type: DataTypes.DATE, allowNull: true },
    deviceType: { type: DataTypes.STRING, allowNull: true },
    browserType: { type: DataTypes.STRING, allowNull: true },
    accessToken: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "auth",
    timestamps: true,
    hooks: {
      // 🔐 Hash password before creating a user
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },

      // 🔐 Hash password before updating a user
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

// Instance Method → Compare Password
AuthModel.prototype.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
