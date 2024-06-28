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
    if (data && data.length > 0) {
        var immagini = data.map(percorso => {
            const indexBlink = percorso.indexOf("blink");
            if (indexBlink !== -1) {
                return percorso.substring(indexBlink + 6);
            } else {
                return percorso;
            }
        });
        for (var i = 0; i < immagini.length; i++) {
            do
                immagini[i] = immagini[i].replace("\\", "/");
            while (immagini[i].indexOf("\\") != -1)
        }

        const carousel = document.getElementById('carousel');

        // Creare e aggiungere immagini al DOM
        immagini.forEach((src, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = src;
            if (index === 0) {
                imgElement.classList.add('active');
            }
            carousel.appendChild(imgElement);
        });

        const images = document.querySelectorAll('.carousel img');
        let currentIndex = 0;

        function showImage(index) {
            images[currentIndex].classList.remove('active');
            currentIndex = (index + images.length) % images.length;
            images[currentIndex].classList.add('active');
        }

        document.getElementById('prev').addEventListener('click', () => {
            showImage(currentIndex - 1);
        });

        document.getElementById('next').addEventListener('click', () => {
            showImage(currentIndex + 1);
        });
    }
})
.catch(error => {
    console.error('Errore nel caricamento del JSON:', error);
});
