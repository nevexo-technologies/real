# Bot-ul Ministrul Educational Alternativ

Bot-ul de discord pentru REAL.

## Instalare
Crearea fisierului `.env` pe baza fisierului `.env.example` si completarea datelor de conectare la baza de date in `.env` din root-ul proiectului.

**Actualizare comenzi:**
```bash
yarn run bot:update
```

**Rulare mediu de productie:**
```bash
yarn run start
```

**Omitere rulare in dezvoltare Turbo**:
Modifiarea in package.json al app-ului:
```bash
"dev": "echo 'Mesaj de avertizare!' # node index.js",
```
