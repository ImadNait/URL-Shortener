import { Document, model, Schema } from "mongoose";

import shortID from "shortid";

interface shortUrl extends Document{
    fullURL:string,
    shortURL:string
}


const shortURLSchem = new Schema<shortUrl>({
    fullURL:{
        type:String,
        required:true
    },
    
    shortURL:{
        type:String,
        required:true,
        default:shortID.generate
    }


})

const ShortUrlModel = model<shortUrl>("ShortUrl", shortURLSchem);
export default ShortUrlModel;