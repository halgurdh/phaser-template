SET WINRAR="C:\Program Files\WinRAR"

SET directory=%~dp0

cd %directory%

call npm run build

echo d | xcopy /s/Y %directory%assets %directory%www\assets
echo f | xcopy /Y %directory%index.html %directory%www
mkdir %directory%build
move %directory%build\project.bundle.js %directory%www\build