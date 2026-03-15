# Modul_306_A_Groupe_Planwerk
# Tic-Tac-Toe Online Spiel
Unsere Groupe sind Tobias Zimmermann, Marc Greub, Saathujan Selvasingham, Ahmad Jafari, und wir haben uns für Aufgabe 2 Game (Tic-Tac-Toe) entschieden.

## Projektübersicht:
Dieses Projekt ist ein Online Tic-Tac-Toe Spiel, das mit modernen Webtechnologien entwickelt wurde. Die Anwendung ermöglicht es Benutzern, ein Konto zu erstellen, sich anzumelden und in Echtzeit gegen andere Spieler zu spielen.

Falls kein zweiter Spieler innerhalb einer bestimmten Zeit verfügbar ist, startet das Spiel automatisch gegen eine KI (AI), sodass der Benutzer jederzeit spielen kann.

Das Projekt wurde als Gruppenprojekt entwickelt und demonstriert die Umsetzung eines Full-Stack-Webprojekts mit JavaScript, Node.js und MongoDB.

## Funktionen:
### Benutzerregistrierung und Login
Die Anwendung enthält ein Authentifizierungssystem mit E-Mail-Verifikation.

Benutzer können ein Konto mit ihrer Gmail-Adresse erstellen

Nach der Registrierung wird ein 6-stelliger Code per E-Mail gesendet

Dieser Code wird mit Nodemailer verschickt

Der Benutzer kann diesen Code anschließend als Passwort beim Login verwenden

Sensible Daten wie E-Mail-Zugangsdaten werden mit dotenv über Umgebungsvariablen verwaltet.

Echtzeit Multiplayer Spiel

Das Spiel unterstützt Echtzeit-Multiplayer-Funktionalität mithilfe von Socket.IO.

## Jede Spielrunde beinhaltet:

- Zwei Spieler
- Benutzername
- Profilbild
- Live-Spielbrett
- Anzeige des Spielresultats

Die Serverlogik wurde mit Express auf Node.js implementiert.

## KI-Gegner (AI):

Wenn innerhalb von 10 Sekunden kein zweiter Spieler dem Spiel beitritt, startet automatisch ein Spiel gegen eine KI.

Dadurch können Spieler jederzeit ein Spiel starten, auch wenn gerade kein anderer Spieler online ist.

Spielverlauf (Match History)
Alle Spiele werden in der Datenbank gespeichert mit MongoDB.
Gespeichert werden unter anderem:

Profile Photo
Spieler
Ergebnis (Gewonnen)

Der Benutzer kann seine Spielhistorie einsehen, in der alle bisherigen Matches angezeigt werden.

## Spielerstatistiken:
Im Profil jedes Spielers werden folgende Informationen angezeigt:

- Benutzername
- Profilbild
- Anzahl der Siege
- Spielergebnisse

Jeder Sieg wird automatisch gezählt und wird wer daran ist angezeigt.

## Verwendete Technologien:

### Backend:
Node.js
Express
MongoDB
Socket.IO
Nodemailer
dotenv
### Frontend:
HTML
CSS
JavaScript 
