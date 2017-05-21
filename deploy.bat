set /p deploypath=<deploypath.txt
echo %deploypath%
FOR /F %%i IN (deploy.txt) DO (
XCOPY "%%i" "%deploypath%\%%i" /E /F /Y
)
PAUSE