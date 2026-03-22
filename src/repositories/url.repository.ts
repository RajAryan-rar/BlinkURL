import {Url,IUrl} from "../models/Url"

export interface CreateUrl{
    originalUrl: string
    shortUrl: string
}

export interface UrlStats {
    id : string
    originalUrl : string
    shortUrl : string
    clicks : number 
    createdAt : Date
    updatedAt : Date
}

export class UrlRepository {
    async create(data : CreateUrl) : Promise<IUrl> {
        const url = new Url(data);
        return await url.save();
    }

    async findByShortUrl(shortUrl: string) : Promise<IUrl | null> {
        const url = await Url.findOne({shortUrl});
        if(!url) return null;
        return url;
    }

    async findAll() : Promise<UrlStats[]> {
        const urls = await Url.find().select({
            _id : 1,
            originalUrl : 1,
            shortUrl : 1,
            clicks : 1,
            createdAt : 1,
            updatedAt : 1
        }).sort({createdAt : -1})
        
        return urls.map(url => ({
            id : url._id?.toString() || "",
            originalUrl : url.originalUrl,
            shortUrl : url.shortUrl,
            clicks : url.clicks,
            createdAt : url.createdAt,
            updatedAt : url.updatedAt
        }));
    }

    async incrementClicks(shortUrl: string) : Promise<void> {
        await Url.findOneAndUpdate(
            {shortUrl},
            {$inc : {clicks: 1}}
        );
        return;
    }

    async findStatsByShortUrl(shortUrl: string) : Promise<UrlStats | null> {
        const url = await Url.findOne({shortUrl}).select({
            _id : 1,
            originalUrl : 1,
            shortUrl : 1,
            clicks : 1,
            createdAt : 1,
            updatedAt : 1
        });
        if(!url) return null;

        return {
            id : url._id?.toString() || '',
            originalUrl : url.originalUrl,
            shortUrl : url.shortUrl,
            clicks : url.clicks,
            createdAt : url.createdAt,
            updatedAt : url.updatedAt
        }
    }
}