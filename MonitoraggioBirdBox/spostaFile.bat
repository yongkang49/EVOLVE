@echo off
setlocal enabledelayedexpansion
for /f "tokens=3" %%A in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders" /v {374DE290-123F-4565-9164-39C4925E467B}') do (
    set "downloadsPath=%%A"
)
set "cartella_sorgente=%downloadsPath%"
set "cartella_destinazione=%CD%"
echo NON CHIUDERE QUESTO SHELL
start "" "http://localhost:8080/MonitoraggioBirdBox/blink/index.html"
:: Nome del file da spostare
set "nome_file=BirdHouse.png"
set "percorso_completo=%cartella_sorgente%\%nome_file%"
:loop
node "blink\immaginiShow.js"
REM Verifica se il file esiste
if exist "%percorso_completo%" (
    move "%percorso_completo%" "%cartella_destinazione%\" > nul 2>&1
    if %errorlevel% equ 0 (
        echo operazione svolto con successo
        start /min rinominaFile.bat
        )
)
timeout /t 5 > nul
goto loop