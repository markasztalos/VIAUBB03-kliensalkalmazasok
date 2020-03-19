import { IBook } from "./models";
import express from 'express';
import bodyParser from "body-parser";

const books: IBook[] = [
    {
        "isbn": "9786155248214", "title": "Egri csillagok",
        "author": "Gárdonyi Géza"
    },
    {
        "isbn": "9789639555054", "title": "A kőszívű ember fiai",
        "author": "Jókai Mór"
    },
    {
        "isbn": "9789630980746", "title": "Fekete gyémántok",
        "author": "Jókai Mór"
    }
];

export function startLibraServer() {
    const app: express.Application = express();
    
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE")
        next();
    });
    app.use(bodyParser.json())

    app.get('/', (req, res) => res.send('Libra server'));

    app.get('/books', (req, res) => {
        console.log('get books');
        res.json(books)
    });
    app.get('/books/:isbn', (req, res) => {
        let isbn = req.params.isbn;
        console.log(`get book ${isbn}`);
        let book = books.find(b => b.isbn === isbn);
        res.json(book);
    });

    app.post('/books', (req, res) => {
        let body : IBook = req.body;
        console.log(body);
        console.log(`creating new book, isbn: ${body.isbn}, title: ${body.title}, author: ${body.author}`);
        let existingBook = books.find(b => b.isbn === body.isbn);
        if (existingBook) {
            console.log(" --> book already exists");
            res.status(400).end();
            return;
        }
        books.push({
            isbn: body.isbn,
            title: body.title,
            author: body.author,
        });
        res.status(200).end();
    });
    app.put('/books/:isbn', (req, res) => {
        let body = req.body as IBook;
        console.log(`updating book ${body.isbn}`);
        let existingBook = books.find(b => b.isbn === body.isbn);
        if (!existingBook) {
            console.log(" --> book does not exists")
            res.status(400).end();
            return;
        }
        existingBook.title = body.title;
        existingBook.author = body.author;
        res.status(200).end();
    })
    app.delete('/books/:isbn', (req, res) => {
        let isbn = req.params.isbn;
        console.log(`deleting book ${isbn}`);
        let existingBook = books.find(b => b.isbn === isbn);
        if (!existingBook) {
            console.log(" --> book does not exists")
            res.status(400).end();
            return;
        }
        let index = books.indexOf(existingBook);
        books.splice(index, 1);
        res.status(200).end();
    });


    app.listen(3000, function () {
        console.log('Libra server listening on port 3000!');
    });
}