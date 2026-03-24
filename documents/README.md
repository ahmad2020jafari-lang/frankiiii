# Tic-Tac-Toe Online Spiel

## 👥👥 Gruppe
- Tobias Zimmermann
- Marc Greub
- Saathujan Selvasingham
- Ahmad Jafari

Wir haben uns für **Aufgabe 2 - Game (Tic-Tac-Toe)** entschieden.

---

## 📋 Projektübersicht
Dieses Projekt ist ein **Online Tic-Tac-Toe Spiel**, das mit modernen Webtechnologien entwickelt wurde. Die Anwendung ermöglicht es Benutzern, ein Konto zu erstellen, sich anzumelden und in Echtzeit gegen andere Spieler zu spielen.

Falls kein zweiter Spieler innerhalb einer bestimmten Zeit verfügbar ist, startet das Spiel automatisch gegen eine **BOT(Künstliche Intelligenz / Algoritmus)**, sodass der Benutzer jederzeit spielen kann.

Das Projekt wurde als **Gruppenprojekt** entwickelt und demonstriert die Umsetzung eines Full-Stack-Webprojekts mit JavaScript, Node.js und MongoDB.

---

## 🎮 Funktionen

### 🔐 Benutzerregistrierung und Login
Die Anwendung enthält ein Authentifizierungssystem mit E-Mail-Verifikation:

- Benutzer können ein Konto mit ihrer **Gmail-Adresse** erstellen
- Nach der Registrierung wird ein **6-stelliger Code** per E-Mail gesendet
- Dieser Code wird mit **Nodemailer** verschickt
- Der Benutzer kann diesen Code anschließend als **Passwort** beim Login verwenden
- Sensible Daten wie E-Mail-Zugangsdaten werden mit **dotenv** über Umgebungsvariablen verwaltet

### 👥 Echtzeit Multiplayer Spiel
Das Spiel unterstützt Echtzeit-Multiplayer-Funktionalität mithilfe von **Socket.IO**.

**Jede Spielrunde beinhaltet:**
- Zwei Spieler
- Benutzername
- Profilbild
- Live-Spielbrett
- Anzeige des Spielresultats

Die Serverlogik wurde mit **Express** auf **Node.js** implementiert.

### 🤖 BOT / Algoritmos-Gegner (BOT)
- Wenn innerhalb von **10 Sekunden** kein zweiter Spieler dem Spiel beitritt, startet automatisch ein Spiel gegen eine BOT
- Dadurch können Spieler jederzeit ein Spiel starten, auch wenn gerade kein anderer Spieler online ist

### 📊 Spielverlauf (Match History)
Alle Spiele werden in der Datenbank gespeichert mit **MongoDB**.

**Gespeichert werden unter anderem:**
- Profilbild
- Spieler
- Ergebnis (Gewonnen/Verloren)

Der Benutzer kann seine **Spielhistorie** einsehen, in der alle bisherigen Matches angezeigt werden.

### 📈 Spielerstatistiken
Im Profil jedes Spielers werden folgende Informationen angezeigt:
- Benutzername
- Profilbild
- Anzahl der Siege
- Spielergebnisse

Jeder Sieg wird automatisch gezählt und dem jeweiligen Spieler zugeordnet.

---

## 🛠️ Verwendete Technologien

### Backend
| Technologie | Verwendung |
|------------|-----------|
| Node.js | Server-Umgebung |
| Express | Web-Framework |
| MongoDB | Datenbank |
| Socket.IO | Echtzeit-Kommunikation |
| Nodemailer | E-Mail-Versand |
| dotenv | Umgebungsvariablen |

### Frontend
| Technologie | Verwendung |
|------------|-----------|
| HTML | Struktur |
| CSS | Styling |
| JavaScript | Interaktivität |

---

## 📁 Projektstruktur