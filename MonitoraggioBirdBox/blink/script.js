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
        console.log("ciao");
        var immagini = data.map(percorso => {
        const indexBlink = percorso.indexOf("blink");
        if (indexBlink !== -1) {
            return percorso.substring(indexBlink + 6);
        } else {
            return percorso;
        }
    });
    for(var i = 0; i < immagini.length; i++)
        {
            do
            immagini[i] = immagini[i].replace("\\", "/");
            while(immagini[i].indexOf("\\") != -1)
        }      
    }
    document.body.style.backgroundImage = `url("${immagini[0]}")`;
})
.catch(error => {
    console.error('Errore nel caricamento del JSON:', error);
});