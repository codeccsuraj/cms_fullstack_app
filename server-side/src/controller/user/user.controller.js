import { userService } from "../../services/user/user.service.js";

export const addPersonalInfoController = async (req, res) => {
    try {
        const data = req.body;
        const result = await userService.createPersonalInfoService(data);

        return res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured in adding data",
            error: error
        })
    }
}

export const findUserByAuthId = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await userService.findByAuthId(id);
        return res.status(result.status).json(result)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured in fetching data",
            error: error
        })
    }
}

export const updateAddressDetails = async(req, res) => {
    try {
        const { authId } = req.query;
        const data = req.body;

        const result = await userService.addAddressDetails(authId, data);
        return res.status(result.status).json(result)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured in updating data",
            error: error
        })
    }
}