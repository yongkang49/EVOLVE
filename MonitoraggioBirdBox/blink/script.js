const jsonUrl = 'dati.json';

// Caricare il file JSON usando Fetch API
fetch(jsonUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella rete: ' + response.statusText);
        }
        return response.json();
    })
    .then(dati => {
        if (dati && dati.length > 0) {
            // Processare e formattare i percorsi delle immagini
            const immagini = dati.map(percorso => {
                const indexBlink = percorso.indexOf("blink");
                return indexBlink !== -1 ? percorso.substring(indexBlink + 6) : percorso;
            });

            // Sostituire tutte le occorrenze di "\\" con "/"
            const immaginiFormattate = immagini.map(percorso => percorso.replace(/\\/g, "/"));

            const carosello = document.getElementById('carosello');
            if (!carosello) {
                throw new Error('Elemento #carosello non trovato.');
            }

            // Creare e aggiungere immagini al DOM
            immaginiFormattate.forEach((src, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = src;
                if (index === 0) {
                    imgElement.classList.add('active');
                }
                carosello.appendChild(imgElement);
            });

            const images = document.querySelectorAll('#carosello img');
            let currentIndex = 0;

            function cambiaContenuto(index) {
                index = (index + images.length) % images.length;
                const data = immaginiFormattate[index].substring(17, 25);
                const ora = immaginiFormattate[index].substring(26, 32);
                document.getElementById("giorno").innerHTML = data;
                document.getElementById("ora").innerHTML = ora;
            }

            function showImage(index) {
                // Aggiorna currentIndex qui
                images[currentIndex].classList.remove('active');
                currentIndex = (index + images.length) % images.length;
                images[currentIndex].classList.add('active');
                cambiaContenuto(currentIndex); // Chiama cambiaContenuto con l'indice aggiornato
            }

            document.getElementById('prev').addEventListener('click', () => {
                showImage(currentIndex - 1); // Usa showImage per aggiornare e mostrare
            });

            document.getElementById('next').addEventListener('click', () => {
                showImage(currentIndex + 1); // Usa showImage per aggiornare e mostrare
            });

            cambiaContenuto(currentIndex); // Aggiornamento iniziale
        }
    })
    .catch(error => {
        console.error('Errore nel caricamento del JSON:', error);
    });