import { Elysia } from 'elysia';
import mongoose from 'mongoose';
import ShortUrlModel from './database/schema';
import { config } from 'dotenv';

config();
const PORT = process.env.PORT;

mongoose.connect(`${process.env.db_URL}`,{ 
    autoIndex: true
  }).then(() => {
  console.log("Connected to Mongo Database");
}).catch((err) => {
  console.error(`Error: ${err}`);
});


interface RequestBody {
  fullUrl: string;
}

const app = new Elysia();
  app.get("/", () => {
    return new Response(Bun.file('./public/index.html'))
  })

  .post("/shorter", async ({ body }: { body: RequestBody }) => {  
    const { fullUrl } = body; 

    if (!fullUrl) {
      throw new Error("URL is required!");
    }

    const shorturl = new ShortUrlModel({ fullURL: fullUrl });
    await shorturl.save();
    console.log(shorturl.shortURL);

    return { shortURL: `http://shrt.lnk/${shorturl.shortURL}` };
  })

  .get("/all",()=>{
    const allURLs = ShortUrlModel.find()
    if(!allURLs){
    return 'No urls found!'
    }
    else{
    return `All URLs:\n${allURLs}`
  }})

  .get("/:shorturl", async ({ params }) => {
    const { shorturl } = params;

    const shortUrlDoc = await ShortUrlModel.findOne({ shortURL: shorturl });
    
    if (!shortUrlDoc) {
      return { error: "Short URL not found" };
    }
    
    return `Here is the searched url:${shortUrlDoc.shortURL}`; 
  })
  
  .listen(`${PORT}`,()=>{


    console.log(`Server running on port:${PORT}`);
    
  });



