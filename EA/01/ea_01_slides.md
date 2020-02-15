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

# 1. előadás

---
### Mit tanultunk eddig a web működéséről?
* Hálózati kommunikáció
* HTTP protokoll
* Felhasználói tudás a weboldalakról

----
### Az óra célja:
* A web alapvető működésének a megértése:
    * Szereplők
    * Kommunikáció forgatókönyve és szabályrendszere
* Mi kell ahhoz, hogy ezt programozni tudjuk?
    * Programozási nyelvek és környezetek

---

### Hogyan működik egy egyszerű webszerver?

DEMO: egy kép betöltése a böngészőben
 * Indítsunk egy el egy egyszer webszervert ebben a könyvtárban!
    * (Pl. `http-server`(`npm`))
 * Nézzük meg, hogy kilistázza a böngésző a könyvtár fájljait
 * Nyissuk meg az  `demo/image.png` URL-t a böngészőben!

----
A böngésző működése:

 * A felhasználó beír egy URL-t a böngészőbe, ennek részei: IP cím, port szám, erőforrás azonosító: 
    * A böngésző a rövidebb formát írja ki: `www.aut.bme.hu` vs `http://www.aut.bme.hu:80/`
    * Az URL alapján, a böngésző generál egy kérést, amit elküld a webszervernek
    * A webszerver hálózati címe az URL-ből jön
    * A webszerver portszáma az URL-ből jön
    * A kérés leírásához használt protokoll (HTTP) az URL-ből jön
 * A webszerver visszadja a kért erőforrást a megfelelő kommunikációs protokollt használva (HTTP)

---
## Hogyan történik a kommunikáció?
 * Meg kell egyezni a formátumban:
    * Hogyan mondja meg a böngésző, hogy melyik erőforrást kéri?
    * Hogyan mondja meg a webszerver, hogy mit ad vissza? 
 * Kommunikációs protokoll: HTTP (HyperText Transfer Protocol)

