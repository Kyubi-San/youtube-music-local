import express from 'express';
import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 3000
const JSON_FILE_PATH = path.join(__dirname, '../public/music/playlist.json')
const UPLOAD_PATH = join(__dirname, '../public/music');

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            await fs.mkdir(UPLOAD_PATH, { recursive: true });
            cb(null, UPLOAD_PATH);
        } catch (err) {
            cb(err);
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

const testStorage = multer.memoryStorage()
const testUpload = multer({ testStorage })

app.post('/uploadFile', testUpload.single('musicFile'), async (req, res) => {
    const fileContent = await fs.readFile(JSON_FILE_PATH, 'utf-8')
    const title = 'juanito'
    const { artist, cover, genre } = req.body
    let jsonData = JSON.parse(fileContent)

    const nuevoItem = {
        id: jsonData.length + 1,
        title: title || 'Untitled',
        artist: artist || 'Unknown',
        cover: cover,
        genre: genre || 'Unknown'
    }
    
    jsonData.push(nuevoItem)
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8')

})

app.post('/uploadMusic', upload.single('musicFile'), async (req, res) => {
    try {
        const title = req.file.originalname.split('.mp3')[0]
        const { artist, genre, cover } = req.body
        
        const fileContent = await fs.readFile(JSON_FILE_PATH, 'utf8')
        let jsonData = JSON.parse(fileContent)

        const nuevoItem = {
            id: jsonData.length + 1,
            title: title || 'Untitled',
            artist: artist || 'Unknown',
            cover: cover,
            genre: genre || 'Unknown'
        }

        jsonData.push(nuevoItem)

        await fs.writeFile(JSON_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8')

        res.send('El archivo MP3 fue subido con exito');

    } catch (error) {
        console.error('Error processing upload:', error);
        res.status(500).send('An error occurred on the server.');
    }
})

app.listen(port, () => {
    console.log(`server listening at port ${port}`)
})