---
title: 6. előadás
---

<style>
    .reveal .slides {
        text-align: left;
        font-size: 36px;
    }
    .reveal .slides section>* {
        margin-left: 0;
        margin-right: 0;
    }
    .reveal pre {
        font-size: .70em
    }
</style>

Kliensalkalmazások

# Angular

---

# [`npm`](https://www.youtube.com/watch?time_continue=161&v=x03fjb2VlGY&feature=emb_title)

Mi történik, ha a kódunkban szeretnénk más könyvtárakra is hivatkozni?
 * Letöltjük a hivatkozott fájlokat?
 * Mi van, ha a hivatkozott fájlok is hivatkoznak több másik fájlra is?

----
Megoldás: `npm`
* Software registry
* Függőségkezelés
* A csomagok letöltésének, telepítésének automatizálása
* `NodeJS` része

Nem csak könyvtárak, hanem JavaScript alkalmazások is lehetnek benne.

----
## `npm` csomag telepítése
```console
$ npm install <csomag>
```

Például:
```console
$ npm install lodash
```

----

## Projekt létrehozása &rarr; `package.json`

```console
$ npm init
```

```json
{
  "name": "test-server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

----
## Könyvtárak felhasználása
* Hozzáadás a `package.json` fájlhoz

```console
$ npm install lodash --save
```

```json
{
    ...
    "dependencies": {
        "lodash": "^4.17.15"
    }
}
```

Minden a `node_modules` mappába települ.

----
## Hordozhatóság

Ha a kódunkat publikáljuk, vagy másik gépre visszük, elég csak a saját kódjainkat és a `package.json`-t vinnni, a `node_modules`-t nem kell. 

Az alábbi parancs feltelepíti az összes csomagot, amire hivatkozunk a `package.json`-ben.
```console
$ npm install
```



---

# SPA
### Single Page Application

Ismétlés:
* Inicializálás: kezdeti HTML oldal
* Felhasználói események kezelése
  * DOM módosítása
  * URL módosítása (Routing)
  * További kommunikáció a szerverrel (adatküldés és fogadás): REST API - AJAX

----
### Kihívások
* Nehézkes DOM módosítás (alacsonyszintű DOM API)
* **Separation of concerns**: 
  * HTML, JavaScript, CSS kódok keverednek 
  * Nehezen átlátható kód
* Bonyolult AJAX kódolás (ha nem használunk kiegészítő könyvtárat, vagy `fetch` API-t)
* Modulok közötti együttműködés (függőségkezelés)

Nagy méretű, karbantartható, egyszerű JavaScriptet használó alkalmazás fejlesztése nagy kihívás.

----
### JS Keretrendszerek
* Segédkönyvtárak (*utility libraries*): 
    * [JQuery](https://jquery.com/)
    * [underscore](https://underscorejs.org/), [lodash](https://lodash.com/)
* UI keretrendszerek
    * [Angular](https://angular.io/)
    * [React](https://reactjs.org/)
    * [VueJS](https://vuejs.org/)



---
# Angular

---
## `libra`
Egy mintaalkalmazás könyvek kezelésére:
 * `http://<libra>/books` &rarr; 
    * hozzáférés a szerverhez, könyvek lekérdezése
    * összes könyv megjelenítése
 *  `http://<libra>/books/<ISBN>`
    * hozzáférés a szerverhez és a könyv lekérdezése
    * könyv adatainak megjelenítése

