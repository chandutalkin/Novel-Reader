import http from "../http-common";
class NovelService {
    async getNovels(term = "", page=1) {
        console.log(term, page)
        let url = "/novels";
        if(page > 1) {
            url+= "?page="+page;
        }
        if(page > 1 && term != "") {
            url += "&term="+term;
        } else if(term != "") {
            url += "?term="+term;
        }
        try {
            let products = await http.get(url);
            if(products.data && products.data.error) {
                console.log(products.data)
            } else {
                return products.data; 
            }
        } catch (e) {
            console.log(e)
        } 
    }
    async getNovelBySlug(slug) {
        try {
        let products = await http.get("/novels/"+slug);
            if(products.data && products.data.error) {
                console.log(products.data)
            } else {
                return products.data; 
            }
        } catch (e) {

        }
    }
    async getChapterBySlug(slug, chapter) {
        try {
        let products = await http.get("/novels/"+slug+"/"+chapter);
            if(products.data && products.data.error) {
                console.log(products.data)
            } else {
                return products.data; 
            }
        } catch (e) {

        }
    }
}
export default new NovelService();