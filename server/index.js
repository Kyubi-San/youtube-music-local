import fs from 'fs'
import cors from 'cors'
import express from 'express'

const app = express()
const PORT = 3000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.get('/api/music', (req, res) => {
    try {
      const archivos = fs.readdirSync('../public/music/')
      const archivosConId = archivos.map((nombreArchivo, indice) => ({
        id: indice + 1,
        nombre: nombreArchivo,
        // Puedes obtener más información del archivo usando fs.statSync
      }))
      res.send(archivosConId)
    } catch (error) {
      console.error('Error al leer la carpeta:', error)
      return []
    }  
})

app.listen(PORT, () => {
    console.log('Corriendo en el puerto', PORT)
})
