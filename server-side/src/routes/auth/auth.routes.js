import express from 'express';
import * as auth from '../../controller/auth/auth.controller.js';
import { validateSchema } from '../../middleware/schema.validate.js';
import { createAuthDocumentValidationSchema } from '../../schemas/auth/auth.schema.js';

const authRoutes = express.Router();

authRoutes.post('/create', validateSchema(createAuthDocumentValidationSchema), auth.createUser);
authRoutes.post('/login', auth.authenticateUser);
authRoutes.post('/refresh-token', auth.refreshAccessToken);

export default authRoutes;