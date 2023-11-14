import { compare, hash } from 'bcrypt';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const charactersFilePath = join(__dirname, '../Datafile/character.json');

async function readCharacters() {
  try {
    const data = await fs.readFile(charactersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('케릭터 정보를 불러올 수 없습니다 :', err);
    throw err;
  }
}

export async function loginService(id, password) {
  const characters = await readCharacters();
  const character = characters.find((c) => c.id === id);

  if (!character) {
    return { success: false, message: '케릭터 정보를 찾을 수 없습니다.' };
  }

  const match = await compare(password, character.passwordHash);
  if (match) {
    return { success: true, character: character };
  } else {
    return {
      success: false,
      message: '아이디 또는 비밀번호가 올바르지 않습니다.',
    };
  }
}

async function writeCharacters(characters) {
  try {
    const data = JSON.stringify(characters, null, 2);
    await fs.writeFile(charactersFilePath, data, 'utf8');
  } catch (err) {
    console.error('케릭터 정보를 작성할 수 없습니다.:', err);
    throw err;
  }
}

export async function createAccountService(id, password) {
  const characters = await readCharacters();
  const existingCharacter = characters.find((c) => c.id === id);

  if (existingCharacter) {
    return { success: false, message: '이미 존재하는 계정입니다.' };
  }

  const passwordHash = await hash(password, 10);
  const newCharacter = {
    id: id,
    password: passwordHash,
    level: 1,
    exp: 0.0,
    job: '무직',
    damage: 10,
    itemDamage: 0,
    defence: 5,
    itemDefence: 0,
    healthPoint: 100,
    gold: 1500,
    inventory: {
      무쇠갑옷: { toOwn: true, equipment: false },
      '낡은 검': { toOwn: true, equipment: false },
    },
  };

  characters.push(newCharacter);
  await writeCharacters(characters);

  return { success: true };
}
