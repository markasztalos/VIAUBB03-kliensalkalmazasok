# Példa az [*In memory web api*](https://angular.io/tutorial/toh-pt6#simulate-a-data-server) használatára

## Mire való?
A következőben egy minimális Angular alkalmazást hozunk létre, amely egy webszervertől lekérdezi könyvek listáját és megjeleníti a megkapott listát. A webszerverről feltételezzük, hogy a kommunikáció `json` formátumban működik, tehát a visszakapott lista egy JSON formátumú JavaScript tömb lesz. 

A HTTP kérés elküldésére a `HttpClient` Angular szolgáltatást használjuk. 

Ebben a példában azt nézzük meg, hogyan lehet a webszervert egy speciális Angular service-el helyettesíteni. Ez a szolgáltatás létrehoz egy "adatbázist" a memóriában. Az adatbázis valójában egy JavaScript objektum, amelynek az egyes property-jei lesznek adathalmazok. Például, ha könyveket akarunk kezelni, akkor a `books` property tárolja a könyvek listáját.

A memóriabeli adatbázist HTTP kérésekkel tudjuk elérni. Tehát a szokásos módon a `HttpClient` szolgáltatás segítségével elküldjük a HTTP kéréseket, de a fenti Angular szolgáltatás elkapja ezeket és kiszolgálja a kéréseket az adatbázis alapján. 
* A kéréseket a `/api/<adathalmaz_property_neve>` címre kell küldeni, pl. `/api/books`
* Lehet `GET`, `POST`, `PUT`, `DELETE` kéréseket is küldeni, amit megfelelő konfiguráció után tud kezelni a szolgáltatás. Ebben a példában csak az összes könyv lekérését konfiguráljuk be. 

Ennek a megoldásnak az előnye, hogy a tesztelés céljából használhatunk egy böngészőben futó memóriabeli adatbázist, amit könnyen lecserélhetünk a későbbiekben egy valós szolgálatásra. 

## Angular alkalmazás létrehozása

Hozzunk létre egy új minimális Angular alkalmazást!

```console
$ ng new sample --prefix sample --routing false --skip-git --skip-tests --minimal 
```

Adjuk hozzá az in-memory web apihoz szükséges `npm` csomagot!
```console
$ npm install angular-in-memory-web-api --save
```

## In-memory web api konfigurálása

Hozzunk létre egy új service-t, ez fogja szimulálni a web apit!

1. Létrehozunk egy új service-t. Megírhatjuk kézzel is, vagy legenerálhatjuk az új fájlt az `ng` segítéségével. 
    ```console
    $ ng generate service InMemoryData
    ```
2. Írjuk meg a service-t!
    ```ts
    import { Injectable } from '@angular/core';
    import { InMemoryDbService } from 'angular-in-memory-web-api';

    @Injectable()
    export class InMemoryDataService implements InMemoryDbService {

        constructor() { }

        createDb() {
            const books = [
                { "id": 1, "isbn": "9786155248214", "title": "Egri csillagok" },
                { "id": 2, "isbn": "9789639555054", "title": "A kőszívű ember fiai" },
                { "id": 3, "isbn": "9789630980746", "title": "Fekete gyémántok" }
            ];
            return { books }; // ekvivalens ezzel: { books: books }
        }
    }
    ```
    A konfiguráció tehát nagyon egyszerű:
    * Létrehozunk egy service-t
    * Leszármaztatjuk az `InMemoryDbService` osztályból
    * Megírunk egy `createDB` nevű metódust metódust, amely visszaadja a kezdeti adatbázismodellt. (Ez az ősosztályban egy absztrakt metódus.)
    * További kongiruáció (pl. új `id` generálása új könyvek beszúrásához) is ide kerülne.
3. Frissítsük az `app.module.ts` fájlt. 
    ```ts
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';

    import { AppComponent } from './app.component';
    import { HttpClientModule }    from '@angular/common/http';

    import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
    import { InMemoryDataService }  from './in-memory-data.service';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
        )
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```
    A fontos rész a következő: 
    ```ts
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
        )
    ```
    * Itt látható, hogy beimportáljuk a saját alkalmazásunkba a `HttpClientModule`-t, mivel ebben található a `HttpClient` service, amit használni fogunk a HTTP kérések elküldésére. Ne felejtsük, hogy egy szolgáltatás használatához a szolgáltatás vagy a saját modulunkban kell legyen, vagy be kell importálnunk az azt definiáló modult. 
    * Beimportáljuk a `HttpClientInMemoryWebApiModule` modult is. Ebben található az in-memory web api szolgáltatás. Az importálásnál a modul nevét kiegészítettük a `forRoot` metódushívással. Ezt úgy kell tekinteni, hogy importálásnál paraméterezzük a modult, egészen pontosan megmondjuk, hogy melyik szolgáltatás osztályt használja az adatbázis kiszolgálására. 

## Adatok lekérése és megjelenítése

Ezután csak egy feladatunk van, kérdezzük le HTTP kéréssel és jelenítsük meg az adatokat. Itt látható az in-memory web api előnye. Ezt a funkciót pont úgy valósítjuk meg, mintha egy valós web apit használnánk, semmilyen in-memory web api-specifikus kódot nem kell írnunk!

A funkciót az `AppComponent`-be tesszük bele:
  

`app.component.ts`
```ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sample-root',
  template: `
    <pre>
      {{books | json}}
    </pre>
  `,
  styles: []
})
export class AppComponent {
  books = [];

  constructor(private http: HttpClient) {
    this.http.get<[]>('/api/books').subscribe(result => this.books = result);
  }
}
```

Látható, hogy a konstruktorban elküldjük a HTTP kérést és a tartalmát beírjuk a `books` property-be. 

A template-ben egyszerű kiírjuk a `books` property-ben tárolt objektumot JSON formátumban. Ehhez a `pre` HTML taget  (ami kód megjelenítésére való), illetve `json` *pipe*-ot használjuk (ami JSON stringé alakítja a `books` értékét, így ez kerül a HTML kódba).

## Az alkalmazás futtatása

```console
$ ng serve
```



