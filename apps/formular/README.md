# Formularele REAL

Formularele destinate elevilor, profesorilor si parintilor.

## Instalare
Crearea fisierului `.env` pe baza fisierului `.env.example` si completarea datelor de conectare la baza de date in `.env` din root-ul proiectului.

**Rulare mediu de dezvoltare:**
```bash
yarn run dev
```

**Rulare mediu de productie:**
```bash
yarn run build
yarn run start
```

## Rute disponibile

### Pagini:

- `/elevi`: Formularul destinat elevilor
- `/parinti`: Formularul destinat parintilor
- `/profesori`: Formularul destinat profesorilor

### API:
- `/api/[category]`: API-ul pentru a salva datele din formular; cateogoria poate fi `elevi`, `parinti` sau `profesori`

## Componente si structura formulare
Fiecare formular contine un state intern pentru reprezentarea datelor din formular. State-ul este initializat cu datele din `props` si este modificat in functie de actiunile utilizatorului. Datele din state sunt trimise catre API-ul de salvare a datelor.

Fiecare formular are urmatoarele componente, denumite dupa sectiunea din formular:
- `PersonalInfo`: Sectiunea de date personale
- `Opportunities`: Sectiunea de selectare oportunitati din liceul selectat.
- `Resources`: Sectiunea de selectare resurse oferite de liceul selectat.
- `Community`: Sectiunea de prezentare comunitate din liceul selectat. -> Aceasta componenta trimite formularul o data cu apasarea butonului `Next`
- `FormSubmit`: Sectiunea de afisare status submit a formularului.
- `ValidationSchema`: Schema de validare a datelor din formular.

Componentele de layout sunt:
- `FormWrapper`: Wrapper pentru formular. Contine header-ul si footer-ul formularului.
- `Layout`: Wrapper pentru pagina. Contine header-ul si footer-ul paginii + providerul de teme (dark/light mode).