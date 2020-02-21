Jegyzet formátuma: markdown fájl
Egyszerűen olvashatók bármilyen markdown megjelenítővel, például Visual Studio Code-ba van beépített
Jegyzet megjelenítése diavetítésként:
1. Telepítsük a node alkalmazást: https://nodejs.org/
2. Telepítsük fel a reveal-md alkalmazást (https://github.com/webpro/reveal-md) a következő parancs futtatásával: npm install -g reveal-md
3. Parancssorba adjuk ki a következő parancsot:
reveal-md .\01\ea_01_slides.md --notes-separator "^Jegyzet:"
(vagy adjunk más fájlt, ha nem az első előadást akarjuk futtatni)