import { Elysia, t } from "elysia"
const PORT = process.env.PORT || 4000;
const app = new Elysia()
.get("/",()=>{
    return new Response(Bun.file('./public/index.html'))
})
.post("/shorter",({body})=>{

return"short URL"

}, {
    body:t.Object({
        url:t.String()
    })
})
.get("/shorter/:id",({params})=>{
    return "shorten url"
})
.get("/short/url",(url)=>{
    return {url}
})








.listen(PORT)
console.log(`Server running on port: ${PORT}`)