const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');

// percorso della directory
const directoryPath = path.resolve(__dirname, '../blink/immagini');
// Funzione per ottenere i file .png in modo asincrono
function ottieniImageUrls(callback) {
    recursive(directoryPath, (err, files) => {
        if (err) {
            console.error('Errore leggendo la directory:', err);
            callback(err, null);
            return;
        }
        // Filtrare i file .png
        const imageUrls = files.filter(file => path.extname(file).toLowerCase() === '.png');
        callback(null, imageUrls);
    });
}
// Funzione per salvare i dati in un file JSON
function salvaInJSON(dati, filePath) {
    // Converti i dati in stringa JSON
    const jsonData = JSON.stringify(dati, null, 2);

    // Scrivi la stringa JSON nel file
    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Errore scrivendo nel file JSON:', err);
        }
    });
}
// Percorso al file JSON
const filePath = path.join(__dirname, 'dati.json');
//funzione per ottenere imageUrls e salvarli
ottieniImageUrls((err, imageUrls) => {
    if (err) {
        console.error('Errore nel ottenere imageUrls:', err);
        return;
    }
    //salva i dati nel file JSON
    salvaInJSON(imageUrls, filePath);
});