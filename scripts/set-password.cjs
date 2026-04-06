// Usage: node scripts/set-password.js <new-password>
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/set-password.js <new-password>');
  process.exit(1);
}

const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local not found');
  process.exit(1);
}

bcrypt.hash(password, 10).then(hash => {
  const b64 = Buffer.from(hash).toString('base64');
  let env = fs.readFileSync(envPath, 'utf8');
  env = env.replace(/^VITE_ADMIN_PASSWORD_HASH=.*$/m, '');
  env = env.trim() + '\nVITE_ADMIN_PASSWORD_HASH=' + b64 + '\n';
  fs.writeFileSync(envPath, env);
  console.log('Password updated. Restart the dev server.');
});
