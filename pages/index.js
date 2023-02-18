import {Fragment} from 'react';
import MeetupList from "@/components/meetups/MeetupList";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta 
            name="description"
            content="Browse a huge list of highly active React Meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/meetups");
  const data = await res.json();
  return {
    props: {
      meetups: !data
        ? []
        : data.map((data) => ({
            title: data.title,
            image: data.image,
            address: data.address,
            id: data._id.toString(),
          })),
    },
    revalidate: 1,
  };
}

export default HomePage;
