---
title: 4. előadás
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

# 4. Előadás

JavaScript folytatás
---

## Prototípusok
### Ismétlés
* Gyengén típusos nyelv
* Már ismert, beépített metódusok, propertyk
    * `"abc".length`
    * `[1,2,3].push(4)`
* Minden adat rendelkezik `toString` metódussal? 

---
### Prototípus alapú öröklés:
* Egy objektumnak lehet legfeljebb 1 prototípusa: 
    *  A prototípus egy másik `objektum`, vagy null, ha nem létezik.
* Ha egy objektum egy property-jét olvasni akarjuk, de az nem létezik, akkor megnézzük, hogy az benne van-e a prototípusban és ha igen, akkor azt adjuk vissza. 
    * Írni nem tudjuk a prototípus property-jét. 

----
Protítpus objektum elérése és módosítása:
*  `__proto__` (getter, setter)
* `Object.getPrototypeOf(obj), Object.setPrototypeOf(obj)`


Jegyzet:
A JavaScript nyelv objektum-orientált, de gyengén típusos nyelv. Továbbá nincsenek hagyományos értelemben vett osztályok, helyette az ún. prototípus alapú öröklés került megvalósításra. Ez azt jelenti, hogy az egyes objektumoknak lehet prototípusa. A prototípus egy másik `objektum`, vagy null, ha nem létezik. Ha egy objektum egy property-jét olvasni akarjuk, de az nem létezik, akkor megnézzük, hogy az benne van-e a prototípusban és ha igen, akkor azt adjuk vissza. Írni nem tudjuk a prototípus property-jét. Egy példa erre a `toString` metódus, amellyel minden objektum rendelkezik, még az is, amelyet a `{}` kifejezéssel hoztunk létre. Ugyanis minden objektum alapértelmezett prototípusa egy olyan objektum, amely ezzel és még néhány egyéb metódussal is rendelkezik. 

Hagyományosan a protípust a `__proto__` property-n keresztül tudjuk elérni (lekérdezni és módosítani.) Fontos tudni, hogy ez valójában egy getter/setter property.  A prototípus szintén lekérdezhető és módosítható a következő metódusokkal: `Object.getPrototypeOf(obj), Object.setPrototypeOf(obj)`. (Valójában a prototípus a `[[Prototype]]` nevű property-n keresztül lenne elérhető, de ehhez nincs közvetlen hozzáférésünk.)

----
```js
let o = {};
console.log(o.toString()); // --> "[object Object]"
console.log('toString' in o.__proto__); // --> true
o.__proto__ = null;
console.log(o.toString()); 
    // --> TypeError: o.toString is not a function
```
----
A prototípus tehát egyfajta öröklést tesz lehetővé. 

Betartandó szabályok:
* Nincs körbeverés (nem lehet ciklus a prototípus öröklésben).
* A protoípusok csak objektumok, vagy `null` lehet, primitív típus nem. 

----

A `this` értékét a prototípus nem befolyásolja, azaz ha egy objektumon keresztül egy prototípus property-jét érjük el, attól még a a `this` az aktuális leszármazott gyerekre mutat. 

```js
let user = {
	greet() {
		console.log(this.name);
	}
};

let admin = {
	name : "admin"
};

admin.__proto__ = user;
admin.greet(); // "admin"
```

---
### Konstruktor függvények
* Konstuktor függvényeknek van `prototype` propertyje
* Amikor létrehozunk egy új objektumot, akkor annak a prototípusa ez az objektum lesz.
* Ez lehetővé teszi, hogy a prototípust akár futási időben újabb property-kkel egészítsük ki, amelyek ezután minden öröklött helyen elérhetővé válnak.


```js
function User(name) {
	this.name = name;
}
let user = new User();
User.prototype.greet = function () { console.log("hello"); }
user.greet();
```

