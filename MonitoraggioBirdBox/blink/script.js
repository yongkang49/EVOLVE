const jsonUrl = 'dati.json';
// Usare Fetch API per caricare il file JSON
fetch(jsonUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella rete: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Usa i dati qui
        // Esempio: Imposta un'immagine di sfondo
        if (data && data.length > 0) {
            document.body.style.backgroundImage = `url('${data[0]}')`;
        }
    })
    .catch(error => {
        console.error('Errore nel caricamento del JSON:', error);
    });