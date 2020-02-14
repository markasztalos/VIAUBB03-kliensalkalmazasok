<style>
    .reveal .slides {
        text-align: left;
        font-size: 36px;
    }
    .reveal .slides section>* {
        margin-left: 0;
        margin-right: 0;
    }
</style>

Kliensalkalmazások

# 2. Előadás

HTML, CSS, Bootstrap

---

# XML (ismétlés)

eXtensible Markup Language

---
* Szöveges dokumentum jelölő nyelv
* Elemek
    * nyitó-záró tag, vagy egyetlen elem
    * attribútumok
* Nincsenek előre definiált elemek
    * Bővíthetők
    * Önleíró (sémák)
* Struktúrált adatleírás
    * Fastruktúra: egyetlen gyökér elem
    * A több elemnek mind van egyetlen szülője

----
Példa

```xml
<library>
    <book isbn="123455678" title="Egri csillagok">
        <description>...</description>
    </book>
    <book title="Gyűrűk Ura">
    ...
    </book>
    <book title="Galaxis útikalauz stopposoknak" />
</library>
```

---

# HTML 
### HyperText Markup Language

* Jelölőnyelv ami leírja a böngészőnek, hogyan épül fel a weboldal struktúrája:
* A böngésző képes a HTML dokumentumok megjelenítésére. 

----

Referenciák:
* Mozilla developer network (MDN): https://developer.mozilla.org/en-US/docs/Web/HTML
* w3schools: https://www.w3schools.com/html/
* Hivatalos szabvány: https://dev.w3.org/html5/html-author/

----

Történelem, verziók:
 * Tim Berners Lee (CERN) ~ 1991
 * Hosszú fejlődés, több verzió
 * HTML5: a jelenlegi legfrissebb verzió

---
### ~XML

Tag párok:
* `<a>` ... `</a>`, vagy `<input />` 
* attribútumok: `<img src="image.png" />` (mindig a nyitó tagben)
* tartalom `<p><span>alma</span></p>`
* XML-szerű, de vannak olyan tagek, amiket nem kötelező lezárni. 
    * A legjobb, ha XML szabványnak megfelelően írjuk le a dokumentumokat. &rarr; XHTML
* Mind a tageknek, mind az attribútumoknak szabványban rögzített jelentése van, ezeket a böngészők ismerik.

---

### Kötelező elemek
DEMO ([`initial.html`](demo/initial.html))
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset=UTF-8>
    <title>Hello World!</title>
  </head>
  <body>
      Hello World!
  </body>
