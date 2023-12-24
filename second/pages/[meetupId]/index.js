import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

// if page is dynamic and using getStaticProps /- then use this
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    // this won't run on client side so writing credentials here is fine meetups: db name here
    "mongodb+srv://nextjs-mongodb:qwertY1@cluster0.rvwo948.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  // meetups: collection name here can have same name as the db
  const meetupsCollection = db.collection("meetups");

  // Fetches all documents in the 'meetupsCollection' but only retrieves the '_id' field for each document.
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // won't show page unless it is ready
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    // this won't run on client side so writing credentials here is fine meetups: db name here
    "mongodb+srv://nextjs-mongodb:qwertY1@cluster0.rvwo948.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  // meetups: collection name here can have same name as the db
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
