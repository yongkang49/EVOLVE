@echo off
set "cartella_sorgente=C:\Users\Administrator\Downloads"
set "cartella_destinazione=%CD%"
echo NON CHIUDERE QUESTO SHELL
:: Nome del file da spostare
set "nome_file=image.png"
set "percorso_completo=%cartella_sorgente%\%nome_file%"
:loop
REM Verifica se il file esiste
if exist "%percorso_completo%" (
    move "%percorso_completo%" "%cartella_destinazione%\" > nul 2>&1
    if %errorlevel% equ 0 (
        echo File spostato con successo in "%cartella_destinazione%"
        start rinominaFile.bat
        )
)
timeout /t 5 > nul
goto loop