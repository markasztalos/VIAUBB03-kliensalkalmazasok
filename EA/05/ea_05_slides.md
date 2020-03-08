---
title: 5. előadás
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

# 5. Előadás

TypeScript
---

## Mi az a [TypeScript](https://www.typescriptlang.org/)?
* Programozási nyelv
* TS &sup; JS
    * JS nyelv kiegészítése
    * Minden JS kód, valid TS kód is
* TS kód egyszerű JS-re fordul (*transpiler*)
* Miért van/volt szükség a TypeScript-re?
    * JavaScript lassan fejlődött
    * Microsoft kifejlesztett egy saját nyelvet, ami pótolja a JavaScript hiányosságait
        * Gyorsan bővítik
    * Olyan nyelvi elemek vannak benne, amelyek remélhetőleg előbb utóbb a JavaScriptbe is bekerülnek


----
### Mit ad a JS-hez?
* Típusrendszer
    * *típusannotációk*: típus megkötések hozzáfűzése az egyes nevekhez 
    * automatizáltan (következteti a típust a fordító) és manuálisan
* generikus típusok
* fordításidejű típusellenőrzés
* osztályok, interfészek

----
Példák:
```ts
//code1.ts
function add(a : number, b : number) : number {
    return a + b;
}
let numbers : number[] = [1,2,3,4];
```

Jegyzet:
Az `add` függvény két `number` típusú paramétert vár és a visszatérési értéke is `number`.
---
## TS programozás folyamata

1. Megírunk egy TS programot
2. Átfordítjuk JS-re (*transpiling*)
3. Futtatjuk a JS-t

TS compiler (`tsc`):
* Letölthető parancssori változat, illetve Visual Studioba, Visual Studio Code-ba beépülő pluginként. 

----
```console
$ tsc code1.ts
```
&rarr; `code1.js`


Futtatás parancssorból:
```console
$ node code1.js
```
vagy HTML oldalon böngészőben:
```html
<script src="code1.js"></script>
```

---
## Típusok

* `boolean` 

```ts
let x : boolean = false;
```

* `number` 

```ts 
let x : number = 5;
```

* `string` 

```ts
let x : string = 'alma';
```
----

* Tömbök: 
    * Általános: `[]`, vagy `any[]` 
    * Azonos típusokból: `típus[]`

```ts
let a : number[] = [1,2,3];
let b : any[] = [1, "alma"];
let c: Array<numbers> = [1,2,3];
```

* ennesek 

```ts
let a : [number, string];
//a[0] : number
//a[1] : string
```

* `enum`

```ts
enum Color { Red, Green, Blue }
let a : Color = Color.Red;
```
----

* `any`: tetszőleges objektum, ugyanaz, mintha nem adunk meg típusannotációt
* `void`: visszartérési érték nélküli függvény
* Függvény típusok: lambda kifejezés szerűen

```ts
let f : (a: number, b: number) => number = (a,b) => a + b;
```

* Saját típusdeklaráció 

```ts
let user: { name: string, greet : () => void };
```
----
### Automatikus típuskövetkeztetés
```ts
let thisIsANumber = 5;
let thisIsAString = "alma";
let thisHasName = {
    name: "X"
};
```

---
## Típushibák

```ts
let user = {
    name: "X"
};

user.salary = "alma";
```

```console
tsc .\EA\05\demo\code1.ts
EA/05/demo/code1.ts:5:6 - error TS2339: Property 
'salary' does not exist on type '{ name: string; }'.

5 user.salary = "alma";
       ~~~~~~
```
----
### Tool support

VS Code, Visual Studio stb.

![](tsInVSCode.png)


----
A háttérben továbbra is JS van!

```ts
let user = {
    name: "X"
};

user["salary"] = "alma"; //működik
```

Jegyzet: 
A fenti kód lefut helyesen, az indexelt property-k esetén nincsen típusellenőrzés. 

---

## type assertation
* Azt mondjuk a fordítónak, hogy egy valamit egy adott típusként kezeljen
* Két féle szintaxis: 
    * `<típus>kifejezés`
    * `kifejezés as típus`

```ts
let x : any;
let a = <number>x;
let b = x as number;
```

* Csak fordításidejű információ, **futásidőben nem történik semmi, nincs castolás**!

Jegyzet: 
Fontos tudni, hogy ez nem castolás, nem történik átalakítás egyik objektumról a másikra JavaScript-ben. Futásidőben nem történik semmi, csak azt mondjuk a TS fordítónak, hogy ezt mostantól ilyen típusként kezelje, tudjuk mit csinálunk. 

---


