import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const filename = fileURLToPath(import.meta.url);
const buildPath = join(dirname(filename), 'dist');

app.use(express.static(buildPath));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
