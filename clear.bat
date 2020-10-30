@echo off

cd /D "%cd%\node_modules"
echo %cd%

set   CurTime=%time%
set   mm=%CurTime:~3,2%
set   ss=%CurTime:~6,2%
set   beforeDateTime=%mm%:%ss%
set   beforeDateTime

for /d %%D in (*) do rd /s /q "%%D"

set   CurTime=%time%
set   mm=%CurTime:~3,2%
set   ss=%CurTime:~6,2%
set   afterDateTime=%mm%:%ss%
set   afterDateTime

echo Clear OVER!
echo. & pause 