# Változók

Példák változók típusdefiníciókkal történő ellátására

```ts
let a : string;
let b = 5; //number
let c =  a; // string;
b = "alma"; // fordítás idejű hiba
let d : { name: string} = { name: "alma", value: "körte"};
```

* `var, let, const` használhatók
* rendes block scoping

---

# Interfészek

* `: { ... }`, mint intefész lehetőség

```ts
let d : { name: string} = { name: "alma", value: "körte"};
```

* `interface` kulcsszóval elnevezhetők típusok és így újrafelhasználhatók

```ts
interface A { }
```

* öröklés interfészek között (`extends`)

```ts
interface A {}
interface B extends A { }
```
----

* opcionális mezők: `{ name? : string }`

```ts
interface User {
    name: string,
    salary? : number
};
let u1 : User = { name: "X", salary: 1 }; //ok
let u1 : User = { name: "Y" }; //ok
let u1 : User = { salary: 1 }; //hiba
```

----
* `readonly` property-k (csak létrehozáskor adhatók meg, később nem módosíthatók)

```ts
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
p1.x = 15; //hiba
```

----
Függvény típusok leírása intefészekkel

```ts
interface isBigger {
    (a: numer, b: number): boolean;
}
let f : isBigger = (x,y) => x > y;
```

* a paraméternevek nem kell egyezzenek

---

# Osztályok

* ~ JavaScriptben, mivel JS az alapja, a háttérben továbbra is protípusok vannak
* `class`
* `constructor` (paraméter property-k működnek)
* `extends` - öröklés másik osztályból
* `implements` -  interfész implementálás
* módosítók: `public`, `private`, `protected`, `static`, `readonly`
* getter, setter
* `abstract` - nem példányosítható

----
```ts
interface IAnimal {
    name : string;
}
class Mammal implements IAnimal {
    constructor(public name : string) {  }
    public age : number;
    public move() { }
    private numberOfLegs : number;
}
class Dog extends Mammal {
    constructor(name : string) { super(name); }
    public bark() { }
}
```

----

&#10026;

Óvatosan az osztályokkal és példányaikkal 
 * Mindig példány lesz?
 * Típusannotáció vs. cast

```ts
class A {
    a : string;
}
//lefordul, de nem lesz példány az A-nak
let user : A = JSON.parse("{ a: "alma" }"); 
```
    
Jegyzet:
Tegyük fel például, hogy a szerver visszaad egy JSON-t, amit parse-olunk. 

---
## TypeScript &rarr; JavaScript

<div style="width:49%;font-size:.6em; display:inline-block">
TypeScript

```ts
let a : number;
a = 5;

interface IUser {
	name: string;
	age?: number;
}

class User implements IUser {
	constructor(public name: string) {
    }
    
	greet() {
		console.log(this.name);
    }
    
	favoriteColor: string;
}

let user = new User("Mari");
```
</div>

<div style="width:49%;font-size:.7em;display:inline-block">
JavaScript

```js
var a;
a = 5;
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    User.prototype.greet = function () {
        console.log(this.name);
    };
    return User;
}());
var user = new User("Mari");
```
</div>

---

## Függvények

```ts
let myAdd: (x: number, y: number) => number = //típudefiníció
    function(x: number, y: number): number { return x + y; };
```

* opcionális (`?`) és default paraméterek (`=`)

```ts
function f(a? : number) {

}
f();
f(1);

function g(a : number = 5) {

}
g();
g(6);
```
* `this`: ugyanaz igaz rá, mint JavaScriptben

---

## Generikus típusparaméterek
* függvényeken és osztályokon

```ts
function addToArray<TItem>(array: T[], item: T) {
    array.push(item);
}
let a = [1,2,3];
addToArray<number>(a, 4);
//működik, a típusparaméter kikövetkeztethető
addToArray(a, 5); 
```

* több típusparaméter is lehet: `<T1, T2, T3, ...>`

----
```ts
class MyList<T> {
    private array: T[];
    constructor() { this.array = []; }
    public add(item: T) {
        this.array.push(item);
    }
    public log() {
        for (let item of this.array)
            console.log(item);
    }
}
```
----
```ts
let numbers = new MyList<number>();
numbers.add(5);
//numbers.add("alma"); -> hiba
let strings = new MyList<string>();
strings.add("alma");
//strings.add(5); -> hiba
let users = new MyList<{ name: string, salary: number }>();
```
----
Beépített generikus típusok:
* Tömbök: `Array<T>` &equiv; `T[]`
* Szótár: `Map<Key, Value>`

----

&#10026;