(DEMO böngészőben, vagy [Fiddler](https://www.telerik.com/fiddler)ben ellenőrizhetjük az elküldött üzeneteket)

----
HTTP kérés (request)
```http
GET http://192.168.2.76:8080/DEMO/image.png HTTP/1.1
Host: 192.168.2.76:8080
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9
If-None-Match: W/"2251799814218547-34499-"2020-02-08T10:39:59.286Z""
If-Modified-Since: Sat, 08 Feb 2020 10:39:59 GMT
```
* Első sor felépítése (ld. számítógépes hálózatokból)
* Opcionális fejléc sorok
    
----
HTTP válasz (response)
```http
HTTP/1.1 200 OK
server: ecstatic-3.2.0
cache-control: max-age=3600
last-modified: Sat, 08 Feb 2020 10:39:59 GMT
etag: W/"2251799814218547-34499-"2020-02-08T10:39:59.286Z""
content-length: 34499
content-type: image/png; charset=utf-8
Date: Sat, 08 Feb 2020 10:47:50 GMT
Connection: keep-alive

PNG


IHDR            ^   PLTELiqJ? 
```
* Első sor (ld. számítógépes hálózatokból)
* Opcionális fejléc sorok
* Tartalom

----
#### Miért van szükség a HTTP protokollra?
 * A böngésző a webszervernek és webszerver a böngészőnek bájtsorozatokat küld
 * Meg kell egyezniük abban, hogy a bájtosorozatot hogyan kell értelmezni? 
    * &rarr; szabványosított protokoll
 * A böngésző az erőforrásazonosítót kell elküldje és további paramétereket
 * A webszerver a válaszban a kért erőforrás adatait és további paramétereket küldd
 * Ezt teszi lehetővé a HTTP, ami egy egyszer szöveg alapú adatátviteli protokoll

---
A böngésző és a webszerver együtt egy elosztott alkalmazást alkotnak, amelyek egymással kommunikálnak. 
### Kliens-Szerver archietktúra
* Egy elosztott hálózati kommunikációs séma:
    * Szerver figyel egy jól ismert címen
    * A kliens csatlakozik, küld egy kérést, amire a szerver válaszol
* A web esetében:
    * Webszerver
    * User agent (itt most ez a böngésző) - aki a HTTP kérést küldi. 
        * Nem feltétlenül böngésző, tudnánk sajátot is írni egyszerű socket kezeléssel

---

# Webalkalmazások

---
## Weboldalak
DEMO Kérjünk le egy egyszerű weboldalt: [`index.html`](demo/index.html)

A böngésző megjelenít egy tartalmat, nem csak kiírja a szöveget
 * A tartalom egy HTML dokumentum: egy weboldal
 * *HyperText Transfer Language*: XML (szerű) nyelv, 
    * az egyes tag-eknek megfelelő jelentésük van. 

----
HTML fájl tartalma
 * Statikus tartalom
 * Kép: egy hivatkozás, amit a böngésző felismer, elküld egy újabb HTTP kérést ennek a lekérdezésére
 * Link: a böngésző kiírja a szöveget és amikor rákattintunk az egérrel, elküld egy újabb HTTP kérést és megjeleníti az eredményét (átirányítás).
 * CSS (Cascaded StyleSheet): egy programozási nyelv, amivel a HTML elemek stílusát lehet megadni

---
## Statikus weboldal &rarr; webalkalmazás
----

### Statikus vs dinamikus web tartalmak:
* A visszaküldött weboldal (HTML tartalom) **statikus**: 
    * Nem változik, miután a böngésző betöltötte
    * Átirányításkor a böngésző újratölti a teljes oldalt. 

----
* A visszaküldött weboldal (HTML tartalom) **dinamikus**: 
    * DEMO: [dyn1.html](demo/dyn1.html)
    * Mit jelent, hogy dinamikus?
        * A böngészőben fut egy kód
        * Nyelve: **JavaScript**
        * Módosíthatjuk a felületet (`document` - a HTML tartalom, amit a böngésző megjelenít)
        * Feliratkozhatunk felhasználói eseményekre: kattintás, egér mozgatás, ablak átméretezés, billentyű leütés stb.

----
### Mit lehet még csinálni JS-ben? 
 * Kommunikálni a szerverrel.
    * DEMO [dyn2.html](demo/dyn2.html)
    * A JavaScript kódból indítunk egy HTTP kérést és feldolgozzuk az eredményét
    * Miért jó?
        * Nem az egész oldalt visszük át a hálózaton (&rarr; teljesítmény növekedés)
        * Nem az egész oldalt töltjük újra (&rarr; nincs villódzás, jobb felhasználói élmény)

----
### AJAX
### **A**synchronous **J**avascript **a**nd **X**ML
Ezt a kérést AJAX-nak nevezzük: 
* Aszinkron (nem blokkolja a UI szálat)
* JavaScript kódból indítjuk
* A szerver nem HTML-t ad vissza, hanem adatot, amelyet a JavaScript kód feldolgoz. 
    * Ez régen tipikusan XML volt, ma inkább JSON. (Van olyan, hogy a szerver HTML részleteket ad vissza.)

----
HTTP és AJAX:
 * Az AJAX hívás eredményét a JavaScript dolgozza fel. 
 * A JavaScript módosítja a HTML-t
 * A webszerver tipikusan nem egy teljes HTML dokumentumot ad vissza, hanem:
    * Egyszerű adatot (pl. XML)
    * Esetleg részleges HTML tartalmat, amivel a böngészőt frissíteni kell
 * Tehát a HTTP-vel nem csak teljes fájlokat, hanem tetszőleges adatot lehet küldeni, fogadni.

----
### Statikus vs. dinamikus kiszolgálás:
 * A kiszolgálás **statikus**: 
    * Adottak az erőforrások (fájlok)
    * Bármikor kérjük le az oldalt, a webszerver mindig ugyanazt adja vissza
 * A kiszolgálás **dinamikus**:
    * A szerveren lefut egy program, ami előállítja a visszaküldött tartalmat. 
        * A program futása nem mindig ugyanazt adja vissza.
    * &rarr; Személyre szabott tartalom: attól függ, hogy mit adunk vissza, hogy ki kéri le (milyen paraméterek vannak a HTTP kérésben). 

Note: Péládul ha beléptünk a gmailbe, majd beírjuk, hogy `gmail.com`, akkor mindenkinek a saját leveleit adja vissza a Google. 

---
### Single Page Application:
 * Olyan webalkalmazás, amely indulásnál lekér egy HTML tartalmat, amelyben egy komplex JavaScript alkalmazás van.
 * A felhasználó események hatására az oldal, mint egy hagyományos desktop alkalamazás, folyamatosan változik, de ezt nem az oldal úratöltésével, hanem AJAX hívásokkal érjük el. 

----
 * Mi történik az URL-lel? 
    * Az URL segít, hogy egy adott erőfrorrásra tudjunk hivatkozni.
    * A böngészőben beírt URL általában a lekért erőforrást (pl. `gmail.com`) jelzi
    * SPA-k esetén a JavaScript kódból az URL-t is át szoktuk írni (a postfixeket, az eleje - pl. `gmail.com` - mindig marad). De valójában nem történik átirányítás. 
    * Miért jó ez? 
        * Tegyük fel, hogy szűrni szeretnénk a leveleket azokra, amiknek feladója XY! `gmail.com?filter=XY` beilleszthető egy új ablakba és folytatható a munkamenet. 

----
 * Milyen feltételei vannak annak, hogy igazán komoly SPA-kat tudjunk írni böngészőkben?
    * HTML UI leíró nyelv kifejező ereje legyen elég jó
    * Hatékony böngészők (mert ezek renderelik a HTML-t és futtatják a JavaScriptet)
    * Jól használható, fejlett JavaScript nyelv (legyen alkalamas komplex alkalmazások fejlesztésére)
    * &rarr; Az utóbbi években mind nagyon sokat fejlődött

---
### A web, mint speciális fejlesztési környezet
Webes alapon nagyon komoly alkalmazásokat tudunk fejleszteni. 

Mik a specialitások más UI programozási környezetekhez képest (pl. egy desktop C#, vagy Java alkalmazáshoz képest)?

----
 * UI (felhasználó felüelt) leírás csak HTML-lel és CSS-sel
    * A HTML kód hierarchikusan tárol tag-eket, ebből a böngésző a memóriában felépít egy fastruktúrát (DOM - Document Object Model).
    * Ha a UI-t változtatni akarjuk, akkor a HTML DOM-ot kell JavaScript-en keresztül módosítsuk. Erre való a `document` változón keresztül elérhető API (pl. `createElement`, `getElementById` stb.)

----
 * Programozás csak JavaScript-ben, aminek vannak specialitásai
 * Különböző böngészőmotorok (Chrome, Firefox, Internet Explorer, Edge (most már Chromium alapon), Safari, mobil böngészők): a HTML, CSS, JS nyelvek fejlődését különböző módon követik, 
    * vannak kisebb eltérések, de ma már nagyon jó a helyzet

----
 * Korlátozások a böngészőben egy asztali környezethez képest:
    * Hagyományos programozási környezetben elérjük az OS sok szolgáltatását (pl. fájlkezelés), kapcsolódhatunk a gépen futó más programokhoz
    * A böngésző, mint környezet nem éri el a fájlrendszert (biztonság)
    * A böngészőből nem tudunk újabb programokat indítani (biztonság)

----
 * Adatkezelés
    * Nincs fájlrendszer
    * Storage API: kis méretű kulcs érték párok tárolása a böngészőben
        * session storage: csak a munkamenet idejére (amíg a böngészőt nem zárjuk be) marad meg a tartalma
        * local storage: a böngésző bezárása után is megmarad a tartalma
    * (web SQL, IndexedDB...)
    * Kommunikácó különböző szolgáltatásokkal a hálózaton keresztül

----
### Kitekintés 
#### böngésző független multiplatform fejlesztés
A JavaScript futtatásához kell egy JS motor
 * Van böngésző független JS motor 
    * JS nyelven lehet bármilyen konzolos programot írni (pl. webszervert)
    * Nem érthető el benne a `document`, tehát nincs HTML DOM kezelés
    * De cserében hozzáférünk az OS-hez (van pl. fájl API)
    * [NodeJS](https://nodejs.org/en/)

----
 * Lehetséges JS + HTML alkalmazásokat nem weben, hanem egy desktop környezetben futtatni
    * Tehát írhatunk egy komplett desktop alkalamzást a JS, HTML technológiák felhasználásával. 
    * Itt már elérjük az OS-t. 
    * pl. [ElectronJS](https://www.electronjs.org/)

---
#  HTTP (Ismétlés)
HyperText Transfer Protocol

---
### HTTP
 * A HTTP az alapértelmezett protokoll a weben a böngésző és a webszerver közötti kommunikációra
 * Megcímzünk egy erőforrást, amit a szerver visszaad
 * Mi is az erőforrás? 
    * A visszaküldött tartalom bármilyen bájtsorozat lehet
    * Lehetnek fájlok, amiket megcímeztünk
    * De az erőforrás lehet valamilyen adat is

---

### Példa 

Tegyük fel, hogy könyveket akarunk kezelni egy webalkalmazásban. 
* Egy listában lekérjük a könyveket, 
* kiválaszthatunk egyet és azt törölhetjük, vagy módosíthatjuk,
* új könyvet tölthetünk fel. 
* Szertnénk ehhez egy **elosztott API**-t 

----
Mit jelent az elosztott API:
 * API: Application Programming Interface
    * Egy program meg tud hívni távoli gépeken metódusokat
    * A metódus végrehajt egy műveletet
    * A metódusnak van visszatérési értéke
HTTP végpontok, mint elosztott API:
 * Definiálunk egy URL-t, amire, ha HTTP kérést küldünk, végrehajtunk egy műveletet
 * Visszaadunk egy erdményt
 * Milyen műveleteket akarhat végrehajtani a kliens?

----
 * Milyen HTTP igék vannak? = Milyen műveleteket lehet végrehajtani az adatokon?
    * GET (erőforrás lekérése)
    * POST (új erőforrás feltöltése - adatot is küldünk)
    * PUT (erőforrás módosítása)
    * DELETE (erőforrás törlése)
    * ...

Ezek az ún. **CRUD** (create, read, updated, delete) műveletek. 

----
Könyvek lekérdezése (kérés-válasz)
```http
GET /books HTTP/1.1
Accept: */*
Host: localhost:3000
```
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 164
Date: Sat, 08 Feb 2020 12:54:54 GMT

[
    {"isbn":"9786155248214","title":"Egri csillagok"},
    {"isbn":"9789639555054","title":"A kőszívű ember fiai"},
    {"isbn":"9789630980746","title":"Fekete gyémántok"}
]
```
----
Egy bizonyos könyv lekérése 
```http
GET /books/9786155248214 HTTP/1.1
Accept: */*
Host: localhost:3000
```
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 49
Date: Sat, 08 Feb 2020 12:55:33 GMT

{"isbn":"9786155248214","title":"Egri csillagok"}
```

----
Nem létező könyv lekérése
```http
GET /books/1234 HTTP/1.1
Accept: */*
Host: localhost:3000
```
```http
HTTP/1.1 404 Not Found
Content-Type: text/plain; charset=utf-8
Content-Length: 9
Date: Sat, 08 Feb 2020 13:32:11 GMT

Not Found
```

----
Törlés
```http
DELETE /books/9786155248214 HTTP/1.1
Accept: */*
Host: localhost:3000
Content-Length: 0

```
```http
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Content-Length: 2
Date: Sat, 08 Feb 2020 13:32:55 GMT
```

----
Új könyv feltöltése
```http
POST /books HTTP/1.1
Content-Type: application/json
Accept: */*
Host: localhost:3000
Content-Length: 70

{
    "title": "Bprof Kliensalkalmazások jegyzet",
    "isbn": "11223344"
}
```
```http
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Content-Length: 2
Date: Sat, 08 Feb 2020 13:40:27 GMT

OK
```

---
### REST
### REpresentational State Transfer
* HTTP segítségével nagyon kényelmesen tudunk egy API-t definiálni
    * Nagyon sok programozási környezetben van elérhető könyvtár HTTP küldéshez (JS-ben is)
* Az ilyen módon leírt API-t RESTful-nak nevezzük 
    * REpresentation State Transfer
    * architektúrális stílus
* Érdemes átgondolni, hogy milyen lehetőségeink lennének még?
    * Saját protokoll, socketeken keresztül
    * Más szabványok - pl. WebService (WS-*)

----
Mi hiányzik a fenti RESTful API-ból?
* CRUD-on túli műveletek
* Például: Tegyük fel, hogy ki akarjuk törölni egy könyv címének első `n` karakterét! Milyen végpontot definiáljunk?
    * URL: `/books/<isbn>/delete-from-title`
    * HTTP ige: 
        * GET: jó lehet, bár félrevezető.
        * POST: jobb is, mert parametéret is kell küldeni (`n`)

----
#### Backend as a Service:
 * Felhő alapú szolgáltatási modell
 * A frontend fejlesztő outsource-olja a backend fejlesztést
 * Megadunk egy adatstruktúrát és ahhoz automatikusan kapunk egy adatbázist és CRUD műveleteket REST végpontokon keresztül. 

---
# Állapotkezelés
A HTTP állapotmentes protokoll
* Mit jelent ez a felhasználókezelés tükrében?
* Hogyan történhet egy webalkalamazásban a felhasználó azonosítása?
* Süti (`cookie`) koncepció

---
### Süti
Süti beállítása a HTTP válaszban: 
 * `Set-Cookie` HTTP header
A süti elküldése minden HTTP kérésben: 
 * `Cookie` HTTP header

----
Cookie tartalma: 
* Name: süti neve, ezzel tudunk rá hivatkozni.
* Value: az eltárol érték sztring formátumban.
* Expiration date: Süti lejárai ideje
* Path: URL-ben minek kell szerepelnie, hogy elküldje a sütit a böngésző.
* Alapértelmezés szerint: "/"
* Domain: Melyik hostokra kell elküldeni.
* Ha nincs megadva, akkor ahonnan letöltöttük az oldalt (subdomainek nélkül)
* Secure: Csak HTTPS-en keresztül használható.
* HttpOnly: Kapcsoló, hogy ne lehessen JS-ből módosítani.

----
Mi történik a sütivel?

A böngésző tárolja egy bizonyos ideig:
* *session cookie*: csak a munkamenet idejére létezik, a böngésző bezárásával törlődik
* *permanent cookie*: megmarad a böngésző bezárásakor is

DEMO

---
# Összefoglalás
 * kliens-szerver
 * Webszerver, Frontend-backend
 * HTTP: Kérés-válasz felépítése, HTTP igék, RESTful API, BaaS
 * HTML: DOM, CSS
 * Statikus vs. dinamikus weboldal 
 * Statikus vs. dinamikus kiszolgálás
 * Javascript: AJAX
 * SPA
 
---
### Ellenőrző kérdések
* Mit nevezünk kliens-szerver architektúrának?
* Mire való a HTTP protokoll? Mi a HTTP kérés, illetve válaszok felépítése?
    * Milyen HTTP igék vannak? 
    * Mit nevezünk sütinek?
* Mire való a HTML nyelv? 
* Mire való a CSS nyelv?
* Mire való a JavaScript nyelv? 
    * Mit jelent az AJAX? 
    * Hogyan működik egy Single Page Application?

----
* Mit nevezünk Backend as a Service szolgáltatásnak?
* Mitől speciális a HTML + JavaScript alapú fejlesztés? Hasonlítsa össze egy hagyományos desktop alapú fejlesztési környezettel!