----
### Előkészületek
* [`node` + `npm`](https://nodejs.org/en/)
* `angular cli` (command line interface)
    * hasznos segédprogram a szükséges fájlok generálására, karbantartására (pl. angular update) stb.
    
```console
$ npm install -g @angular/cli
```

&rarr;  `ng` parancssori program

```console
$ ng help
```

Jegyzet:
* `-g` kapcsoló globálisan, az egész gépre telepíti az `npm` csomagot, nem csak az adott könyvtárba

----
### Projekt létrehozása üres könyvtárban


```console
$ ng new libra --minimal --prefix libra 
  --skip-git --skip-install --style css --routing false
```

```console
$ cd libra
$ npm install
$ ng serve
```

&rarr; `http://localhost:4200/`

----
### Fontosabb fájlok

* `package.json`
* `angular.json`
* `src/environments` könyvtár
* `src/assets` könyvtár
* `src/main.ts`
* `srrc/app/app.module.ts`
* `app/app.component.ts`

----

### Alapfogalmak

* Modul: összefüggő kódrészletek halmaza
    * deklarált entitások
    * exportált entitások
    * importált modulok
    * publikált service-ek (`providers`)
    * bootstrap
* Komponens: a UI egy részéért felelős

----
```ts
//models.ts
export interface IBook {
    isbn: string;
    title : string;
    author?: string;
}
```

---
## Szolgáltatások



```ts
//src/app/libra-api.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class LibraApiService {
  constructor() { }
}
```

```ts
//app.module.ts
import { LibraApiService } from './libra-api.service';
//...
    providers: [LibraApiService],
```
----
```ts
const books : IBook[] = [
  {"isbn":"9786155248214","title":"Egri csillagok", 
    "author": "Gárdonyi Géza" },
  {"isbn":"9789639555054","title":"A kőszívű ember fiai", 
    "author" : "Jókai Mór" },
  {"isbn":"9789630980746","title":"Fekete gyémántok", 
    "author": "Jókai Mór" }
];
```
----

```ts
@Injectable()
export class LibraApiService {
  constructor() { }
  public getBooks() { return books; }
  public getBook(isbn: string) : IBook {
    return books.find(b => b.isbn === isbn);
  }
}
```
---
## Könyvek komponens

```console
$ ng g c --help
$ ng g c books --flat --skip-tests -m app
```
&rarr; `books.component.ts`

&rarr; `books.component.scss`

&rarr; `books.component.html`

```ts
//app.module.ts
//...
  declarations: [
    AppComponent,
    BooksComponent
  ],
```
----
<div style="font-size:smaller">

```ts
//books.component.ts
@Component({
  selector: 'libra-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  constructor(private apiSvc: LibraApiService) {
    this.books = this.apiSvc.getBooks();
  }
  books: IBook[]
}
```
</div>

----

```html
<!-- books.component.html --> 
<ul *ngIf="books">
  <li *ngFor="let book of books">
    {{book.title}} (ISBN: {{book.isbn}})
  </li>
</ul>
```

```ts
//app.component.ts
//...
    template: `<libra-books></libra-books>`,
```

----

* Kezdetben a `books` tagváltozó értéke `undefined`
* `ngOnInit`-ben aszinkron hívás &rarr; egyszer később megváltozik egy valós listára
* Komponens osztály és HTML sablon összekötése

---
## angular change detection
  * Változásértesítés
  * Mit néz? 
  * Mikor fut le? 

----
* Komponensnek van egy állapota, ez alapján a HTML template legenerálható.
* Ha frissül a komponens &rarr; újrageneráljuk a HTML-t
  * Az új HTML-t a keretrendszer lecseréli a DOM-ban a régire
  * Sok optimalizálás, hogy ez minél hatékonyabban tudjon megtörténni
    * pl. csak a változásakat rendereli, nem mindent újraír

----
Honnan tudja az angular, hogy változott a komponens?
* @Input() változott
* Felhasználói esemény történt
* Aszinkron művelet történt (pl. AJAX hívás, `setTimeout` stb.)
* Manuálisan meghívjuk a `ChangeDetectorRef` `detectChanges` metódusát

&#10026;
Hogyan értesül erről az Angular? 
* [`zoneJS`](https://github.com/angular/zone.js/)

---
## Lifecycle event hooks

* `ngOnChanges`
* `ngOnInit`
* `ngAfterViewInit`
* `ngOnDestroy`

Mindegyiknek saját interfésze van...

---
## Komponensek összefoglaló
 
 * *Selector* (pl. `libra-books`)
    * Bent marad a végső HTML-ben &rarr; mihez kezd vele a böngésző?
 * Komponens osztály (`@Component(...)`)
    * tagváltozók
    * metódusok
    * Angular életciklus hook-ok (pl. `ngOnInit`)
----
 * Angular HTML sablon
    * `*ngIf`, `*ngFor`
    * `{{}}`
    * Speciális jelentéssel bíró tagek (pl. `ng-container`)
    * események később
 * Sablon és komponens osztály összekötése

---

## Dependency Injection - DI
### függőség injektálás

* Függőség (dependency)
  * Például: `BooksComponent` &rarr; `LibraApiService`
* Ki hozza létre a service-eket?
    * Angular keretrendszer
    * Injektálja minden helyre, ahol kérjük
* Miért?
    * Életcilus management

---
## Book component

```console
$ ng g c book --flat --skip-tests -m app
```

```ts
@Component({
  selector: 'libra-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  constructor() { }
  book : IBook;
  ngOnInit() {
  }
}
```

----

```html
<!-- book.component.html --> 
{{book?.title}} (ISBN: {{book?.isbn}}) - {{book?.author}} 
```



```html
<!-- book.component.html --> 
<ng-container *ngIf="book">
  {{book.title}} (ISBN: {{book.isbn}}) - {{book.author}} 
</ng-container>
```

---

## Routing 
```ts
//app-routing.module.ts
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
----
```ts
//app.module.ts
//...
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
//...
```

----

```ts
//app-routing.module.ts
const routes: Routes = [
  {path: '', component: BooksComponent},
  {path: 'books', component: BooksComponent},
  {path: 'books/:isbn', component: BookComponent}
];
```

```ts
//app.component.ts
//...
    template: `<router-outlet></router-outlet>`,
```

* `http://localhost:4200/` &rarr; `BooksComponent`

* `http://localhost:4200/books` &rarr; `BooksComponent`

* `http://localhost:4200/books/ISBN` &rarr; `BookComponent`

----

<div style="font-size: .7em">

```ts
@Component({
  selector: 'libra-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
              private libraApiSvc : LibraApiService) { }

  book : IBook;

  ngOnInit() {
    this.route.params.subscribe(parameters => {
      this.book = this.libraApiSvc.getBook(parameters.isbn);
    });
  }
}
```
</div>

----
Routing használata újratöltés nélkül:

```html
<!-- books.component.html -->
<ul *ngIf="books">
  <li *ngFor="let book of books">
    <a routerLink="/books/{{book.isbn}}">
      {{book.title}} (ISBN: {{book.isbn}})
    </a>
  </li>
</ul>
```

---
# Ellenőrző kérdések

* Mi az az `npm`? Mik az `npm` csomagok?
  * Mire való a `package.json` fájl?
  * Mit csinál a következő parancs? `$ npm install lodash --save`
  * Mi az a `node_modules` mappa?
* Mit nevezünk *separation of concerns* elvnek?
* Mi az az `angular-cli` (`ng`)? Mire használjuk a fejlesztés során?
* Mire való az `angular.json` fájl?

----
* Mit nevezünk angular modulnak? Mit tartalmaz egy angular modul?
* Mit nevezünk angular komponensnek?
  * Mit nevezünk egy komponens szelektorának?
* Mit nevezünk angular szolgáltatásnak?
* Hogyan definiálunk egy szolgáltatást?  
* Hogyan definiálunk egy komponenst?
* Hogyan működik az angularban a `change detection` (változásértesítés)?
* Mire való az `@Input()` dekorátor?
* Mire valók a következő függvények? `ngOnChanges`, `ngOnInit`, `ngafterViewInit`, `ngOnDestroy`

----
* Hol és mire használjuk az `*ngIf` direktívát?
* Hol és mire használjuk az `*ngFor` direktívát?
* Mire használjuk a dupla kapcsoszárójeleket az angular sablonokban? (`{{}}`)

----
* Mit nevezünk *dependency injection*nek?
* Hogyan szerzik meg a komponensek a referenciát a függőségeikre?
* Mit nevezünk *routing*nak?
* Mire való a `<router-outlet><router-outlet>` tag?

----
* Hogyan tudunk angular template-ekben felhasználói eseményekre feliratkozni?
* Mit nevezünk *property binding*nak?
* Mire való az `@Output()` dekorátor?
* Mit jelent a következő kódrészlet? `[(counter)]="counterValue"`
* Mi az a `pipe`? 