Jegyzet:
Speciálisan működnek a konstruktorfüggvények. Ezeknek ugyanis van egy alapértelmezett `prototype` propertyje. Amikor létrehozunk egy új objektumot, akkor annak a prototípusa ez az objektum lesz. Ez lehetővé teszi, hogy a prototípust akár futási időben újabb property-kkel egészítsük ki, amelyek ezután minden öröklött helyen elérhetővé válnak.

----

Beépített típusok prototípusa:
* `Object.prototype`
* `Boolean.prototype` 
* `Number.prototype` 
* `String.prototype`
* stb.

Jegyzet:
Ugyanígy elérhető az `Object.prototype`, illetve az egyes típusok csomagoló objektumaihoz tartozó prototípusok: `Boolean.prototype, Number.prototype, String.prototype`. Ezért lehet metódusokat és más property-ket lekérdezni primitív típusokon is. 

A fentiek alapján természetesen lehetőség van újabb property-kkel kiegészíteni akár az alapértelmezett prototípus objektumokat is. Ez azonban nem jó megközelítés, mert ha több különböző könyvtárat használunk és mindegyik beletesz újabb metódusokat például a `String` prototípusába, akkor a különböző funkciók összeakadhatnak. 

Egy kivétel van, amikor elfogadott a beépített prototípus objektumok kiterjesztése: a *polyfill*. A JavaScript nyelv fejlődésével újabb és újabb funkciók kerültek bele. Azonban a régebbi JavaScript motorok (pl. régebbi böngészők) nem támogatják mindig ezeket az új funkciókat. Ez sok esetben megodlható ún. polyfill könyvtárak segítségével, amelyek egyszerűn a régi környezetben a prototípusokat egészítik ki. Például az egyes JavaScript verziók újabb és újabb metódusokkal egészítették az `Array` objektumot. Ahhoz, hogy a kódunk hordozható legyen és régebbi motorokon is működjön egy megfelelő polyfill könyvtárat kell importálnunk. 

---
## Osztályok

Konstruktor függvényekkel ~ osztályokhoz hasonló funkcionalitás

```js
function User(name) {
    this.name = name;
    this.greet = function() {
        console.log(this.name);
    }
}
```

----
&#10026;

### *Factory* minta megvalósítása
```js
function User(name) {
    return {
        name: name,
        greet() {
            console.log(this.name);
        }
    };
}
```

Jegyzet:
A létrehozott objektumokat mezőkkel és metódusokkal is ki tudjuk egészíteni.

---
### `class` kulcsszó
* Szintaktikai édesítőszer
* Prototípus alapú öröklés a korábban ismertetett konstruktor függvények alapján

Jegyzet:
JavaScriptben alapértelmezetten nincsenek osztályok, hiszen a prototípusok segítségével megoldható az öröklés, azonban az egyszerűség kedvéért bevezették ezek használatát, mint szintaktikai édesítőszert. Tudni kell azonbban, hogy az osztály nem csak egy nyelvi konstrukció, a háttérben ugyanolyan függvényekre fordul, mint amiket fent láttunk.

----
```js
class User {
    name = "";
    greet() { //metódus
        console.log(this.name);
    }
}
```
A fenti kód teljesen ekvivalens az alábbival: 
```js
function User () {
    this.name = "";
}
User.prototype.greet = function() {
    console.log(this.name);
}
```
----
#### Konstruktorok
Az osztályok rendelkezhetnek konstruktorral is: 
```js
class User {
    constructor(name) {
        this.name = name;
    }
}
```

----
#### Láthatóságok
A `private, public, protected` módosítószavakat tudjuk használni az egyes mezők és metódusok láthatóságának befolyásolására. 

----
#### Konstruktor paraméter eltárolása tagválozóban
```js
class User {
    constuctor(public name ) {        
    }
}
let user = new User("XY");
console.log(user.name); //XY
```

Jegyzet: 
Amennyiben a konstruktor paraméterével megegyező property-t akarunk létrehozni és abba bemásolni a paraméter értékét, akkor az egyszerűen így is leírható: 

---
### Öröklés
Az osztályok egymásből öröklődhetnek, erre az `extends` kulcsszót használjuk:
```js
class A { }
class B extends A { }
```

