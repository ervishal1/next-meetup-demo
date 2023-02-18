import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    if(req.method === 'GET')
    {
        const client = await MongoClient.connect(
            "mongodb://127.0.0.1:27017/meetups?directConnection=true&serverSelectionTimeoutMS=2000"
        );
        try {
            const db = client.db()
            const meetups = await db.collection('meetups').find({}).toArray();
            res.status(200).json(meetups);
        } catch (error) {
            res.status(500).json(error);
        }finally{
            client.close();
        }
    }
}

export default handler;