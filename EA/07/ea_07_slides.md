---
title: 7. előadás
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
        font-size: .70em;
        margin-left:0;
    }

    
</style>

Kliensalkalmazások

# Haladó angular

---

# HTML sablonok

---
## Adatmegjelenítés

### `{{ kifejezés }}` 

```ts
export class MyComponent {
    title: string;
    value: number;
    complex: {
        value: number
    };
}
```

```html
<h1>{{title}}<h1>
<span data="{{value + 1}}"></span>
<span>{{complex?.value}}</span> 
<!-- safe navigation operator -->
{{1 + 1 + 2}}
```

----
### `<selector></selector>` 

Hivatkozás más komponensre: 


```html
<libra-book></libra-book>
```


---
## Struktúrális direktívák

### Feltételes megjelenítés: `*ngIf`

```html
<div *ngIf="value">
    Helló Világ!
</div>
<ng-container *ngIf="value === 5">
    <div>Helló Világ!</div>
</ng-container>
```


----
### Iteráció: `*ngFor`

```ts
export class MyComponent {
    items : {name: string, value: number}[];
}
```

```html
<ul>
    <li *ngFor="let item of items">
        {{item.name}} ({{item.value}})
    </li>
<ul>
```

---
# Felhasználói események

----
```ts
class CounterComponent {
    counter : number = 0;
    onClickMe() {
        this.counter++;
    }
}
```

```html
<button (click)="onClickMe()">Click me!</button>
{{counter}}
```

----

**Amikor a komponens állapota (bármely property-je) módosul, a HTML-t újra legeneráljuk.**

----

```ts
class CounterComponent {
    counter : number = 0;
    onClickMe(ev : MouseEvent) {
        console.log(ev.target);
        this.counter++;
    }
}
```

```html
<button (click)="onClickMe($event)">Click me!</button>
{{counter}}
```

* `$event`: Angular bepített neve az esemény paraméterére (mindig csak 1 van)
* [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)


----

Okos szűrések: pl. `keyup.enter`

```ts
class MyComponent {
    onEnter(boxValue) {
        this.value = boxValue;
    }
    value: string;
}
```

```html
<input #box (keyup.enter)="onEnter(box.value)">
<p>{{value}}</p>
```

* `#box`: egy adott komponens azonosítója (csak a template-en belül)
* A paragrafus tartalma frissül, amikor entert nyomunk a szövegdobozban

----

```html
(click)="myFunction($event)"      
(dblclick)="myFunction($event)"   
(submit)="myFunction($event)"
(blur)="myFunction($event)"  
(focus)="myFunction($event)" 
(scroll)="myFunction($event)"
(cut)="myFunction($event)"
(copy)="myFunction($event)"
(paste)="myFunction($event)"
(keyup)="myFunction($event)"
(keypress)="myFunction($event)"
(keydown)="myFunction($event)"
(mouseup)="myFunction($event)"
(mousedown)="myFunction($event)"
(mouseenter)="myFunction($event)"
(drag)="myFunction($event)"
(drop)="myFunction($event)"
(dragover)="myFunction($event)"
```

---
# Property binding

```ts
class MyComponent {
    isButtonDisabled: boolean = false;
    toggle() {
        this.isButtonDisabled = !this.isButtonDisabled;
    }
}
```

```html
<button (click)="toggle()" [disabled]="isButtonDisabled">
    Click me
</button>
```

* `disabled`: HTML DOM attribútum, amit elrejt a `[disabled]` property
* Értéke az `isButtonDisabled` értéke (`false`, vagy `true`)

----
### Példa
```ts
export class BookComponent implements OnInit {
  constructor(
    private route: ActivatedRoute, 
    private libraApiSvc : LibraApiService) { }
  
  @Input() book : IBook;
  @Input() color: string;
  ngOnInit() {
    //...
  }
}
```
----

```html
<!-- books.component.html -->
<ul *ngIf="books">
  <li *ngFor="let book of books">
    <a routerLink="/books/{{book.isbn}}">
      <libra-book color="green" [book]="book"></libra-book>
    </a>
  </li>
</ul>
```
----
```html
<!-- book.component.html -->
<span [style.color]="color" *ngIf="book">
  {{book.title}} (ISBN: {{book.isbn}}) - {{book?.author}} 
</span>
```

----