</html>
```
----

* `DOCTYPE`: (full standard vs. quirks mode - régen nagyobb jelentősége volt)
* `html` - kötelező gyökérelem
* `head` - kötelező elem a metainformációknak, linkeknek
    * `meta`: metainformációk, például az oldal kódolása
    * `title`: az oldal címe, ami böngésző tabon megjelenik
    * `link`: hivatkozások más fájlokra (ld. később)
* `body` - kötelező elem a megjelenített tartalomnak

---

### Box modell
Block és inline típusú elemek
 * DEMO: [`box-model.html`](demo/box-model.html)
    * `div`
    * `span`
 * Mi határozza meg, hogy egy elem milyen?
    * Szabvány
    * Felülírható (ld. `display` css tulajdonság később)
 * A box modellen használt méretek:
    * küldő margó: `margin`
    * keret: `border`
    * belső margó: `padding`

---

### Fontosabb elemek
Szemantikus tagek
* `header`
* `nav`
* `aside`
* `section`
* `article`
* `footer`
* Miért jók?
    * Google kereső értelmezi
    * Felolvasó szoftverek
    * Jelentéssel bírnak
* `div` vs szemantikus tagek

----

* Címsorok (`h1`, `h2`, `h3`...)
* Kattintható link: `a`, 
    * `href`: az URL, amire mutat
* Kép: `img` 
    * `src`: az kép URL-je
* Sortörés: `<br />`
* Vízszintes vonal: `<hr />`
* Bekezdés: `p` 
* Felsorolás: 
    * `ul` (unordered list)
    * `ol` (ordered list) 
    * `li`: list item

----

* Táblázat: 
    * Alapvető elemek: 
        * Táblázat: `table`, 
        * Sor: `tr`, 
        * Cella: `td`
    * Fejléc cella. `td` helyett `th`
    * A fejléc, törzs, lábrész jelölésére: `thead`, `tbody`, `tfoot`


Note: mit kezd a böngésző a nem definiált tagekkel?

----
Általános attribútumok:
* `id`: valójában nincsen többlet jelentése, de tipikusan az elemek egyedi azonosítására használjuk. 
* `title`: tooltip a legtöbb elemhez

---
### HTML 5
 * Fő célja, hogy a webes alkalmazásokhoz ne legyen szükség pluginek használatára: Adobe Flash, Microsoft Silverlight, JavaFX
 * Kompatibilitás: 
    * ma már elég jó
    * Can I use? https://caniuse.com/ - összegyűjtötték, hogy az egyes feature-öket milyen böngészők támogatják
 * HTML 5 újdonságok: nem nézzük meg részletesen, hogy mi nem volt régebben, de utána lehet nézni

---

### Űrlapok
* Cél: adatbeküldés
    * Mi is az adatbeküldés? Generálunk egy HTTP kérést, aminek paraméterei vannak. 
    * A böngésző elüld egy HTML kérést, aminek az eredményeképpen visszakapott tartalmat megjeleníti? 
* Hogyan generálunk HTTP-t? 
    * Láttuk már, hogy javascript-ben tudunk küldeni a háttérben egy HTTP kérést. Ilyenkor ennek az eredményét kódban dolgozzuk fel, tehát a böngésző nem fogja megjeleníteni. 

----
Példa: bejelentkezés (DEMO: [`form.html`](demo/form.html))
* HTML elemek: 
    * `form`, `input` (`type`, `value`, `name` attribútumok), `textarea`, `select`
* Milyen HTTP-t akarunk generálni? (`form` tag `method` attribútuma)
    * GET: URL paraméterek - nem titikosított
    * POST: HTTP bodyban utazik - nem titkosított, de titkosítható
* Hova küldjük a kérést? (`form` tag `action` attribútuma)

---

# CSS
Cascading StyleSheets
 
---

A HTML-lel szorosan összefüggő szabvány. Célja, hogy le tudjuk írni a HTML elemek kinézetét (stílusát).

----

Css tulajdonságok: 
 * Van sokféle tulajdonság, amiket beállíthatunk a ez egyes HTML elemekre. 
    * A tulajdonságok listája, jelentésük és lehetséges értékeik szabványban rögzítettek. Például: https://www.w3schools.com/cssref/
    * Egy tulajdonság leírása, például: `background-color: blue;`
    * A tulajdonságok összefügghetnek: pl. `border-width: 0` és `border-color: blue` és egymást befolyásolhatják

----
Hogyan rendeljük a tulajdonságokat az egyes elemekhez?
1.  Megadhatók bármely elem `style` attribútumában `;`-vel elválasztva: 
    * Például: `<span style="font-size: larger; color: lightgray">szöveg</span>`
2. A tulajdonságokat csoportokba (`{...}`) rendezhetjük, majd a csoportokat összeköthetjük az egyes elemekkel (css szelektorok)

```css 
<css_szelektor> {
    border-width: 0;
    border-color: blue;
}
```

----

Hova helyezzük ezt a leírást?
1. `style` HTML elem
```html
<style type="text/css">
    css csoportok
</style>
```
    * A `type="text/css"` az alapértelmezett beállítás, ezért nem kötelező.
2. Különálló CSS fájlba, amire `link` taggel kell hivatkozni a `head`-ben.
* `<link rel="stylesheet" href="style.css">`

----
Milyen [css szelektorok] vannak?(https://www.w3schools.com/cssref/css_selectors.asp)

DEMO ([`css.html`](demo/css.html))

* element, class, id, attribute, ...
* Ezek kobinálása
* Hierarchia megadása (pl. `div span { ... }`: a `div`-en belüli `span`-ek)

---

### Fontos CSS tulajdonságok:
* `display`: `block`/`inline`
* Margók, keretek: `margin`, `padding`, `border`
    * mértékegységek: `1px`, `1em` stb.
* Méretek: `height`, `width`, `min-height`, `,min-width`
    * Relatív mértékegységek: `50%` stb.
* Színek: `color`, `background-color`
    * színek megadása névvel (pl. `blue`), vagy rgb értékkel (`#112233`, vagy `rgb(11, 22, 33)`)

