const express = require('express')
var cors = require('cors');
const db = require("./db");
const app = express()
const port = 8080

app.use(cors());
// api for novels
app.get('/novels', async(req, res) => {
    console.log(req.query);
    let result = await db.getAllNovels(req.query.term, req.query.page);
    res.send(result)
})
// api for novel chapter
app.get('/novels/:slug/:chapter', async(req, res) => {
    console.log(req.params)
    let result = await db.getNovelChapterContent(req.params.chapter);
    res.send(result)
})
// api for novel based on slug
app.get('/novels/:slug', async(req, res) => {
    console.log(req.params, 'slug')
    let result = await db.getNovelContent(req.params.slug);
    res.send(result)
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})