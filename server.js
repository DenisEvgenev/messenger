import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const buildPath = join(__dirname, 'dist');

app.use(express.static(buildPath));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
