import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb://127.0.0.1:27017/meetups?directConnection=true&serverSelectionTimeoutMS=2000"
    );
    try {
      const db = client.db();
      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.insertOne({
        title: title,
        image: image,
        address: address,
        description: description,
      });
      res.status(201).json({ message : "Record inserted!", result});
    } catch (error) {
        res.status(500)
    }finally {
        client.close();
    }

  }
};

export default handler;
