import Head from "next/head";
import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { IndiaMap } from "../components/IndiaMap";
import { StateChart } from "../components/StateChart";
import { Pie, Bar } from "react-chartjs-2";
import { getRandomColor, getDataFixed, getChartnMapData } from "../hooks";

export default function Home({
  statewise_array,
  labels,
  dataFields,
  colors,
  MapData,
}) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Number of cases",
        data: dataFields,
        backgroundColor: colors,
        hoverOffset: 6,
      },
    ],
  };

  return (
    <>
      {statewise_array.map((state, index) => {
        return (
          <React.Fragment key={index}>
            {index < statewise_array.length - 1 && (
              <>
                <h2 key={index}>
                  {state[0].state} : {state[0].active}
                </h2>
                <StateChart districts={state[0].district} colors={colors} />
              </>
            )}
          </React.Fragment>
        );
      })}

      <Pie data={data} />
      <Bar data={data} />
      <IndiaMap mapData={MapData} />
    </>
  );
}

export async function getStaticProps() {
  const headers = {
    "x-rapidapi-key": "9e8b1f3c3dmshcc4d917f45ff1aap16a18djsnadc41f41d89f",
    "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
  };
  const res = await fetch(
    "https://corona-virus-world-and-india-data.p.rapidapi.com/api_india",
    { headers },
  );

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  const statewise_array = getDataFixed(data);
  const { labels, dataFields, colors, MapData } =
    getChartnMapData(statewise_array);

  return {
    props: { statewise_array, labels, dataFields, colors, MapData }, // will be passed to the page component as props
  };
}

// Showing all districts
{
  /* {state[0].district.map((district, index) => {
              return (
                <p key={index}>
                  {district[0].district} : {district[0].active}
                </p>
              );
            })} */
}
