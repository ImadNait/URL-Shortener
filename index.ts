import { Elysia, redirect, t } from 'elysia';
import mongoose, { type ConnectOptions } from 'mongoose';
import ShortUrlModel from './database/schema';
const PORT = process.env.PORT || 4000;


mongoose.connect('mongodb://localhost/urlShortener').then(()=>{
    console.log("Connected to Mongo Database");
}).catch((err)=>{
    return `Error:${err}`
})

const app = new Elysia()
.get("/",()=>{
    return new Response(Bun.file('./public/index.html'))
})

.post("/shorter",({body: {url}})=>{
    if(!url){
        throw new Error("URL is required!")
    }
    ShortUrlModel.create({ fullURL: url })
    redirect('/');
    console.log(url);


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