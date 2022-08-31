import express from 'express'
import ejs from 'ejs'
import { readFileSync } from 'fs'
import Cryptr from 'cryptr'

const crypt = new Cryptr(process.env.app_key)
const app = express()
const PORT = process.env.PORT || 9000

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.get('/:matkul/:kelas', async function (req, res) {
    var nama_matkul;
    switch (req.params.matkul) {
        case 'grafkom':
            nama_matkul = 'Grafika Komputer'
            break
        case 'jarkom':
            nama_matkul = 'Jaringan Komputer'
            break
        case 'kk':
            nama_matkul = 'Kecerdasan Komputasional'
            break
        case 'mppl':
            nama_matkul = 'Manajemen Proyek Perangkat Lunak'
            break
        case 'peweb':
            nama_matkul = 'Pemrograman Web'
            break
        case 'ppl':
            nama_matkul = 'Perancangan Perangkat Lunak'
            break
        default:
            return res.json("invalid class")
    }
    let title = `${nama_matkul} - ${req.params.kelas.toUpperCase()}.txt`
    let file = readFileSync(`./list_kelas/${title}`)
    let file_decrypted = crypt.decrypt(file)
    let data = JSON.parse(file_decrypted)
    return res.render('index', {data: data, judul: title.replace('.txt', '')})
})
app.listen(PORT)