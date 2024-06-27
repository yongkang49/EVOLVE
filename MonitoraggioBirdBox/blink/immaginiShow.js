const recursive = require('recursive-readdir');
const path = require('path');
const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const day = now.getDate().toString().padStart(2, '0');
const formattedDate = `${year}${month}${day}`;

const directoryPath = path.resolve(__dirname, '../blink/immagini/', formattedDate);

// Funzione per ottenere imageUrls in modo asincrono
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

// Utilizzo della funzione per ottenere imageUrls
ottieniImageUrls((err, imageUrls) => {
    if (err) {
        console.error('Errore nel ottenere imageUrls:', err);
        return;
    }
    // Ora puoi fare ciò che vuoi con imageUrls
    console.log('File .png trovati:', imageUrls);
    // Puoi anche esportare imageUrls se necessario
    module.exports = imageUrls;
});