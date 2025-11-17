# 🔧 Configurazione API Backend per la Vetrina

## 🏗️ Architettura Progetto

Il progetto è diviso in **due parti**:

1. **🔐 Backoffice** (`web.php` con autenticazione): Gestione del menu per amministratori
2. **🌐 Vetrina Pubblica** (`api.php` senza autenticazione): Display menu per clienti

## ⚠️ Problema Attuale

Il file **`routes/api.php`** è stato **disabilitato** durante la semplificazione. Il frontend React (vetrina) non può accedere ai dati del menu.

### Dettagli Tecnici
- **Frontend Vetrina**: Chiama `http://127.0.0.1:8000/api/v1/pizzas` (senza autenticazione)
- **Backend**: File `api.php` commentato/vuoto
- **Risultato**: 404 Not Found

---

## ✅ Soluzione: Abilitare Rotte API Pubbliche

### Modifica il file `routes/api.php` nel backend Laravel

**Percorso**: `pizzeria-backend/routes/api.php`

**Sostituisci il contenuto con questo codice:**

```php
<?php

use App\Http\Controllers\PizzaController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AllergenController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\AppetizerController;
use App\Http\Controllers\BeverageController;
use App\Http\Controllers\DessertController;
use Illuminate\Support\Facades\Route;

// 🌐 API PUBBLICHE PER LA VETRINA (senza autenticazione)
// Questi endpoint sono accessibili dal frontend React
Route::prefix('v1')->name('api.')->group(function () {
    
    // 🍕 Pizze
    Route::get('/pizzas', [PizzaController::class, 'index'])->name('pizzas.index');
    Route::get('/pizzas/{id}', [PizzaController::class, 'show'])->name('pizzas.show');
    
    // 📂 Categorie
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
    
    // ⚠️ Allergeni
    Route::get('/allergens', [AllergenController::class, 'index'])->name('allergens.index');
    Route::get('/allergens/{id}', [AllergenController::class, 'show'])->name('allergens.show');
    
    // 🥗 Ingredienti
    Route::get('/ingredients', [IngredientController::class, 'index'])->name('ingredients.index');
    Route::get('/ingredients/{id}', [IngredientController::class, 'show'])->name('ingredients.show');
    
    // 🥙 Antipasti
    Route::get('/appetizers', [AppetizerController::class, 'index'])->name('appetizers.index');
    Route::get('/appetizers/{id}', [AppetizerController::class, 'show'])->name('appetizers.show');
    
    // 🥤 Bevande
    Route::get('/beverages', [BeverageController::class, 'index'])->name('beverages.index');
    Route::get('/beverages/{id}', [BeverageController::class, 'show'])->name('beverages.show');
    
    // 🍰 Dolci
    Route::get('/desserts', [DessertController::class, 'index'])->name('desserts.index');
    Route::get('/desserts/{id}', [DessertController::class, 'show'])->name('desserts.show');
});
```

> **Nota**: Il file `web.php` mantiene le rotte autenticate per il backoffice, mentre `api.php` gestisce le rotte pubbliche per la vetrina.

---

## 📝 Aggiornare i Controller

Assicurati che i controller restituiscano JSON per le chiamate API:

```php
public function index(Request $request)
{
    $pizzas = Pizza::with('allergens')->get();
    
    // Se è una richiesta API, restituisci JSON
    if ($request->wantsJson() || $request->is('api/*')) {
        return response()->json($pizzas);
    }
    
    // Altrimenti restituisci la vista
    return view('admin.pizzas.index', compact('pizzas'));
}
```

---

## 🔄 Configurazione Frontend (già applicata)

### File `.env` del frontend:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### File `apiClient.js`:

Il frontend chiama gli endpoint con prefisso `/api/v1`:
- `http://127.0.0.1:8000/api/v1/pizzas`
- `http://127.0.0.1:8000/api/v1/appetizers`
- `http://127.0.0.1:8000/api/v1/beverages`
- etc.

### Separazione delle Rotte:

📂 **Backend Laravel**:
- `routes/web.php` → 🔐 Backoffice (autenticato) → `/pizzas`, `/categories`, etc.
- `routes/api.php` → 🌐 Vetrina (pubblico) → `/api/v1/pizzas`, `/api/v1/categories`, etc.

📱 **Frontend React**:
- Chiama SOLO le API pubbliche in `routes/api.php`
- Non necessita di autenticazione
- Visualizza il menu per i clienti

---

## 🧪 Testing

Dopo aver configurato il backend, testa gli endpoint:

```powershell
# PowerShell
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/pizzas" -Method GET

# O usando curl (se disponibile)
curl http://127.0.0.1:8000/api/v1/pizzas
```

---

## 📊 Struttura Risposta Attesa

Il frontend si aspetta una risposta in uno di questi formati:

```json
// Formato 1: Array diretto
[
  { "id": 1, "nome": "Margherita", "prezzo": 6.50, ... }
]

// Formato 2: Oggetto con data
{
  "data": [
    { "id": 1, "nome": "Margherita", "prezzo": 6.50, ... }
  ]
}

// Formato 3: Laravel paginazione
{
  "data": [
    { "id": 1, "nome": "Margherita", "prezzo": 6.50, ... }
  ],
  "current_page": 1,
  "total": 10,
  ...
}
```

Il `PizzeriaContext` gestisce automaticamente tutti questi formati tramite la funzione `extractList()`.

---

## 🎯 Checklist Risoluzione

- [ ] Creare/aggiornare `routes/api.php` con rotte pubbliche
- [ ] Verificare che i controller restituiscano JSON
- [ ] Testare endpoint con curl/Postman
- [ ] Ricaricare il frontend e verificare la console per errori
- [ ] Verificare che i dati vengano visualizzati correttamente

---

## 🆘 Debug

Se i dati non vengono visualizzati:

1. **Apri DevTools (F12)** nel browser
2. **Guarda la tab Console** per errori
3. **Guarda la tab Network** per vedere le chiamate API
4. **Cerca log con `[PizzeriaContext]`** che mostrano i dati ricevuti

---

## 📞 Supporto

Se hai ancora problemi, verifica:
- Il backend Laravel è in esecuzione su `http://127.0.0.1:8000`
- Le migrazioni del database sono state eseguite
- Ci sono dati nel database (usa seeder se necessario)
