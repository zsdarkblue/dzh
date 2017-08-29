@echo off
rd /s /Q cfg\classtree\script
del /Q USERDATA\IndiTemp\港股通.TPT
del /Q layout\Level2默认\Stkview\category\AO\*.*
del /Q layout\默认方案\Stkview\category\AO\*.*
del /Q listplan\layoutplan\AO.xml
del /Q USERDATA\IndiTemp\public\上期期权.TPT
del /Q USERDATA\IndiTemp\public\上期期权.TPM

:end