Típuskényszerek a generikus paraméteren: 
```ts
function printUserName<TUser extends { name: string }>(
    user : TUser) {
    console.log(user.name);
}
printUserName({ name: "User", salary: 5});
```

---

# Típusok kombinálása
* intersection (metszet): csak a közös property-k lesznek benne

```ts
let user: Person & Administrator;
```

* union (unió): vagy-vagy, mindegyik property-jei benne lehetnek

```ts
let Person | Administrator;
let item: string | number;
```

----

&#10026;

Honnan tudjuk, hogy mi lesz benne? Elég a castolás? (nem):

```ts
class A {
    a: string;
}
class B {
    b: string;
}
function (item: A | B) {
    if ((<A>item).a) {
        //a
    }
    if ((<B>item).b) {
        //b
    }
}
```

----
&#10026;

```ts
interface A {
    a : string;
}
interface B {
    b: string;
}
function isA(item: any) : item is A {
    let a = (<A>item).a;
    return a !== undefined;
}
function f(item: any) {
    if (isA(item)) {
        item.a = 'alma';
    }
}
```


---

## További típusok

*literal* típus: 

```ts
let item: 'a' | 'b' | 'c' | 3 | 5;
```

Lehet-e `null` egy változó értéke (*nullable*)?  
* `--strictNullChecks` kapcsoló fordításnál

```ts
let x : number = null;
let y : number | null = null;
```

---
## type alias
`type` *`TípusNév`* `=` *`típus_kifejezés`*`;`

 innentől erre a típusra tudok ezzel a névvel hivatkozn &rarr; nem kell leírni a kifejezést


```ts
type MyMethod = (x) => void
let f: MyMethod;

type User = { name: string };
let u1: User;
let u2: User;
```

----
 `type` vs `interface`: 
* `type` neve nem jelenik meg a fordítási hibaüzenetkeben 
* `type` nem lehet benne `extend, implements` utasításokban
* `type`  tartalmazhat unió és metszet típusokat

---
&#10026;
## `keyof`

```ts
let a : keyof Person;
```

<div style="font-size:smaller">

```ts
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}
```

</div>

---

## Modulok 
 `export` / `import` (már JavaScriptben is vannak)

```ts
//file1.ts
export function f() { }
```

```ts
//file2.ts
import * from 'file1';
import { f } from 'file1';
```



---
&#10026;

## Névterek 
Névterek (`namespace`)

```ts
namespace Test1 {
    export class A {  }
    class B {  }
}

namespace Test2 {
	export class C { }
	class D { }
}

let x : Test1.A;
```

---

## Declaration files (.d.ts)

* Együttműködés nem TypeScript könyvtárakkal: 

----
&#10026;

* `declare`: `var, function, namespace` 
* függvényeket lehet overloadolni

```ts
declare namespace GreetingLib.Options {
    // Refer to via GreetingLib.Options.Log
    interface Log {
        verbose?: boolean;
    }
    interface Alert {
        modal: boolean;
        title?: string;
        color?: string;
    }
}
declare f(x: number) => void;
declare f(y: string) => void;
```

---

## Dekorátorok osztályokon

```ts
function log(target: any) {
	console.log(target.name);
}

@log
class A { } // --> A
```

----

```ts
function providesHello(target: any) {
	target.prototype.hello = function() {
		console.log('hello');
	}
}

@providesHello
class A { }
let a= new A();
(<any>a).hello(); //castolás nélkül nem megy
```

----
### Dekorátorok függvényeken

```ts
function info(
    target: any, 
    propertyKey: string, 
    descriptor: PropertyDescriptor) {
	console.log(propertyKey);
}

class A {
	@info
	f() { }
}
```
----

&#10026;
### Dekorátor *factory*

```ts
function info(writeToConsole: boolean) {
    return function info(target: any, propertyKey: string, 
                         descriptor: PropertyDescriptor) {
		if (writeToConsole)
			console.log(propertyKey);
	}
}
class A {
	@info(true)
	f() { }
	@info(false)
	g() { }
}
```

---

## Project kezelés 
`tsconfig.json`


```json
{
    "compilerOptions": {
        "outFile": "../../built/local/tsc.js",
        "sourceMap": true
        //...
    },
    "compileOnSave": true,
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ],
    "files": []
}
```

*(És még sok egyéb)*

---

# TypeScript értékelés

"JavaScript Development at Application Scale"
* Típusok &rarr; kevesebb hiba
* Modularlizáltság
* Fejlesztőeszközök (Visual Studio, VSCode, WebStorm etc) 
    * kódkiemelés
    * autocomplete
