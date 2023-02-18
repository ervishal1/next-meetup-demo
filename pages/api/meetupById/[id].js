import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "GET") {
    let id = req.query.id;
    const client = await MongoClient.connect(
      "mongodb://127.0.0.1:27017/meetups?directConnection=true&serverSelectionTimeoutMS=2000"
    );

    try {
      const db = client.db();
      const meetupCollection = db.collection("meetups");
      const meetups = await meetupCollection.findOne({ _id: new ObjectId(id) });
      res.status(200).json(meetups); 
    } catch (error) {
      res.status(500).json(error);
    } finally {
      client.close();
    }
  }
};

export default handler;