```js
class User { 
    constructor(name) {
        this.name = name;
    } 
}
class Person extends User {
    constructor(age, name) {
        super(name);
        this.age = age;
    }
}
```
---
### static
 * Lehet statikus függvényeket létrehozni a `static` kulcsszóval. 

```js
class A {
    static greet() {
        console.log("hello");
    }
}
A.greet(); // hello
(new A()).greet(); // error
```
----
Az `instanceof` operátorral eldönthető, hogy egy objektum egy adott osztály példánya. 

```js
function A() { }
class B { }

let a = new A();
let b = new B();

console.log(a instanceof A); // true
console.log(a instanceof B); // false
console.log(b instanceof B); // true
console.log(b instanceof A); // false
```
---
&#10026;

### Osztálykifejezések

A `class` kulcsszó valójában csak egy szintaktikai édesítőszer, ezért az osztálydefiníciók valójában egyszerű kifejezések. Így osztálykifejezést is lehet írni:
```js
function BFactory() {
    return class {
        //...
    }
}
class A extends BFactory() { }
```

---
## JavaScript a böngészőben

A JavaScriptet eredetileg böngészőkbe tervezték, innen fejlődött tovább egy teljes értékű programozási nyelvvé. 
---
### `window`

* Minden JavaScript motor biztosít egy globális objektumot, amely bárhonnan elérhető.
    * Ha létrehozunk egy globális változót, az ennek lesz egy property-je. 
    * `NodeJS`-ben ennek a változónak a neve `global`
    * Böngészőkben, ennek a változónak a neve: `window`
* A globális objektum propertyjei elérhetőek a `window` előtag nélkül is

```js
var x = 5;
console.log(window.x); //5
console.log(x); //5
```
----
#### Néhány hasznos segédfüggvény böngészőben
* `alert(text)`: feldob egy messageboxot a megadott szöveggel
* `confirm(text)`: megerősítést kér a felhasználótól, visszatérési értéke `true` vagy `false`

```html
<script>
let result = confirm("Rendben?");
alert(result);
</script>
```
Kipróbálás: egy böngészőben a developer toolbar console tabján írjuk be: `alert(confirm("Rendben?"))`
---
### `document`

#### DOM (Document Object Model)
Ez jelképezi a böngészőben megjelenített, JavaScript kódból változtatható HTML tartalmat.
* A HTML tartalom egy fastruktúraként képzelhető el, 
* ennek a gyökere a `document`
* A `document` metódusai és tagváltozói segítségével bejárhatjuk és módosíthatjuk a HTML tartalmat
    * Minden HTML elemet egy objektumként érhetünk el
        * Lekérdezhetjük, vagy módosíthatjuk a tulajdonságait
    * `document.body`: a `body` elemnek megfelelő objektum