`[]` (box-binding):
 * Egyirányú adatkötés: az idézőjelben megadott kifejezés kiértékelődik, az eredménye átadódik
 * nem kovertálódik stringgé
 * Használhatjuk `[]` nélkül is, de ekkor stringként értelmeződik a beírt szöveg

 Példák:
 
 ```html
<libra-book color="blue"></libra-book>
<libra-book [color]="'blue'"></libra-book>
<libra-book [color]="blue"></libra-book> 
<!-- Kell legyen egy blue nevű változó a komponensben, 
    aminek a típus string  -->
 ```

----
Nagyon sok beépített adatkötési direktíva van:
* `[class.valami]="bool kifejezés"`
* `[style]="stílus objektum"`
* `[style.font-weight]="font weight értéke"`
* ...


---
# Output property

```ts
@Component({
    selector: 'counter'
    //...
})
class CounterComponent {
    @Output()
    counterChange: EventEmitter<number> = new EventEmitter();
    counter : number;
    onClicked() {
        this.counter++;
        this.counterChange.emit(this.counter);
    }
}
```

```html
<button (click)="onClicked()"></button
```

----

```ts
class MyComponent {
    counterValue: number;
    onCounterChanged(newValue : number) {
        this.counterValue = newValue;
    }
}
```

```html
<counter (counterChange)="onCounterChanged($event)">
</counter>
{{counterValue}}
```

vagy: 

```html
<counter (counterChange)="counterValue = $event"></counter>
{{counterValue}}
```


---
## Input és Output együtt

<div style="font-size:smaller">


```ts
@Component({
    selector: 'counter'
    //...
})
class CounterComponent {
    @Output()
    counterChange: EventEmitter<number> = new EventEmitter();
    @Input()
    counter : number;
    onClicked() {
        this.counter++;
        this.counterChange.emit(this.counter);
    }
}
```

</div>

```html
<button (click)="onClicked()"></button
```

----

```ts
class MyComponent {
    counterValue: number = 5; //kezdő érték
    onCounterChanged(newValue) {
        this.counterValue = newValue;
    }
}
```

```html
<counter [(counter)]="counterValue"></counter>
{{counterValue}}
```

----
* Elnevezés fontos: `@Output` esemény neve: `@Input` neve+ "Change" postfix
* `[(counter)]="counterValue"` a változó értéke az emittált érték lesz
    * Ekvivalens ezzel: 

    ```html
    <counter [counter]="counterValue" 
        (counterChange)="counterValue = $event">
    </counter>
    ```

---


# Direktíva

Háromféle direktíva van angularban: 
* Komponens: `<selector></selector>`
* Struktúrális direktíva: `*ngIf`, `*ngFor`
* Attribútum direktíva: elemekre utólagosan ráaggattott attribútumok
    
----
## Attribútum direktíva
Példa: tegyük fel, hogy szeretnénk több elemnek is megváltoztatni a hátterét

```html
<p appHighlight>Highlight me!</p>
<button appHighlight>Highlight me!</button>
```

----

```ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'yellow';
    }
}
```

* A direktívát ugyanúgy regisztrálni kell egy modulban, mint egy komponenst

----

Ennél többet is tudnak a direktívák: 
* Komponenseket is ki lehet egészíteni velük
* Lehetnek paramétereik, pl:

```ts

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
    @Input('appHighlight') color : string;
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = this.color;
    }
}
```

```html
<p [appHighlight]="'yellow'">Highlight me!</p>
<button [appHighlight]="'green'">Highlight me!</button>
```

---
# Pipe
Utility függvények, amelyeket a template-ekben adattranszformációra tudunk használni
* Formátum: ` adat | pipe`
* Példák: 

