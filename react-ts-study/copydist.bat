@echo off
 
@REM del  D:\my\nginx-1.25.3\Mydist\* /s/q
rmdir D:\my\nginx-1.25.3\Mydist /s/q
xcopy   .\dist\*  D:\my\nginx-1.25.3\Mydist\ /s/y