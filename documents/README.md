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
| Technologie | Verwendung | Beschreibung |
|------------|-----------|--------------|
| **Node.js** | Server-Umgebung | JavaScript-Laufzeitumgebung, die es ermöglicht, JavaScript auf dem Server auszuführen. Bietet eine nicht-blockierende, ereignisgesteuerte Architektur für schnelle und skalierbare Anwendungen. |
| **Express** | Web-Framework | Minimalistisches und flexibles Web-Framework für Node.js. Vereinfacht die Entwicklung von Webanwendungen und APIs durch Routing, Middleware und HTTP-Hilfsmethoden. |
| **MongoDB** | Datenbank | NoSQL-Dokumentendatenbank, die Daten in flexiblen, JSON-ähnlichen Dokumenten speichert. Ermöglicht schnelle Abfragen und skalierbare Datenspeicherung für Benutzerprofile, Spielstände und Statistiken. |
| **Socket.IO** | Echtzeit-Kommunikation | Bibliothek für bidirektionale Echtzeit-Kommunikation zwischen Client und Server. Ermöglicht sofortige Spielzüge, Live-Updates und Multiplayer-Funktionalität ohne Seitenneuladung. |
| **Nodemailer** | E-Mail-Versand | Modul für den Versand von E-Mails aus Node.js-Anwendungen. Wird verwendet, um den 6-stelligen Registrierungscode per E-Mail an neue Benutzer zu senden. |
| **dotenv** | Umgebungsvariablen | Modul zum Laden von Umgebungsvariablen aus einer `.env`-Datei. Schützt sensible Daten wie E-Mail-Zugangsdaten und API-Keys vor unbefugtem Zugriff. |
| **bcrypt** | Passwort-Verschlüsselung | Bibliothek zum Hashen von Passwörtern. Stellt sicher, dass Benutzerpasswörter sicher in der Datenbank gespeichert werden, indem sie gehasht und mit Salt versehen werden. |
| **mongoose** | Datenbank-ORM | Objekt-Dokumenten-Mapper (ODM) für MongoDB. Vereinfacht die Datenbankinteraktion durch definierte Schemas, Modelle und Validierungen. |
| **express-session** | Session-Management | Middleware für Express zur Verwaltung von Benutzersitzungen. Speichert Login-Status und Benutzerdaten während der gesamten Spielsession. |
| **multer** | Datei-Upload | Middleware für die Verarbeitung von `multipart/form-data`, hauptsächlich für Datei-Uploads. Wird verwendet, um Benutzer-Profilbilder hochzuladen und zu speichern. |

### Frontend
| Technologie | Verwendung | Beschreibung |
|------------|-----------|--------------|
| **HTML** | Struktur | Hypertext Markup Language für die strukturelle Gestaltung der Webseiten. Definiert die Grundstruktur von Login-, Registrierungs- und Spiel-Oberflächen. |
| **CSS** | Styling | Cascading Style Sheets für das visuelle Design und Layout. Sorgt für eine ansprechende Gestaltung mit responsive Design, Animationen und benutzerfreundlicher Oberfläche. |
| **JavaScript** | Interaktivität | Programmiersprache für dynamische Funktionen im Browser. Steuert Spiel-Logik, Echtzeit-Kommunikation mit Socket.IO, UI-Updates und Benutzerinteraktionen. |

### Entwicklungstools
| Technologie | Verwendung | Beschreibung |
|------------|-----------|--------------|
| **nodemon** | Entwicklung | Tool, das den Server automatisch neu startet, wenn Dateiänderungen erkannt werden. Beschleunigt den Entwicklungsprozess und spart Zeit während der Programmierung. |
| **Git** | Versionskontrolle | Verteiltes Versionskontrollsystem für die Nachverfolgung von Code-Änderungen. Ermöglicht Zusammenarbeit im Team und einfaches Rollback bei Problemen. |
| **MongoDB Atlas** | Cloud-Datenbank | Cloud-basierte MongoDB-Datenbank. Bietet kostenlose Hosting-Möglichkeit für die Datenbank, ohne eigenen Server betreiben zu müssen. |

### Sicherheitstechnologien
| Technologie | Verwendung | Beschreibung |
|------------|-----------|--------------|
| **CSP (Content Security Policy)** | Sicherheits-Header | Schutz vor Cross-Site-Scripting (XSS) und anderen Code-Injection-Angriffen. Definiert, welche Ressourcen geladen werden dürfen. |
| **Session Cookies** | Authentifizierung | Sicherheitsmechanismus zur Benutzerauthentifizierung. Speichert verschlüsselte Session-Daten für eingeloggte Benutzer. |
| **bcrypt Hashing** | Passwort-Sicherheit | Sicheres Hashen von Passwörtern mit Salt. Schützt Benutzerdaten bei einem möglichen Datenbank-Leck. |
## 📁 Projektstruktur

```
Modul_306_A_Groupe_Planwerk/
│
├── documents/                          # Projektdokumentation
│   ├── README.md                       # Projektdokumentation
│   └── ...                             # Weitere Dokumente
│
├── src/                                # Quellcode
│   ├── models/                         # Datenbankmodelle
│   │   └── User.js                     # Benutzermodell
│   │
│   ├── public/                         # Frontend-Dateien
│   │   │
│   │   ├── login.html                  # Login-Seite
│   │   ├── signup.html                 # Registrierungsseite
│   │   ├── game.html                   # Spiel-Seite
│   │   ├
│   │   ├── style.css                   # Stylesheet
│   │   ├── game.js                   # Frontend-Logik
│   │   └── uploads/                    # Hochgeladene Profilbilder
│   │   
│   │
│   ├── server.js                       # Hauptserver
│   ├── hash.js                         # Hash-Funktionen
│   ├── package.json                    # Abhängigkeiten
│   ├── package-lock.json               # Abhängigkeiten (gesperrt)
│   └── .env                            # Umgebungsvariablen (nicht im Repo)
│   ├── .gitignore                      # Git-Ignore-Datei
│   └── README.md                       # Diese Datei
```


---

## 🚀 Installation & Start

### 1. Repository klonen
```bash
git clone git@github.com:ahmad2020jafari-lang/Modul_306_A_Groupe_Planwerk.git
cd Modul_306_A_Groupe_Planwerk

## Abhängigkeiten installieren
cd src
npm install
## Umgebungsvariablen einrichten
Eine .env Datei im src Ordner mit folgendem Inhalt erstellen:
EMAIL_USER=deine-email@gmail.com
EMAIL_PASS=dein-app-passwort
## Server starten
npm start
## Anwendung öffnen
Öffne deinen Browser und navigiere zu: http://localhost:3000

👨‍💻 Entwickler

### Ahmad Jafari

## Modul 306 - Projektarbeit