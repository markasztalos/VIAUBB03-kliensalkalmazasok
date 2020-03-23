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
# `HttpClient`

* Beépített Angular service
* `HttpClientModule` importálása szükséges
* Segédfüggvények HTTP kérések küldésére (pl. `get`)
* **Observable**-lel tér vissza


----
## Observable

* Reaktív programozás: aszinkron programozási paradigma (`RxJS`)
* Observable: típusos stream 
  * 1 &rarr; 2 &rarr; 4 &rarr; 6 ... (`Observable<number>`)
  * Aszinkron módon érkeznek az új értékek
* Hány eleme lesz? 

----
### Használat

```ts
let a: Observable<number>
a.subscribe(value => {
  console.log(value);
});
```

----
### Manuális leiratkozás

```ts
let subscription = a.subscribe(...);
subscription.unsubscribe();
```

*complete* esemény: observable vége &rarr; automatikus leíratkozás

----
## Libra API

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





