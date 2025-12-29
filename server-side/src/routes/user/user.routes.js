import express from 'express';
import { validateSchema } from '../../middleware/schema.validate.js';
import * as user from '../../controller/user/user.controller.js';
import { addPersonalInfoSchemaValidation } from '../../schemas/user/user.schema.js';

const userRoutes = express.Router();

userRoutes.post('/add-personal-info', validateSchema(addPersonalInfoSchemaValidation), user.addPersonalInfoController);

userRoutes.patch('/update-address', user.updateAddressDetails);

userRoutes.get('/get', user.findUserByAuthId);

export default userRoutes;