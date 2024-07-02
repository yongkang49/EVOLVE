const jsonUrl = 'dati.json';
const min = '2024-06-28';
// Usare Fetch API per caricare il file JSON
fetch(jsonUrl)
//prendere i dati dal file json(percorsi assoluti)
.then(risposta => {
    if (!risposta.ok) {
        throw new Error('Errore nella rete: ' + risposta.statusText);
    }
    return risposta.json();
})
//eliminare le parti del percorso che non servono
.then(dati => {
    if (dati && dati.length > 0) {
        var immagini = dati.map(percorso => {
            const indexBlink = percorso.indexOf("blink");
            if (indexBlink !== -1) {
                return percorso.substring(indexBlink + 6);
            } else {
                return percorso;
            }
        });
        //riformattare i percorsi
        for (var i = 0; i < immagini.length; i++) {
            do
                immagini[i] = immagini[i].replace("\\", "/");
            while (immagini[i].indexOf("\\") != -1)
        }

        const carosello = document.getElementById('carosello');

        // Creare e aggiungere immagini al DOM
        immagini.forEach((src, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = src;
            if (index === 0) {
                imgElement.classList.add('active');
            }
            carosello.appendChild(imgElement);
        });

        const images = document.querySelectorAll('.carosello img');
        let currentIndex = 0;
        cambiaContenuto(currentIndex - 1);
        function showImage(index) {
            images[currentIndex].classList.remove('active');
            currentIndex = (index + images.length) % images.length;
            images[currentIndex].classList.add('active');
        }

        document.getElementById('prev').addEventListener('click', () => {
            showImage(currentIndex - 1);
            cambiaContenuto(currentIndex - 1);
        });
        
        document.getElementById('next').addEventListener('click', () => {
            showImage(currentIndex + 1);
            cambiaContenuto(currentIndex + 1);
        });
        function cambiaContenuto(index) {
            index = (index + immagini.length) % immagini.length;
            const data = immagini[index].substring(17,25);
            const ora = immagini[index].substring(26, 32);
            document.getElementById("giorno").innerHTML = data;
            document.getElementById("ora").innerHTML = ora;
        }
        /*
        // Imposta la data minima e massima
        var today = new Date().toISOString().split('T')[0];
        document.getElementById('data').setAttribute('min', min);
        document.getElementById('data').setAttribute('max', today);
    */
    }
})
.catch(error => {
    console.error('Errore nel caricamento del JSON:', error);
});
/*
function invioData() {
    var inputDate = document.getElementById('data').value;
    var data = inputDate.replace(/-/g, '');
    return data;
}*/
