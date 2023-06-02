# Seegel

Server Client Projekt im Rahmen des Vertiefunsprofiles Geoinformatik und Raumanalyse (Modul 4230) des Institutes Geomatik an der FHNW Muttenz. 

- **Frontend:** React.js, OpenLayers und CSS
- **Backend:** FastAPI, PostgreSQL

## Requirements
- [Git](https://git-scm.com/)
- IDE wie [Visual Studio Code](https://code.visualstudio.com/) 
- [Anaconda Distribution](https://www.anaconda.com/products/distribution) oder [Miniconda](https://docs.conda.io/en/latest/miniconda.html)
- Node.js und npm ([https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))
  
## Git Projekt mit Visual Studio Code lokal klonen
Öffne ein neues Visual Studio Code Fenster und wähle unter Start *Clone Git Repository*. Alternativ öffne die Command Palette in VS Code `CTRL+Shift+P` (*View / Command Palette*) und wähle `Git: clone`. 
Füge die Git web URL `https://github.com/314a/GDI_Project.git` ein und bestätige die Eingabe mit Enter. Wähle einen Ordner in welchen das Repository *geklont* werden soll.

## Frontend installieren
Öffne ein Terminal (Command Prompt in VS Code) und installiere npm für dieses Projekt

``` shell
# aktiviere node.js (falls nvm genutzt wird) 
# nvm use 16.19.1 
# install all the node.js dependencies
npm install
# node Projekt ausführen
# npm start ist in package.json definiert
npm start
```

## Backend installieren
Öffne ein Terminal und wechsle in den *loginserver* Ordner.
1. Virtuelle Umgebung für Python mit allen Requirements in der `requirements.txt` Datei aufsetzen.

```shell
# Requirements
cd loginserver
# Füge conda-forge als Channel in conda hinzu, da sonst nicht alle Pakete installiert werden können
conda config --add channels conda-forge
# Erstelle ein neues Conda Environment und füge die Python Packges requirements.txt hinzu, requirements.txt befindet sich im Ordner loginserver
conda create --name seegel python=3.9.16 --file requirements.txt
```
2. Aufsetzen einer loklaen PostgreSQL Datenbank:
   Besuche die offizielle PostgreSQL-Website unter https://www.postgresql.org/ und lade dir die Version PostgreSQL 15 herunter.

   Tipp: fürs Entwickeln oder Ansehen von Daten kann PGAdmin ein wertvolles Tool sein. PGAdmin kann unter https://www.pgadmin.org/ bezogen werden.

3. Zum Berechnen der Seetiefen müssen die Bathymetriedaten heruntergeladen, entzippt und im Ordner bathimetry_tif abgelegt werden.
   Die gezippten tif-Files der Seen können unter folgenden URLs heruntergeladen werden:
   - https://vm12.sourcelab.ch/zip_files/neuenburgersee_float64.zip
   - https://vm12.sourcelab.ch/zip_files/zusammengefuehrt_bielersee.zip
   - https://vm12.sourcelab.ch/zip_files/zusammengefuehrt_brienzersee.zip
   - https://vm12.sourcelab.ch/zip_files/zusammengefuehrt_thunersee.zip

4. Backend ausführen, virtuelle Umgebung starten und server *uvicorn* starten. Öffne http://localhost:8000/api/docs im Browser und verifiziere, ob das Backend läuft.
``` shell
# navigiere zum loginserver Ordner im Verzeichnis
cd loginserver
# aktiviere die conda Umgebung seegel
conda activate seegel
# start server auf localhost aus dem Ordner "server"
uvicorn server:app --reload
# Öffne die angegebene URL im Browser und verifiziere, ob das Backend läuft.
```

## API Dokumentation
Fast API kommt mit vorinstallierter Swagger UI. Wenn der Fast API Backend Server läuft, ist die Dokumentation der API über Swagger UI auf http://localhost:8000/api/docs verfügbar.

***Achtung:***

*/api* ist nicht Standard, dies wurde hinzugefügt um die API später auf einem öffentlich zugänglichen Server laufen lassen zu können.