----
[Típusok a DOMban](https://mdn.mozillademos.org/files/16587/dom-structure.svg)

![](dom-structure.svg)

<small>**</small>

----
[Típusok a DOMban](https://mdn.mozillademos.org/files/16596/html-dom-hierarchy.svg)

![](html-dom-hierarchy.svg)

----
#### Hogyan tudjuk bejárni a fát?
* `document.body`
* Bármelyik elemen: 
    * `parentNode`
    * `previousSibling`, `nextSibling`
    * `firstChild`, `nextChild`,`childNodes`

----
### Keresés
* `document.getElementById(id)`: id alapján keres egy elemet
* `elem.getElementsByClassName(className)`
* `elem.querySelectorAll(cssSelector)`: CSS szelektor alapján keres és visszaadja az összes találatot az `elem` alatt található részfában
* `elem.querySelector(cssSelector)`: csak a legelső találatot adja vissza
* ...

---
### Módosítás
Ha megtaláltunk egy elemet, akkor annak minden tulajdonságát tudjuk módosítani. 
* A property-knek utána lehet nézni a referenciákban
* Tipikusan megegyeznek a HTML attribútumokkal, pl.:
    * `HtmlInputElement`: `value`, `type`, `disabled`, `required` stb.
    * `HtmlAnchorElement`: `href`
* Néhány fontos általános property (minden `HtmlElement` leszármazotton):
    * `tagName`
    * `className`,
    * `innerHtml` (stringként a belső HTML tartalom)

----
```html
<h1 style="color:white; padding:2em;" id="hTimer">
  Időzítő példa
</h1>
<script>
    let counter = 0;
    let h = document.getElementById("hTimer");
    let colors = ["red", "green", "blue"];
    let timerId = setInterval(() => {
        counter = (counter +1) % 3;
        h.style.backgroundColor = colors[counter];
    }, 1000);
</script>
```
[teljes példa](demo/timer.html)

---
### Létrehozás, törlés
* Új elem létrehozása: `document.createElement(elemName)`
* Beszúrás a DOMba: 
    * `append`, `prepend`, ...
* Létező elem törlése: 
    * `elem.remove()`

[Példa](demo/dom-manipulation.html)

---
### Az itt bemutatott API-k és property-k, csak töredéke a `document` által nyújtott API-nak.

---
### Eseménykezelés

A DOM elemei (és más objektumok is, pl. `window`, `document`) jelezhetnek eseményeket, pl:
* Egér események: kattintás (`click`), egérmozgatás (`mousemove`) stb.
* Billentyűet események: `keydown`, `keyup` stb.
* Életciklus események: `loaded` (document)
Az egyes eseményekhez megadhatunk **eseményekezelő függvény**eket:
    * olyan függvény, amely feliratkozik egy eseményre, azaz meghívásra kerül, ha az esemény bekövetkezik
----
Mit kell ehhez tudni? 
1. Feliratkozás módja?
2. Milyen függvényt adhatunk meg?
 
----
#### Feliratkozás

1. HTML kódban: 
    * Speciális attribútumok: `on<esemény_neve>`
    * Az attribútum értéke: JS kód

```html
<button onclick="alert('megnyomtad a gombot')">
    Kattints ide!
</button>
```
----
2. JS kódban: ha hozzáfértünk egy elemhez, akkor feliratkozhatunk annak egy eseményére
    * `addEventListener(eventName, action)` 
    * előnye, hogy le is tudunk iratkozni: `removeEventListener(eventName, action)`

```html
<button id="btn">Kattints ide!</button>
<script>
let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  alert('megnyomtad a gombot');  
});
</script>
```

----
#### Eseménykezelő függvény
* `this`: mindig arra az elemre mutat, amin az esemény történt

```html
<button id="btn">Kattints ide!</button>
<script>
let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  alert('megnyomtad a gombot, aminek a szövege: ' 
        + this.innerText);  
});
</script>
```
----
* Minden eseménykezelőfüggvénynek van egy paramétere, amit megkap
    * `Event` típusú JS object
    * Információt tárol az adott eseményről
        * `type`: az esemény neve (pl. `click`)
    * Valójában az `Event` egy "leszármazottját" kapjuk, amely eseményspecifikus információkat is nyújt
        * pl. `MouseEvent`: `altKey`, `screenX`, `screenY` stb.

```js
document.addEventListener(
    'click', 
    (event) => console.log(event.screenX, event.screenY));
```
---
#### Bubbling
Sok esemény ún. "bubbling" típusú:
* ha rákattintunk egy gombra (`button`), az generál egy kattintás eseményt a gombon
* ha a gomb egy `div`ben van, akkor a gomb után, a `div` is jelzi a `click` eseményt
* így fel egészen a `document`-ig a tartalmazási hierarhiában
* Bárhol feliratkozhatunk az eseményre
* Az `Event` `target` propertyje jelzi, hogy valóban ki volt az eredeti célzott
* A "bubbling"-ot az `Event` `stopPropagation` metódusával állíthatjuk meg

[Példa](demo/bubbling.html)

---
### Storage API

---
### AJAX (`fetch` APi)




 