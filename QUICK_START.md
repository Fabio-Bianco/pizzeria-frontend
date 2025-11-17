# 🚀 Quick Start - Vetrina Pizzeria

## 🏗️ Architettura del Progetto

```
┌─────────────────────────────────────────────────────┐
│         BACKOFFICE (Laravel + Autenticazione)       │
│  routes/web.php → /pizzas, /categories, etc.        │
│  Middleware: ['auth', 'verified']                   │
└─────────────────────────────────────────────────────┘
                         ↓
                    DATABASE
                         ↓
┌─────────────────────────────────────────────────────┐
│         VETRINA PUBBLICA (Laravel API)              │
│  routes/api.php → /api/v1/pizzas, /api/v1/categories│
│  Middleware: nessuno (pubblico)                     │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│         FRONTEND REACT (Vetrina Cliente)            │
│  src/assets/services/apiClient.js → chiama API      │
│  http://127.0.0.1:8000/api/v1/*                     │
└─────────────────────────────────────────────────────┘
```

## ⚡ Avvio Rapido

### 1️⃣ Backend Laravel

```powershell
cd c:\Users\Utente\Desktop\Backoffice-vetrrina-pizzeria-laravel\pizzeria-backend
php artisan serve
```

> ⚠️ **IMPORTANTE**: Prima di avviare, assicurati che il file `routes/api.php` sia configurato come indicato in `BACKEND_API_SETUP.md`

### 2️⃣ Frontend React

```powershell
cd c:\Users\Utente\Desktop\Backoffice-vetrrina-pizzeria-laravel\pizzeria-frontend
npm run dev
```

### 3️⃣ Verifica

Apri il browser su: `http://localhost:5173` (o `http://localhost:5174`)

---

## 🔧 Modifiche Necessarie nel Backend

**File da modificare**: `pizzeria-backend/routes/api.php`

Il file è attualmente disabilitato/commentato. Sostituisci il contenuto con quello fornito in `BACKEND_API_SETUP.md`.

### Prima (attuale - NON funzionante):
```php
<?php
use Illuminate\Support\Facades\Route;

// 🚧 API FUTURE: Per ora disabilitate
// Route::prefix('v1')->name('api.')->group(function () {
//     // API routes qui quando necessarie
// });
```

### Dopo (funzionante):
```php
<?php
use App\Http\Controllers\PizzaController;
// ... altri use ...

Route::prefix('v1')->name('api.')->group(function () {
    Route::get('/pizzas', [PizzaController::class, 'index']);
    Route::get('/appetizers', [AppetizerController::class, 'index']);
    // ... altre rotte pubbliche
});
```

---

## ✅ Checklist Completa

- [x] Frontend configurato (`apiClient.js` → `/api/v1`)
- [x] File `.env` aggiornato
- [x] Logging aggiunto per debug
- [ ] **Backend `routes/api.php` da abilitare** ← DA FARE
- [ ] Controller verificati per risposta JSON
- [ ] Database popolato con dati di test

---

## 🧪 Test Endpoint

Dopo aver abilitato `api.php`, testa:

```powershell
# Test pizze
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/pizzas" -Method GET

# Test antipasti
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/appetizers" -Method GET

# Test bevande
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/beverages" -Method GET
```

---

## 🐛 Debug

Se i dati non vengono visualizzati:

1. **Apri DevTools** (F12) → Console
2. Cerca messaggi `[PizzeriaContext]` che mostrano:
   - Raw response dall'API
   - Numero di items mappati
   - Eventuali errori 404

3. **Tab Network** → Verifica:
   - Status Code delle chiamate
   - Response body
   - Request URL corretta

---

## 📁 File Modificati nel Frontend

✅ `src/assets/services/apiClient.js` → baseURL con `/api/v1`
✅ `src/assets/contexts/PizzeriaContext.jsx` → logging dettagliato
✅ `.env` → `VITE_API_BASE_URL=http://127.0.0.1:8000`

---

## 🎯 Prossimo Passo

**Abilita le rotte API pubbliche nel backend seguendo `BACKEND_API_SETUP.md`**
