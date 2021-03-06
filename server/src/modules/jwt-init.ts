import { randomBytes } from 'crypto';
import { resolve } from 'path';
import { writeFile } from 'fs';
import { jwtSecret } from './auth/passport/jwt.secret';

export function checkJWTSecret() {
  if (jwtSecret() === '') {
    return false;
  } else {
    return true;
  }
}

export function checkEnvSecret() {
  if (process.env.SECRET) {
    return true;
  } else {
    return false;
  }
}

export async function generateJWTSecret() {
  console.log('Generating JWT key...');
  const fileName = resolve(__dirname, './auth/passport/jwt.secret.ts');
  const key = randomBytes(256).toString('hex');

  const data = `export function jwtSecret() {
    return '${key}';
}
`;

  await writeFile(fileName, data, (err) => {
    if (err) {
      console.error(`File IO error: ${err}`);
    } else {
      console.log('JWT Key successfully generated');
    }
  });
}

if (!checkEnvSecret() && !checkJWTSecret()) {
  generateJWTSecret();
}
