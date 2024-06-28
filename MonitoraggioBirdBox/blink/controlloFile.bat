@echo off
setlocal enabledelayedexpansion

REM Directory corrente
set "current_directory=%CD%"
echo %current_directory%
REM Contatore per il numero di file trovati
set "count=0"

:loop
set "current_date=%DATE%"
set "date_formatted=%current_date:~6,4%%current_date:~3,2%%current_date:~0,2%"
set "directory=%current_directory%\immagini\%date_formatted%"
REM Resetta il contatore ad ogni iterazione
set "count=0"
set "contFile = count"
REM Utilizza il comando dir per elencare i file nella directory
for /f "delims=" %%A in ('dir /b "%directory%"') do (
    set /a count+=1
)
REM Output del numero di file trovati
echo Numero totale di file trovati: %count%

REM aspetta 5 secondi per riniziare il ciclo
timeout /t 5 /nobreak >nul
goto loop
endlocal