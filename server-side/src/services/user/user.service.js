import UserModel from "../../models/users/user.model.js";

class UserServices {
    async createPersonalInfoService(data) {
        try {
            const result = await UserModel.create(data);

            if (!result) {
                return {
                    status: 400,
                    success: false,
                    message: "failed to add data",
                    error: result
                }
            }

            return {
                status: 201,
                success: true,
                message: "added data successfully",
                data: result
            }
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: "An error occured while adding data",
                error: error
            }
        }
    }

    async addAddressDetails(authId, data) {
        try {
            const result = await UserModel.findOneAndUpdate(
                { authId },
                {
                    $set: {
                        address: {
                            ...data,
                        },
                    },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            if (!result) {
                return {
                    status: 400,
                    success: false,
                    message: "Failed to update address",
                };
            }

            return {
                status: 201,
                success: true,
                message: "Address updated successfully",
                data: result.address,
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: "Error occurred while updating address",
                error,
            };
        }
    }

    async findByAuthId(id) {
        try {
            const result = await UserModel.findOne({ authId: id });

            if (!result) {
                return {
                    status: 404,
                    success: false,
                    message: "No result found",
                }
            }

            return {
                status: 200,
                success: true,
                message: "result found",
                data: result
            }
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: "Internal server error",
                error: error
            }
        }
    }
}

export const userService = new UserServices();