----
CSS tulajdonságok alkalmazási sorrendje

---
### Elrendezések (layoutok)
* Táblázatokat nem használunk elrendezéshez, oldal struktúrájának meghatározására.
* `div`-ekkel lehet játszani, de nehézkes
* [`float` és `clear` tulajdonságok](https://developer.mozilla.org/samples/cssref/float.html)
    * Régen sokat használtuk, de a modern bögnészőkben szerencsére nem kell
* `flexbox`: nagyon rugalmas, a modern böngészők jól támogatják
    * https://css-tricks.com/snippets/css/a-guide-to-flexbox/
    * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox
* Középre rendezett oldal: DEMO  [`layout1.html`](demo/layout.html)

----
* Grid rendszerek: az oldalunkat felosztjuk oszlopokra és sorokra. 
    * Az elemeket az egyes cellákba helyezzük el. 
    * A céllák szegélyei tipikusan nem látszanak, ezek kizárólag az elrendezés miatt szükségesek. 
    * A sorok olyan magasak, mint a bennük lévő tartalom, de az oszlopok szélessége rögzített. 
    * Természetesen lehet több egymás melletti cellát összevonni. (ld. Bootstrap később)

---
### Reszponzív tervezési elvek

Különböző méretű képernyőkön máshogyan szeretnénk megjeleníteni a tartalmat. Például ha elég széles az ablak, akkor egymás mellett, de mobiltelefonon egymás alatt megjelenített elemekkel. 
* Legfontosabb eleme: `@media` CSS3 szelektor, pl: `@media only screen and (min-width: 600px)`

[Példa](https://www.w3schools.com/css/tryit.asp?filename=tryresponsive_col-s)

---
### CSS keretrendszerek

Az elrendezésekbe és a reszponzív tervezési elvekbe nem mentünk bele részletesen, mert nagyon speciálisak, sok idő és nehézkes a használatuk.  
* Szerencsére nagyon sok ingyenes sablon érhető el, amikből érdemes kiindulni. 
* Vannak ezeken kívül CSS keretrendszerek. Ezek olyan CSS szabályok gyűjteményei, amivel egy-egy speciális elrendezést, vagy stílust tudunk alkalmazni az oldalunkon azzal, hogy egyszerűen hivatkozzuk a keretrendszer által publikált CSS fájlt. 
* A legfontosabb, legelterjedtebb ilyen keretrendszer a bootstrap (https://getbootstrap.com/), de van más is. 

----
#### Bootstrap
* [Dokumentáció](https://getbootstrap.com/docs/4.4/getting-started/introduction/)
* Használata: 

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
```

* Miért van benne JavaScript? Bizonyos elemek, stílusok, animációk csak JavaScript segítségével oldhatók meg. 
* Legfontosabb elemek (DEMO)
    * Layout: `container` és `grid`
    * Flexbox elrendezés
    * Egységes tipográfia
    * Egységes színek

---
# Markdown 
* Cél, hogy egyszerűen tudjunk html-t generálni.
* [RevealJS](https://revealjs.com/#/), [RemarkJS](https://remarkjs.com/#1)
 

---
### Ellenőrző kérdések
* Mire való a HTML nyelv?
    * Milyen kötelező elemei vannak egy HTML dokumentumnak? 
    * Mire való a `DOCTYPE`?
    * Mire valók a `html`, `head`, `body` elemek?
    * Ismertesse a következő elemeket és legfontosabb attribútumaikat: `a`, `img`, `p`
    * Hogyan kell táblázatot definiálni HTML-ben? 
    * Mi a különbség s div és span elemek között?

----
* Mire való a CSS nyelv? 
    * Mi az a CSS szelektor?
    * Milyen CSS szelektorokat ismer?
    * Mi rendezünk reszponzív designnak?
* Ismertesse a box modellt!
* Mire szolgálnak az űrlapok?
    * Hogyan kell űrlapokat létrehozni? 
    * Milyen adatbeviteli mezők vannak egy űrlapban? 
    * Ismertesse az űrlapok beviteli mezőiben szereplő `name` attribútum jelentését!
    * Mi lesz egy űrlap alapján készített HTTP kérés tartalma?






