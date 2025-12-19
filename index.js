import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

// При "type": "module" в Node.js, __dirname не съществува по подразбиране. 
// Трябва ни този малък трик, за да го дефинираме:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'taxi-app')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/data', express.static(path.join(__dirname, 'data')));

app.listen(port, () => {
    console.log(`🚀 Сървърът работи на http:/localhost:${port}`);
});