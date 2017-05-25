set /p deploypath=<deploypath.txt
echo %deploypath%
FOR /F %%i IN (deploy.txt) DO (
XCOPY "%%i" "%deploypath%\%%i" /TSEFY
)
FOR /F %%i IN (deploy.txt) DO (
COPY "%%i" "%deploypath%\%%i" /Y
)
PAUSE