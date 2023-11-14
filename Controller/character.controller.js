import {
  loginService,
  createAccountService,
} from '../Service/character.service.js';

export async function loginController(req, res) {
  try {
    const { id, password } = req.body;
    const result = await loginService(id, password);
    if (result.success) {
      res.send('로그인 성공');
    } else {
      res.status(401).send(result.message);
    }
  } catch (error) {
    res.status(500).send('로그인에 실패 하였습니다.');
  }
}

export async function createAccountController(req, res) {
  try {
    const { id, password } = req.body;
    const result = await createAccountService(id, password);
    if (result.success) {
      res.send('Account created successfully');
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
}
