@echo off
setlocal

REM File originale
set "original_file=image.png"
REM Ottenere e formattare data e ora
set "current_date=%DATE%"
set "current_time=%TIME%"
REM Estrarre parti specifiche della data e dell'ora
REM Assicurati che gli indici siano adatti al formato della data nella tua regione
set "date_formatted=%current_date:~6,4%%current_date:~3,2%%current_date:~0,2%"
set "time_formatted=%current_time:~0,2%%current_time:~3,2%%current_time:~6,2%"
REM Rimuovere i due punti dai secondi per evitare errori nel nome del file
set "time_formatted=%time_formatted::=%"
REM Costruire il nuovo nome del file con estensione .png
set "new_filename=logfile_%date_formatted%_%time_formatted%.png"

REM Rinominare il file originale con il nuovo nome
ren "%original_file%" "%new_filename%"
echo File rinominato a: %new_filename%

REM Creare una nuova cartella usando il formato data come nome
set "nuova_cartella=blink\immagini\%date_formatted%"

REM Verificare se la cartella esiste già prima di crearla (opzionale)
if not exist "%nuova_cartella%" (
    mkdir "%nuova_cartella%"
    echo Cartella creata con successo: %nuova_cartella%
) else (
    echo La cartella %nuova_cartella% esiste già.
)

REM Spostare il file rinominato nella nuova cartella
set "cartella_sorgente=."
set "cartella_destinazione=%nuova_cartella%"
set "file_da_spostare=%new_filename%"

REM Verificare se il file da spostare esiste
if exist "%file_da_spostare%" (
    move "%cartella_sorgente%\%file_da_spostare%" "%cartella_destinazione%"
    if %errorlevel% equ 0 (
        echo File spostato con successo in %cartella_destinazione%.
        node "blink\immaginiShow.js"
    ) else (
        echo Errore nello spostamento del file.
    )
)
exit