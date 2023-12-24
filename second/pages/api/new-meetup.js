import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      // this won't run on client side so writing credentials here is fine meetups: db name here
      "mongodb+srv://nextjs-mongodb:qwertY1@cluster0.rvwo948.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    // meetups: collection name here can have same name as the db
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
