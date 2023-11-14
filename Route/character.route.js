import { Router } from 'express';
const router = Router();
import {
  createAccountController,
  loginController,
} from '../Controller/character.controller.js';

router.post('/login', loginController);
router.post('/createAccount', createAccountController);
// router.put('/updateStatus', updateStatus);

export default router;