```html
<pre>{{ books | json}}</pre>
<h1>{{ title | uppercase }}</h1>
```
* Sok [beépített pipe](https://angular.io/api?type=pipe) van
* Paraméterezhetők
* Tudunk sajátot is írni

----
[&#10026;](https://angular.io/guide/pipes#custom-pipes)
<div style="font-size:.8em">

```ts
import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'exponentialStrength'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: number, exponent?: number): number {
    return Math.pow(value, isNaN(exponent) ? 1 : exponent);
  }
}
```
</div>

---
# Observable

* Reaktív programozás: aszinkron programozási paradigma (`RxJS`)
* Observable: típusos stream 
  * 1 &rarr; 2 &rarr; 4 &rarr; 6 ... (`Observable<number>`)
  * Aszinkron módon érkeznek az új értékek
* Hány eleme lesz? 

----
## Használat (feliratkozás)

```ts
let a: Observable<number>
a.subscribe(value => {
  console.log(value);
});
```

----
### Használat (leiratkozás)

```ts
let subscription = a.subscribe(...);
subscription.unsubscribe();
```

```ts
 subscribe(
  next?: ((value: T) => void), 
  error?: (error: any) => void, 
  complete?: () => void) : Subscription
```

* `next`: jön egy új érték
* *complete*: observable vége &rarr; automatikus leíratkozás
* `error`: hiba történt

----
## Observable vs Promise
* A `Promise` **egyetlen** jövőbeli érték ígérete
  * Események, amelyekre feliratkozhatunk: 
    * Megkérkezik **az** eredmény (ld. `then`)
    * Hiba történik (ld. `catch`)
  * 3 féle állapot: `pending`, `fulfilled`, `rejected`
* Obsrvable: jövőbeli értékek ígérete
  * Események, amelyekre feliratkozhatunk: 
    * Megérkezik **egy** érték (`next`) 
    * Hiba történik (`error`)
    * Befejeződik (`complete`)

----


| | Single | Multiple |
|---|---|---|
| szinkron (*pull*) |`Function`|`Iterator`|
| aszinkron (*push*) |`Promise`|`Observable`|
  
----
### Observable &lrarr; Promise

```ts
let o : Observable<any>;
let promise = o.toPromise();
let firstResult = await promise;
```

```ts
import { from } from 'rxjs';

let promise: Promise<any>;
from(promise).subscribe(value => console.log(value));
```

---
# `HttpClient`

* Beépített Angular service
* `HttpClientModule` importálása szükséges
* Segédfüggvények HTTP kérések küldésére (pl. `get`)
* **Observable**-lel tér vissza

----
## Libra API

Tegyük fel, hogy van egy szerverünk (`libra-server` könyvtár): 
* localhost 3000-es port
* HTTP végpontokat biztosít könyvek kezeléséhez
* Könyvek adatainak formátuma:
  ```ts
  interface IBook {
      title : string;
      isbn : string;
      author?: string;
  }
  ```

----
### Végpontok

<div style="font-size:smaller; margin-top:1em">

| HTTP | Url | Művelet |
|---|---|---|
| `GET` | `/books` | visszaadja a tárolt könyvek listáját |
| `GET` | `/books/<ISBN>` | visszaad egy adott ISBN számú könyvet |
| `DELETE` | `/books/<ISBN>` | Töröl egy adott ISBN számú könyvet |
| `POST `| `/books` | Létrehoz egy új könyvet |
| `PUT` | `/books/<ISBN>` | Frissíti egy könyv adatait

</div>
----
### Példák HTTP kérés-válaszokra

----
### Összes könyv lekérdezése
Kérés:
```http
GET /books HTTP/1.1

```

Válasz: 
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 237

[ {"isbn":"9786155248214","title":"Egri csillagok","author":"Gárdonyi Géza"},{"isbn":"9789639555054","title":"A kőszívű ember fiai","author":"Jókai Mór"},{"isbn":"9789630980746","title":"Fekete gyémántok","author":"Jókai Mór"}]
```

----
(A válasz tartalma szépen formázva)

<div style="font-size: .7em">

```json
[
    {
        "isbn": "9786155248214",
        "title": "Egri csillagok",
        "author": "Gárdonyi Géza"
    },
    {
        "isbn": "9789639555054",
        "title": "A kőszívű ember fiai",
        "author": "Jókai Mór"
    },
    {
        "isbn": "9789630980746",
        "title": "Fekete gyémántok",
        "author": "Jókai Mór"
    }
]
```
</div>
----
Kérés:
```http
GET /books/9786155248214 HTTP/1.1

```
Válasz:
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 76

{
    "isbn":"9786155248214",
    "title":"Egri csillagok",
    "author":"Gárdonyi Géza"
}
```
----
Kérés:
```http
POST /books HTTP/1.1
Content-Type: application/json
Content-Length: 70

{
	"title": "Bprof Kliensalkalmazások jegyzet",
	"isbn": "11223344"
}
```
Válasz:
```http
HTTP/1.1 200 OK
Content-Length: 0
```
----
## HttpClient felhasználása
* Készítsünk egy `service`-t, amely HTTP kéréséseket küldd
* `LibraApiService`


```ts
import { Injectable } from '@angular/core';
import { IBook } from './models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
```
----

<div style="font-size:smaller">

```ts
const serverAddress = "http://localhost:3000";
@Injectable()
export class LibraApiService {

  constructor(private http: HttpClient) {  }

  public getBooks$(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${serverAddress}/books`);
  }
  public getBook$(isbn: string): Observable<IBook> {
    return this.http.get<IBook>(`${serverAddress}/books/${isbn}`);
  }
}
```
</div>
----


```ts
export class BooksComponent implements OnInit {
  constructor(private apiSvc: LibraApiService) { }
  ngOnInit() {
    setTimeout(() => {
      this.apiSvc.getBooks$().subscribe(books => {
            this.books = books;
        });
    }); 
  }
  books: IBook[];
}
```

----
<div style="font-size:smaller">

```ts
export class BookComponent implements OnInit {
  constructor(
    private route: ActivatedRoute, 
    private libraApiSvc : LibraApiService) { }
  
