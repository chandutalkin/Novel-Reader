const mysql = require('mysql');
const util = require('util');
// Create MYSQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  port: '3306',
  database: 'sampleProjectData'
})
//implement try catch for all the await queries for possible error scenarios
connection.connect();
const query = util.promisify(connection.query).bind(connection);
// api for list of novels 
async function getAllNovels(term="", page=1){
    console.log(term, page)
    page = parseInt(page);
    let start = 0
    let limit = 20
    let pageCount =1;
    if(page >= 1) {
        start = (page-1)*20;
    }

    whereCond = " WHERE id >= 1 " // change it to status = 1 after adding status column
    if(term != "") {
        whereCond += ` AND (title like '%${addslashes(term)}%' || description like '%${addslashes(term)}%')`;
    }

    // get total number of novels 
    let sel = `SELECT count(id) as count FROM Novels ${whereCond}`;
    try{
        let countQuery =  await query(sel);
        if(countQuery){
            pageCount = Math.ceil(countQuery[0].count/limit);
        }
    } catch(err){
        console.log(err);
        throw err;
    }
    
    // Get list of novels per limit
    sel = `SELECT * FROM Novels ${whereCond} limit ${start},${limit}`;
    console.log(sel)
    try{
        const rows =  await query(sel);
        let results = [];
        for(let row of rows) {
            results.push(row);
        }
        return {results: results, pageCount: pageCount};
    } catch(err){
        console.log(err);
        throw err;
    }
    
}
// api for Novel details
async function getNovelContent(slug){
    try{
        // get novel details by slug
        let sel = `SELECT * FROM Novels where slug="${slug}"`;
        const rows =  await query(sel);
        let result = rows[0];

        // get list of chapters for a novel
        sel = `SELECT title,slug FROM NovelChapters where novel_id="${result.id}" && slug IS NOT NULL`;
        let chapters =  await query(sel);
        let chList = []
        for(let chapter of chapters) {
            chList.push(chapter);
        }
        result.chapters = chList;
        return result;
    } catch(err){
        console.log(err);
        throw err;
    }
    
}
// api for chapter content
async function getNovelChapterContent(slug){
    try{
        // get chapter details
       let sel = `SELECT id,novel_id,title,slug,content FROM NovelChapters where slug="${slug}"`;
       console.log(sel)
        let chapters =  await query(sel);
        if(chapters.length > 0) {
            // get novel details
            sel = `SELECT id,title,slug,description FROM Novels where id="${chapters[0]['novel_id']}"`;
            const rows =  await query(sel);
            let result = rows[0];
            chapters[0]['novel'] = result;
        }
        // get next & previous chapters
        let result = chapters[0];
        sel = `(SELECT id, slug FROM NovelChapters where id < "${result.id}" ORDER BY id DESC limit 1) 
                UNION 
                (SELECT id, slug FROM NovelChapters where id > "${result.id}" ORDER BY id ASC limit 1)`;
        const nextNovels =  await query(sel);
        let id = result.id;
        for(let novel of nextNovels) {
            if(novel.id > id) {
                result.next = novel.slug
            } else {
                result.prev = novel.slug
            }
            console.log(id, novel.id)
            id = novel.id;
        }
        return result;
    } catch(err){
        console.log(err);
        throw err;
    }
    
}
function escapeSpecialChars(str) {
    return str.replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/'/g, "'");
 }
 function addslashes(string) {
    string =  string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
    return escapeSpecialChars(string);
}
module.exports = {
    getAllNovels,
    getNovelContent,
    getNovelChapterContent
}
