import React,{Fragment} from "react";
import MeetupDetails from "../../components/meetups/MeetupDetails";
import Head from 'next/head'

const MeetupDetail = (props) => {
  const meetup = props.meetupData;

  return (
    <Fragment>
    <Head>
        <title>{meetup.title}</title>
        <meta 
            name="description"
            content={meetup.description}
        />
      </Head>
    <MeetupDetails
      id={meetup.id}
      title={meetup.title}
      image={meetup.image}
      address={meetup.address}
      description={meetup.description}
    />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/meetupIds", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return {
    fallback: false,
    paths: data.map((data) => ({
      params: {
        meetupId: data._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const res = await fetch(`http://localhost:3000/api/meetupById/${meetupId}`);
  const data = await res.json();

  return {
    props: {
      meetupData: {
        id: data._id.toString(),
        title: data.title,
        image: data.image,
        address: data.address,
        description: data.description
      },
    },
  };
}

export default MeetupDetail;