  @Input() book : IBook;
  @Input() color: string;
  ngOnInit() {
    this.route.params.subscribe(parameters => {
      if (parameters.isbn)
        this.libraApiSvc.getBook$(parameters.isbn).subscribe(book => {
          this.book = book;
        });
    });
  }
}
```
</div>

---
# Template-driven forms

----
## `ngModel`

Adatkötés `<input>` elemhez: 

```ts
class UserComponent {
    userName: string;
}
```

```html
<input [value]="userName"
       (input)="userName=$event.target.value"> 
```

----
Alternatíva: 
```html
<input [(ngModel)]="userName">
```

* `FormsModule`-t importálni kell hozzá
* Űrlapok készíthetők vele

----
## Angular Forms működése és előnyei
* `ngModel` használata után minden `input`hoz létrejön egy mögöttes modell
* A mögöttes modelltől lekérdezhető, hogy 
  * Belekattintottak-e
  * Változott-e az értéke az utolsó validálás után
  * Valid-e az értéke
* Ennek függvényében megjeleníthetők validációs hibaüzenetek
* [További részletek](https://angular.io/guide/forms)
----
[&#10026; Példa](https://angular.io/guide/forms)

<img height="500" src="ng-forms-sample.png">

----
<div style="font-size:.7em">

```html
<h1>Hero Form</h1>
<form (ngSubmit)="onSubmit()" #heroForm="ngForm">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control"
           id="name" required [(ngModel)]="model.name"
           name="name" #name="ngModel">
    <div [hidden]="name.valid || name.pristine"
         class="alert alert-danger">
         Name is required
    </div>
  </div>
  <div class="form-group">
    <label for="alterEgo">Alter Ego</label>
    <input type="text" class="form-control" id="alterEgo"
           [(ngModel)]="model.alterEgo" name="alterEgo">
  </div>
  <!-- ... -->
</form>
```
</div>
----


<div style="font-size:.7em">

```html
<form (ngSubmit)="onSubmit()" #heroForm="ngForm">
<!-- ... -->
  <div class="form-group">
    <label for="power">Hero Power</label>
    <select class="form-control" id="power" required
            [(ngModel)]="model.power" name="power" #power="ngModel">
      <option *ngFor="let pow of powers" [value]="pow">{{pow}}</option>
    </select>
    <div [hidden]="power.valid || power.pristine"
         class="alert alert-danger">
         Power is required
    </div>
  </div>
  <button type="submit" class="btn btn-success"
          [disabled]="!heroForm.form.valid">Submit</button>
  <button type="button" class="btn btn-default"
          (click)="newHero(); heroForm.reset()">New Hero</button>
</form>
```
</div>
---
&#10026;

## Libra alklamazás kiegészítése törlés és hozzáadás funkciókkal

<div style="font-size:smaller">

```ts
@Injectable()
export class LibraApiService {

  constructor(private http: HttpClient) {  }

