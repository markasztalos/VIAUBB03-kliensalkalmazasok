---
title: 3. előadás
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

# 3. Előadás

JavaScript
---

## Bevezetés (JS)

* JS eredeti célja, fejlődése
* Név:
    * Szkript (előfordítás nélkül működik)
    * Ami hasonlított eredetileg a Javahoz (egyébként semmi köze hozzá)
* Futtatása:
    * JS Motor szükséges hozzá (pl. [V8](https://v8.dev/)), amely futhat böngészőben, de azon kívül is

Jegyzet: A JavaScript a web programozási nyelve, nevén és szintaktikai hasonlóságán kívül semmi köze a Java programozási nyelvhez. Eredeti funkciójat, hogy egyszerű szkriptekkel minél "élőbbé" tegye a statikus weboldalakat, azonban a folyamatos fejlesztés eredményeképpen ma egy önálló, általános, a böngészőktől független programozási nyelvként tekinthető. 

A JavaScript nyelvű programokat ún. JavaScript motorok (*engine*) futtatják, azaz sorról sorra értelmezik és végrehajtják. A legelterjedtebb motor a V8 motor, amely a Chrome böngészőben és a böngészőtől független NodeJS környezetben is megtalálható. 
        
----
### JS böngészőben:
Hogyan tudjuk futtatni?
* HTML oldalba ágyazva:
    * Ebben elhelyezünk egy `script` elemet, amibe JS kódot írunk
    * Amikor a böngésző ezt az elemet feldolgozza, lefuttatja a benne látható kódot
* Külön JS fájlba írjuk a kódot, amit belinkelünk a HTML oldalba

----
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello JS!</title>
    <script src="script1.js" type="text/javascript">
    </script>
  </head>
  <body>
      <script type="text/javascript">
        console.log("hello JS! (inline)")
      </script>
  </body>
</html>
```
```js
//script1.js
console.log("hello JS! (file)");
```
----

Mi tudunk csinálni JS-ben?
 1. Módosítani a HTML-t, amit a böngésző megjelenít
 1. Felhasználói eseményeket kezelni (pl. egérkattintás, billentyűlenyomás)
 1. AJAX kéréseket küldeni
 1. Hozzáférni sütikhez
 1. Hozzáférni a *localStorage*hoz és a *sessionStorage*hoz


Jegyzet:
A JavaScript funkciói alapvetően függenek a futtatókörnyezttől. Böngészőben például lehetőség van a HTML DOM-hoz való hozzáférésre és annak módosítására. Asztali környezetben ilyen hozzáférés értelmszerűen nincs, hiszen nincs HTML oldal, viszont cserébe hozzáférhetünk a fájlrendszerhez. 

       
----
### JS futtatása böngészőn kívüli JS motorral 
* pl. [NodeJS](https://nodejs.org/en/))

```js
//hello.js
console.log('Hello World!');
```
```cmd
>> node hello.js
```
---

### Végrehajtása
A JS egy szkriptnyelv:
* A JS motor sorról sorra olvassa be és hajtja végre az utasításokat
* Hiba esetén a végrehajtás megáll és a további utasítások nem hajtódnak végre
* Nincs előzetes fordítás (szintaktikai és szemantikai ellenőrzés)

```js
console.log("hello JS! (file)");

asdhalhfahflkjahdsfkhakjfdh
```

&rarr; A fájlt beolvassuk, az első sort végrehajtjuk, ezután lesz csak hiba.

---
### JavaScript verziók

* Folyamatosan fejlődik &rarr; ezzel párhuzamosan a JS motorok is fejlődnek. Probléma a régi böngészőkkel van.
* JavaScript &rarr; ECMAScript (szabványosított JavaScript)
    * ES3 (első jól használható változat: reguláris kifejezések, string kezelés, kivételkezelés stb.)
    * ES5 (2009 - 'strict mode', JSON támogatás), ES5.1 (2011.-12.)
    * ES6 (ES2015) (cél, egy általános célú programozási nyelv: `class`, `let`, `const`, lambda kifejezések, prmomise, )
    * **ES7 (ES2016), ES8 (ES2017) (async), ES9 (ES2018), ES10 (2019)**

----
* **Transpiler**: source-to-source compiler
    * Babel: újabb verziójú JS fordítása régebbi verziókra (böngésző kompatibilitás)
    * CoffeeScript (önálló programozási nyelv)
    * TypeScript (típusos JavaScript)

Jegyzet:
A transpiler olyan fordító, amely egy A nyelvű forráskódot lefordít B nyelvnek megfelelő forráskódra. 

---
## Alapvető nyelvi elemek

---
### Változók


* `let` vs `var`
* `const`

```js
let x;
x = `Hello Világ!`;
let y = 6;
```

Jegyzet: 
Változó létrehozására a `let` kulcszót használjuk, típust nem kell megadni. Értéket az `=` operátorral adunk, ez történhet egyből a változó létrehozásakor is.

Változót definiálhatunk még a `const`, illetve `var` kulcsszavakkal is. `const` konstanst hoz létre, amelynek nem lehet később az értékét megváltoztatani. A `var` szinte gobális változókat hoz létre, míg a `let` és a `const` hagyományos módon, csak az adott blokkon belül lesz értelmezve. Általában kerüljük a `var` használatát. 

```js
function varTest() {
  var x = 1;
  {
    var x = 2;  // same variable!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  {
    let x = 2;  // different variable
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```

----
Mi a típusa?

```js
let x;
x = 5;
x = 6;
x = 'alma';
x = 8.5;
```
#### Gyengén típosos nyelv:
* Egy változó típusát az aktuális értéke határozza meg.
* Nincs (és nem is lehetséges) teljes típusellenőrzés előzetesen
    * Gyorsabb fejlesztés (script nyelv)
    * Több hibalehetőség
    * Futási idejű hibák

Jegyzet:
A változóknak nincs rögzített típusuk. Egy változó típusa az aktuális értékének a típusa, ezért akár különböző típusú értékeket is beállíthatunk. 

---
### Adattípusok

Egyszerű (*primitív*) adattípusok
* `number`: minden szám, pl. `5`, `6.23`
    * speciális értékek: `infinity`, `NaN` (*not a number*)
* `string`: 'szöveg', vagy "szöveg"
    * Két \` (*backtick*) között: *string interpolation*

```js
let a = 'alma';
let k = "körte";
let x = `${a}, ${k}`; //alma, körte
let y = `több
soros
szöveg`;
```


Jegyzet:
Egyszerű (*primitív*) adattípusok:
* `number`: minden szám (egész és tört), pl `5`, `6.23`. Vannak speciális értékek is a típuson belül: `infinity` (végtelen), `NaN` (not a number), amely például nem definiált matematika műveletek eredményeképpen állhat elő. 
* `string`: szimpla, vagy dupla aposztrófok közé, vagy \` jelek írhatók.  Az utóbbi esetben (backtick használata) a string lehet többsoros is és a stringen belül `${kifejezés}` kifejezések kiértékelődnek és behelyettesítődnek a stringbe, pl.:
```js
let a = 'alma';
let k = "körte";
let x = `${a}, ${k}`; //alma, körte
```



----
* `boolean` típus: `true` / `false`.

Speciális típusú adatok:
* `null`
* `undefined`

Összetett adattípus:
* `object`

Jegyzet: 
* `boolean` típus: két lehetséges értek `true` és `false`.
* `null`: ez valójában nem egy típus, hanem egy speciális érték, aminek nincs típusa. Jelentése: nem létező referencia. 
* `undefined`: hasonlóan a `null`hoz, ez is csak egy érték, jelentése: nincs érték hozzárendelve. Amennyiben egy változót létrehoztunk, de nem rendeltünk hozzá értéket, akkor az kezdetben `undefined` lesz. 

Az objektumok (`object`) több primitív adat összefogását teszik lehetővé, ld. később. 

Egy érték típusúnak lekérdezéséhez használható a `typedef` operátror (vagy`typedef(...)` függvény), amely visszaadja stringként a típus nevét. 

----

#### Típuskonverizó és logikai értékek

Automatikusan elvégzi sok függvény, operátor
 * *Cast*olás manuálisan a konverziós függvényekkel lehetséges: `Number(...), Boolean(...)`

`typeof <value>`: visszaadja a típust stringként
----
Átalakítás `string`re: 
```js
let b = false;
let bs = String(b);
console.log(typeof b); // boolean
console.log(typeof bs); // string
console.log(bs); // "false"

let n = 7.84;
let ns = String(n);
console.log(typeof n); // number
console.log(typeof ns); // string
console.log(ns); // "7.84"
```

Jegyzet:
Az egyes típusok közötti átalakítások (konverzió, "cast"-olás) többnyire automatikusan történik. Amennyiben fontos, hogy mi magunk átalakítsuk a megfelelő típusra az értéket, használjuk a nagybetűs konverziós függvényeket: ``Number(...), Boolean(...)` stb. 

----
Átalakítás `boolean`re:
 * Minden, ami üres, vagy üres értéket képvisel &rarr; `false`, minden egyéb `true`

```js
console.log(Boolean(0)); //false
console.log(Boolean(6.67)); //true
console.log(Boolean("")); //false
console.log(Boolean("    ")); //true
console.log(Boolean("alma")); //true
console.log(Boolean(null)); //false
console.log(Boolean(undefined)); //false
console.log(Boolean(new Object())); //true

if (0) { console.log("Ez nem jelenik meg"); }
if ("") { console.log("Ez nem jelenik meg"); }
if (289) { console.log("Ez megjelenik"); }
if (289 && "asd" || 0) { console.log("Ez megjelenik"); }
if (new Object()) { console.log("Ez megjelenik"); }
```
Jegyzet:
Amennyiben logikai operátorokkal összehasonlítunk két típust, akkor azokat először számmá konvertáljuk. Az üres string például 0-vá lesz alakítva, minden más string 1-é. Hasonlóan a `false` 0-vá, a `true` 1-é. 

Ha valahol logikai értékekre van szükség, ott is automatikus az átalakítás. Egy szám akkor lesz `false`, ha értéke 0. Egy string akkor lesz `false`, ha az az üres string. Egy objektum csak akkor lesz `false`, ha értéke `undefined`, vagy `null˙. 

----
Konvertálás számmá:
```js
let n1 = 6 / "3";
let n2 = 6 / "alma";
console.log(typeof n1, n1); // number 2
console.log(typeof n2, n2); // number NaN
let s = "3" + 6; //stringgé konvertál
console.log(typeof s, s); //string 36
```

---
### Szokásos nyelvi elemek
A nyelvben a következő szokásos nyelvi elemek megtalálhatók:
* `if`
* `while`
* `for` (pl. `for (let i = 0; i<10; i++) { ... }`)
* `switch`

----
Operátorok:
 * Matematikai: `+`, `-`, `/`, `*`, `**` (hatvány)
 * logikai: `<`, `>`, `==`, `!=`, `===`, `!==`

```js
console.log("2" == 2); //true
console.log("2" === 2); //false
console.log(false === 0); //true
console.log(false == 0); //true
```

Jegyzet:
Fontos különbgség más programozási nyelvekhez képest, hogy a `==`, illetve `!=` operátorok érték szerint hasonlítanak, azaz automatikusan elvégzik a konverziót. Ha valós referencia szerint akarunk összehasonlítani, akkor az `===`, illetve `!==` operátorokat kell használni. 

---
## Függvények

---
### Függvény deklaráció
```js
function add(a, b) {
    return a+b;
}
```
* `function` kulcsszó
* paraméterek (nincs típusdefiníció)
* Nincs visszatérési típus
  * Különböző ágagon más-más típussal térhet vissza
* Nem kötelező a `return` (ha nincs, akkor a visszatérési érték `undefined`)

Jegyzet: 
Bár a JavaScript nem sziorúan funkcionális nyelv, a függvények mégis különleges fontossággal bírnak. 

Függvényeket a `function` kulcsszó vezeti be. Akárhány paraméterük lehet, a paramétereknek nincs típus definíciójuk és nincs is típusellenőrzés. A függvény törzse tetszőleges utasításokból állhat, de figyelni kell a változók láthatóságára. Nem kötelező a `return` utasítás használata. Amennyiben egy függvény nem tér vissza semmivel, akkor `undefined` lesz a visszatérési értéke. Különböző végrehajtási ágakon más-más típusokkal is visszatérhez a függvény. 

---
### Függvényhívás
* Nem kötelező minden paramétert megadni (`undefined`)
* Nincs overloading

```js
add(1,2);
add(1,2,3); /* a értéke 1, b értéke 2 lesz, 
a 3-at nem tudjuk mihez kötni */
add(1); // a értéke 1, b értéke `undefined` lesz
```


Jegyzet: 
A függvényt a nevével és a paraméterek átadásával lehet meghívni. JavaScriptben nincsen overloading, azaz nem lehet egy függvényt többféle paraméterezéssel definiálni. Mivel a paraméterek típusát nem ellenőrizzük, ezért a számukat sem, ezért az alábbi függvényhívások mind helyesek:

----
* alapértelmezett paraméter érték:

```js
function inc(x = 5) {
    return x+1;
}
inc(6); //--> 7
inc(); //--> 6
```
---
### Mi a függvény JavaScriptben?

Speciális, meghívható objektum &rarr; változó értéke lehet.
* **Függvény kifejezés**: olyan függvény definíció, amellyel egy változónak értéket állítunk be
  * v.ö. függvény deklaráció

Jegyzet:
A függvények valójában olyan objektumok, amelyek meg is tudunk hívni, ha utánuk zárójelet teszünk. Mivel egy függvény tehát valójában egy érték, át tudjuk adni vátozónak, vagy függvény paraméterének. Ez lehetővé teszi a függvények definiálásának egy másik módját is, amikor egy változóként adjuk meg ezeket. Ez utóbbi leírást *függvény kifejezés*nek nevzzük.
----

```js
function f() { }
let g = f;
g();

let h = function() { /* függvény kifejezés */ }
h();

let j = function(i) {
    i();
}
j(h);
```

----
&#10026;

Függvény kifejezés és közvetlen meghívása: (**closure**)
```js
{
  var a = 6;
  console.log(6);
}
console.log(a);

(function(){
  var x = 5;
  console.log(x);
})
console.log(x); //reference error

```

Jegyzet:
Régen, amikor JS-ben még nem volt `let`, csak `var`, a kódblokkolban definiált változók globálisak voltak, így a kódblokkon kívül is megmaradtak, ami sok gondot okozott. Erre a probléma volt megoldás a *closure*, vagy egy függvény kifejezés, amit egyből meg is hívunk. Ugyanis a `var` változók láthatósága a befoglaló függvényre, vagy fájlra vonatkozik. Az eredeti JavaScriptben ugyanis nem létezett olyan kódblokk, amely önmagában pontosan meghatározta volna a benne lévő változók láthatóságát. 

Láttuk már eddig is, hogy a változók több scope-ból is jöhetnek, tekintsünk a következő példát:

```js
let a = "alma";
function f() {
	console.log(a);
}
a = "körte";
f(); // --> körte

function g() {
	let x = "alma";
	
	return function () {
		console.log(x);
	}
}

let x = "körte";
let h = g();
h(); // --> alma
```
Valójában minden egyes függvényhívásnál egy speciális kontextus (*lexical environment*) jön létre, amely eltárolja a referenciákat az elérhető változókra. 
Gyakran előforul, hogy egy függvényt és a hozzá tartozó változókat összefogjuk, például a következő módon:

```js
function createCounter() {
	let count = 0;
	return function() {
		return count++;
	}
}

let counter = createCounter();
counter();
counter();
console.log(counter()); // 2
```

A fenti példa egy beágyazott függvényt tartalmaz. Azért beágyazott, mert egy másik függvényen belül lesz létrehozva, a hozzá tartozó kontextust meghatározó objektummal együtt. 
A `createCounter` függvény belső változói (`count`) nem lesznek előrhetők kívülről. 
 
Amennyiben a fentire csak azért lenne szükség, hogy tényleges lokális változókat hozzunk létre, akkor használhatjuk a *closure*-t. Ez egy függvénydefiníció, amelyet egyből meg is hívunk (*IIFE (Immediately invoked function expression)*), így a benne lévő utasítások lefutnak egy lokális scope-ban. Megjegyezzük, hogy ilyen jellegű megoldásra ma már nincs szükség, mert a modern JavaScript helyesen kezeli a blokkokat és a lokális változókat. 

```js
(funtion() {
    let message = "Hello";
    alert(message);
})();
```

---
### Lambda kifejezés (arrow function)
* Függvény kifejezések írásának egy rövidebb módja
* `function` elmarad
* a paraméterek után `=>`
* ha a függvény törzse egyetlen utasítás, akkor a `{` és `}` elhagyható

----
```js
let add1 = (a,b) => a+b; //azonos a következővel:
let add2 = function(a,b) { return a+b; }

let f1 = () => "alma"; //azonos a következővel:
let f2 = function () { return "alma"; }

let g = (a,b,c) => { 
  /* több utasítást tartalmazó függvénytörzs */ 
}

let h = a => a+1; 
/* egyetlen paraméter esetén elhagyható 
  a zárójel a paraméterek körül */
```

---
### Függvény objektum típusa?

```js
console.log(typeof function (){}); //function
```

---
### Hasznos segdédfüggvények

* `console.log(...)`: kiírja a konzolra a paraméterül kapott értéket
* `alert(...)` megjelenít egy üzenetdobozt a paraméterül megkapott stringgel. 
  * *Csak böngészőben érhető el.*
* `promt(...)`: megjelenít egy szövegbekérő mezőt. 
  * *Csak böngészőben érhető el.*
* `confirm(...)`: megjelenít egy szövegdobozt jóváhagyás gombbal. 
  * *Csak böngészőben érhető el.*

---
## Objektumok

* Minden nem "primitív típusú" adat
* Kulcs-érték párok
  * kulcs: property neve (~ string)
  * érték: property értéke (tetszőleges adattípus)
* Új objektum létrehozása:
  * `new Object()`
  * `{}`
* Típusa: "`object`" (`console.log(typeof {});`)

---
### Property-k elérése
* Hosszabb forma: `objektum['property neve']` - ekkor valóban tetszőleges kulcsot használhatunk.
* Amennyiben a property neve érvényes változónév, akkor hasznáhatjuk az `objektum.property` elérést is. 

Két érdekes következménye van annak, hogy egy objektum valójában kulcs-érték párok tárolója:
* Ha le akarunk kérni egy property-t, ami még nem létezik, akkor nem kapunk hibát, hanem egyszerűen `undefined` lesz a visszatérési érték. 
* Ha írni szeretnénk egy property-t, ami még nincs benne az objektumba, akkor nem kapunk hibát, hanem az egyszerűen belekerül. 

----
```js
let a = new Object();
let b = {};

b.alma = "alma";
let c = b.alma; // "alma"
let d = b["alma"]; // "alma"
let e = b["körte"]; //undefined
b.name = "dió";
let f = b.name; //dió
```

---
### Objektumok létrehozása kezdőértékekkel

```js
let a = {
    name: "alma",
    value: "körte",
    "dió": 5
};
```

----
Milyen property-k vannak egy objektumon? 
 
```js
let a = {
    name: "alma",
    value: "körte"
    "dió": 5
};
for (let prop in a) {
    // "name", "value", "dió"
}
if ("name" in a) {
    //igaz
}
```

Jegyzet: 
Amennyiben szeretnénk tudni, hogy egy objektumnak milyen propertyjei vannak, akkor használjuk az `in` operátort:
* `for` ciklussal végigiterálhatunk az összes property-n: `for (let property in obj) { /* property egy string*/ }`
* `property in obj` kifejezéssel eldönthetjük, hogy az adott property benne van-e az objektumban.

---
### Metódusok (objektumokon)
* Függvény: egy speciális típus
* Egy objektum egy property-jének is lehet ez a típusa

```js
let a = {
    name: "alma",
    f: function() {
        console.log("hello");
    },
    g() {
        // rövidített metódus leírás function nélkül
    }
};
a.g = function() {
    console.log("hello2");
}
```
----
#### `this`
A metódusokon belül a `this` kulcsszóval hivatkozhatunk az aktuális objektumra. 
```js
let user = {
    name: "Mari",
    greet() {
        console.log(this.name);
    }
}
```

* Amennyiben egy objektum egy metódusát meghívjuk, akkor a `this` az objektumra mutat: 

```js
user.greet();
```

----
JavaScriptben a `this` egy foglalt szó, de nem kötött az értéke. Ezért sajnos a használata nem mindig biztonságos. 
```js
function greet() {
    console.log(this.name);
}
let user1 = { name: "User1" };
let user2 = { name: "User2" };

user1.greet = greet; 
user1.greet(); //this user1-re mutat
user2.greet = greet; 
user2.greet(); //this user2-re mutat
greet(); // a this undefined lesz
```
----
Egy másik problémás eset:
```js
let user = {
	name: "User",
	greet() {
		console.log(this.name);
	}
};

user.greet(); // "User"
let greet = user.greet;
greet(); // undefined
```

Jegyzet: 
A második `greet` hívás eredménye `undefined` lesz. Ugyanis minden `o.m()` formájú metóduhívásnál a `this` értéke a pont előtti objektum lesz, azonban itt nincs ilyen elérhető információ. 

----
Lambda kifejezések a `this` értékét nem írják felül! 
 * Az aktuális kontextusból szedik a `this` értékét!

```js
let user = {
    name: "User",
    greet() {
        let f = function () { console.log(this.name); }
        f(); // undefined
        let g = () => { console.log(this.name); }
        g(); // User
    }
}
user.greet();
```

---
### Konstruktor függvény

~ osztály

```js
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user = new User("Jack");
```

Amikor a `new` kulcsszóval hívunk meg egy függvényt, akkor:
* Létrehoznk egy új objektumot
* A `this`-t hozzákötjük ehhez az új objektumhoz, majd végrehajtjuk a függvény törzsét
  * Létrehozhatunk property-ket 
* Végül a `this` értékét visszaadjuk

Jegyzet:
Vigyázat, ha egy konstruktor függvényen belül visszaadunk egy objektumot, az felülírja a visszatérési értéket!

---
### Primitív adattítpusok vs. objektumok

* Primitív típusú értékek is rendelkeznek metódusokkal és property-kkel
* Primitív típuson nem tudunk változtatni (új property-t hozzáadni)
* A használat során csomagoló objektumok jönnek létre

```js
let a = "alma";
console.log(a.length); // 4
console.log(a.substr(2)); // ma
a.name = 5; // működik, nem kapunk hibát
console.log(a.name); // undefined
```

Jegyzet:
A `string` típusnak van `length` property-je, illetve `substr` függvénye. Ezek a tulajdonságok lehetővé teszik a hatékony stringkezelést. Ugyanígy vannak más egyszerű típusoknak is tulajdonságai. Azonban azt tanultuk, hogy a primitív típusok nem objektumok. Valójában amikor leírjuk például azt, hogy `"alma".length`, akkor létrejön a primitív érték körül egy ideiglenes csomagoló objektum (*wrapper object*), amely biztosítja a megfelelő metódusokat és property-ket. Azonban ez csak ideiglegenes, így hiába is akarjuk módosítani, az eredménye nem lesz tartós. 

---
## Függvények, mint objektumok
Mivel a függvények is objektumok: 
* Lehetnek property-jeik
* Vannak beépített property-jeik: `name` (a függvény neve), `length` (paraméterszám)

```js
function f(a,b) {
    return a+b;
}
console.log(f.name);    // "f"
console.log(f.length); //2

f.alma = "alma";
console.log(f.alma); // "alma"
```


---
## Getter és setter

Propertyként használható függvények:
* `get`: paraméter nélküli, visszatérő függvény
* `set` egyetlen paraméterrel rendelkező függvény
* nem kötelező, hogy mindkettőt definiáljuk

```js
let user = {
	_name : "",
	get name() { return this._name; },
	set name(value) { 
		this._name = value;
		console.log(value);
	}
};
user.name = "alma"; // console --> "alma"
console.log(user.name); // console --> "alma"
```

Jegyzet: 
A modern JavaScriptben lehetőség van getter és setter függvény definiálására. Ezek a háttérben függvényekként működnek, de úgy értetők el, mint egyszerű propertyk. A property olvasásakor a getter fut le és adja vissza az értéket, írásakor pedig a setter. 

---
## Hibakezelés
JavaScriptben a hibákat az `Error` objektumok jelzik, ezek felelnek meg a kivételeknek. 

```js
try {
    let x;
    console.log(x.y); 
    //az undefined-nak nem lehet hozzáférni a property-jeihez
} catch (err) {

}
```
```js
// hiba dobása
throw new Error();
```

---
## Tömbök
* Tetszőleges értekek indexelhető listája
* Létrehozás: 
    * üres lista: `[]`, vagy `new Array()`
    * Kezdőértékekkel: pl. `[1, "a", { name: "User" }, [1,2,3]]`
* Sok [metódus és property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) érhető el a listákon, pl: `push, pop, shift, unshift, splice, slice, concat, forEach, indexOf, filter, map, sort, reverse, length`
* Iterálás az elemeken: `for...of`

----
```js
let a = ['alma', "körte"];
et a2 = new Array();
a.push("dió"); // új elem hozzáadása
let x = a[0]; //alma
let y = a.length; //3
a[2] = "mogyoró"; //a: ["alma", "körte", "mogyoró"]
let z = a.pop(); // "mogyoró", a: ["alma", "körte"]

// végigiterálás az elemeken
for (let item of a) {
    //"alma", "körte"
}
```
Jegyzet:

Az objektumban lehetőség van tetszőleges kulcs-érték párok tárolására. Azonban gyakran fontos a kulcsok sorrendje is. Ekkor használjuk a tömböket, amelyek speciális objektumok. A tömböket egyszerű számokkal is indexelhetjük, nem kötekező azonos típusú adatokat tárolniuk, és `[]` jelekkel röviden leírhatók. 

Nagyon sok, nagyon hasznos és hatékony [metódusa](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) van az `Array` típusnak, például: `push, pop, shift, unshift, splice, slice, concat, forEach, indexOf, filter, map, sort, reverse`.

---
## JavaScript Object Notation (JSON)

* Adatleíró szöveges formátum
* JS objektumokhoz inicializálásához hasonlít
  * A property-k neveit idézőjelekbe tesszük
  * Értelemszerűen nincsenek metódusok, referenciák benne (nem programozási nyelv)
  * Egy gyökér objektum (lehet lista is)
  * Nincs komment
* Gyakran használjuk AJAX hívásoknál XML helyett
* JS beépítve támogatja az objektumok sorosítását
  * `JSON.stringify()`
  * `JSON.parse()`

----
```json
{
  "name": "Felhasználó",
  "id": 1234,
  "address": {
    "street": "József Attila u.",
    "city": "Budapest" 
    "nbr": "5"
  },
  "phones": [
    "06-30-12345678",
    "06-30-98765432"
  ]
}
```

```js
let list = JSON.parse("[1,2,3]"); // list <-- [1,2,3]
console.log(typeof list); // object
let list_s = JSON.stringify([5,6,7]); // list_s <-- "[5,6,7]"
console.log(typeof list_s); // string
```

Jegyzet:
Megismertük már a `{ ... }` leírást objektumok létrehozására. Amennyiben a property-k neveit mindig idézőjelek közé írjuk, akkor az így kapott formátum egy általános adatleíró formátum, aminek neve JSON (JavaScript Object Notation). A JSON egyre elterjedtebb és egyszerűsége, jó olvashatósága, tömörsége miatt gyakran használjuk XML helyett HTTP kérésések adatainak továbbítására. 

A JavaScript nyelvben két fontos függvénnyel tudjuk a JSON formátumú string-eket feldolgozni: 
* `JSON.stringify(obj)`: tetszőleges objektumot JSON formátumú stringgé sorosít
* `JSON.parse(obj)`: tetszőleges JSON formátumú stringet beolvas és felépíti belőle a megfelelő objektumot


---
&#10026; 
## Még többet a `this`-ről
Segédfüggvények a `this` beállítására függvényhíváskor:

* `f.call(thisArg, arg1, arg2, ...)`: ha egy `f` függvényen meghívjuk ezt a metódust, akkor az első paraméterül átadott objektum lesz a `this` és ebben a kontextusban kerül meghívásra az eredeti függvény a további paraméterekkel.
* `f.bind(thisArg)`: ennek a hívásnak a visszatérési értéke egy függvény, amelyben már be van állítva a `this` értéke az átadott paraméterre. 
Jegyzet:
Már láttuk, hogy a `this` kulcsszó mindig az aktuális objektumra mutat, de azt is láttuk, hogy könnyen elveszik, vagy rossz érték lesz beállítva. Szerencsére vannak segédfüggvények, amelyekkel egyszerűen kezelhetők ezek a hibák:
* `f.call(thisArg, arg1, arg2, ...)`: ha egy `f` függvényen meghívjuk ezt a metódust, akkor az első paraméterül átadott objektum lesz a `this` és ebben a kontextusban kerül meghívásra az eredeti függvény a további paraméterekkel.
* `f.bind(thisArg)`: ennek a hívásnak a visszatérési értéke egy függvény, amelyben már be van állítva a `this` értéke az átadott paraméterre. 

---
## Időzítők
* `setTimeout(action, delay)`:
    * `delay` ezredmásodperc múlva végrehajtja az `action` függvényben leírt utasításokat
    * A `delay` opcionális, ekkor "azonnal" megpróbálja végrehajtani (de **nem szinkron** módon)
* `setInterval(action, delay)`: 
    * Folyamatosan ismételve `delay` ezredmásodpercenként végrehajtja az `action`t
    * visszatérési értéke az időzítő azonosítója
    * leállítás: `clearInterval(timerId)`

```js
setTimeout(() => {
  console.log("Timeout");
}, 2000);
```



---
### Tutorialok:

* https://javascript.info/
* https://www.w3schools.com/js/

---
## Ellenőrző kérdések

Jegyzet:
* Mit jelent, hogy a JavaScript egy szkript nyelv?
* Hogyan tudunk egy HTML oldalon JavaScript nyelvű kódot futtatni?
* Mit tudunk megvalósítani egy HTML oldalon a JavaScript kódban?
* Mi az a NodeJS?
* Mit jelent az, hogy  *transpiler*?
* Mit jelent, hogy a JavaScript gyengén típusos nyelv?
* Mi egy JavaScript változó típusa?
* Milyen adattípusok vannak a JavaScript nyelvben?
* Mi a különbség a `==` és a `===` operátorok között?
* Van-e JavaScriptben függvény overloading?
* Mi az a lambda-kifejezés
* Mi az a függvénykifejezés?
* Mire való a `typeof` operátor?
* Mire való az `alert` függvény?
* Mire való az `confirm` függvény?
* Mit jelent az, hogy egy JavaScript objektum kulcs érték párok halmaza?
* Hogyan tudunk egy JavaScript objektum egy property-jére hivatkozni?
* Mire való az `in` operátor?
* Mit nevezünk konstruktor függvénynek?
* Mit nevezünk egy primitív adat csomagoló objektumának? Miért van erre szükség?
* Mi az a `getter` és `setter`?
* Mire való az `Error` típus?
* Hogyan tudunk tömböt definiálni? 
* Mi az a JSON? Milyen szabályok szerint épül fel egy JSON fájl?
* Milyen függvényekkel tudjuk JavaScriptben JSON formátumot kezelni?
* Mik azok az időzítők? Hogyan működnek a `setTimeout` és `setInterval` függvények?


