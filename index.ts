import { Elysia, redirect } from 'elysia';
import mongoose from 'mongoose';
import ShortUrlModel from './database/schema';
const PORT = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost:27017/URL/url',{ 
    autoIndex: true
  }).then(() => {
  console.log("Connected to Mongo Database");
}).catch((err) => {
  console.error(`Error: ${err}`);
});

interface RequestBody {
  fullUrl: string;
}

const app = new Elysia()
  .get("/", () => {
    return new Response(Bun.file('./public/index.html'))
  })

  .post("/shorter", async ({ body }: { body: RequestBody }) => {  // Type the body here
    const { fullUrl } = body;  // Now TypeScript knows fullUrl exists

    if (!fullUrl) {
      throw new Error("URL is required!");
    }

    const shorturl = new ShortUrlModel({ fullURL: fullUrl });
    await shorturl.save();
    console.log(shorturl.shortURL);

    return { shortURL: `http://localhost:4000/${shorturl.shortURL}` };
  })

  .get("/:shorturl", async ({ params }) => {
    const { shorturl } = params;

    const shortUrlDoc = await ShortUrlModel.findOne({ shortURL: shorturl });
    
    if (!shortUrlDoc) {
      return { error: "Short URL not found" };
    }
    
    return redirect(shortUrlDoc.fullURL);  // Proper redirection
  })
  
  .listen(PORT);

console.log(`Server running on port: ${PORT}`);