  public getBooks$(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${serverAddress}/books`);
  }
  public getBook$(isbn: string): Observable<IBook> {
    return this.http.get<IBook>(`${serverAddress}/books/${isbn}`);
  }
  //...
```
</div>
----

<div style="font-size:smaller">

```ts
  //...
  public deleteBook$(isbn: string) {
    return this.http.delete(`${serverAddress}/books/${isbn}`);
  }
  public createBook$(book : IBook) {
    return this.http.post(`${serverAddress}/books`, book);
  }
  public updateBook$(book: IBook) {
    return this.http.put(`${serverAddress}/books/${book.isbn}`, book);
  }
}
```
</div>
----

<div style="font-size: smaller">

```ts
export class BookComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libraApiSvc: LibraApiService) { }

  delete() {
    this.libraApiSvc.deleteBook$(this.book.isbn).subscribe(() => {
      this.router.navigateByUrl('/books');
    })
  }
  //...
}
```
</div>

----

```html
<!-- book.component.html -->
<span [style.color]="color" *ngIf="book">
  {{book.title}} (ISBN: {{book.isbn}}) - {{book?.author}} 
</span>

<button (click)="delete()">Törlés</button>
```
----

```console
$ ng g c create-book --flat --skip-tests -m app
```

----

<div style="font-size: smaller">

```ts
@Component({
  selector: 'libra-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  constructor(private libraApi : LibraApiService, 
              private router: Router) { }

  ngOnInit() { }

  author: string;
  isbn: string;
  title: string;
  //...
```
</div>

----

<div style="font-size: smaller">

```ts
  //...
  createBook() {
    if (!this.author || !this.isbn || !this.title)  {
      alert('Tölts ki minden adatot');
      return;
    }

    this.libraApi.createBook$({
      isbn: this.isbn,
      title: this.title,
      author: this.author
    }).subscribe(() => {
      this.router.navigateByUrl("/books");
    })
  }
}
```
</div>
    
----

<div style="font-size:smaller">

```html
<form>
  ISBN: <input type="text" name="isbn" [(ngModel)]="isbn" />
  <br>
  Cím: <input type="text" name="tile" [(ngModel)]="title" />
  <br>
  Szerző: <input type="text" name="author" [(ngModel)]="author" />
  <br>
  <button (click)="createBook()">Létrehozás</button>
</form>
```
</div>

---
# Angular összefoglalás
* UI keretrendszer, amely az SPA kódjának minden szintjét szabályozza

----
## Architektúra
* **Modulok**: az entitások összefogására
* **Komponensek**: UI elemek megjelenítésére
  * Saját TS osztály
  * HTML template nyelv
  * CSS fájl
* Direktívák
* **Szolgáltatások**:   
  * Automatikus életciklus menedzsment (*Dependency Injection* - DI)

----
## További szolgáltatások
* Routing támogatása
  * Navigáció
  * Hozzáférés a paraméterekhez
* Formok kezelésének támogatása 
----
## Angular alkalmazás vs HTML DOM
### Routing nélkül
1. Adott egy `index.html` fájl
  * Ebben hivatkozunk egy komponens selectorára (pl. `app-root`)
  * Hivatkozunk egy `runtime.js` fájlra, amiben benne van az összes TS fájl, amit írtunk. Ezekből generálta az angular fordító (ng). Ezt a `runtime.js`-t hajtja végre a böngésző, tehát végső soron meghívja a `main.ts`-t
----
2. `main.ts`
  ```ts
  platformBrowserDynamic().bootstrapModule(AppModule);
  ```
  * Betölti az Angular keretrendszert és az alapértelmezett modult 
----
3. Az Angular keretrendszer megkeresi a HTML DOM-ban a beregisztrált komponensek selectorait (pl. `app-root`) és **megjeleníti** ezeket a komponenseket. 
  * Pl. látja, hogy van egy `app-root` tag és van egy beregisztrált `AppComponent` komponens
  * Példányosítja a komponens osztályt &rarr; **komponens objektum**
  * A komponens HTML template-je alapján előállít egy HTML tartalmat (ebben hivatkozunk a komponens objektum állapotára, pl. tagváltozókra)
  * A HTML DOM-ba az `app-root` tag belsejébe beszúra az új HTML tartalmat, ami így megjelenik a böngészőben
----
4. Komponensek életciklusa
  * Az egyes komponensek további komponensekre hivaktozhatnak a template-ekben
  * A template-ekben feliratkozhatunk eseményekre &rarr; ezek a komponens objektum metódusait hívják majd meg
  * A komponens objektum állapota megváltozhat! (Például események, időzítők hatására.)
    * Minden változás után a keretrendszer újrarendereli a HTML sablont, így érvényre jutnak a változtatások

----
## Angular alkalmazás vs HTML DOM
### Routing használatával
* `router-outlet` tag, ahelyett, hogy beégetnénk az `app-root`-ot az index.html-be
* Navigációt megvalósító service (`Router`)
* Átnavigálhatunk egyik komponensről a másikra, a `router-outlet`-ben (valójában utána) mindig az aktuális elem fog megjelenni

----
## Sok témáról nem volt szó
* Reactive Forms (TS-ben programozott `form`ok összerakása)
* Tesztelés
* Dinamikus komponens betöltése 

  
---
# Ellenőrző kérdések

* Mit nevezünk `observable`nek?
* Mi a különbség az `observable` és a `promise` között?
* Mi az `HTTPClient`?
* Hogyan tudunk angular keretrendszeren belül `form`okkal dolgozni?
* Hogyan történik a végső HTML DOM előállítása az angular alkalmazás futtatása során routing használatával illetve anélkül? 
