import Head from "next/head";
import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { IndiaMap } from "../components/IndiaMap";
import { Pie, Doughnut, Bar } from "react-chartjs-2";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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
      },
    ],
  };
  return (
    <>
      {statewise_array.map((state, index) => {
        return (
          <React.Fragment key={index}>
            <h2 key={index}>
              {state[0].state} : {state[0].active}
            </h2>
            {state[0].district.map((district, index) => {
              return (
                <p key={index}>
                  {district[0].district} : {district[0].active}
                </p>
              );
            })}
          </React.Fragment>
        );
      })}
      <Pie data={data} />
      <Doughnut data={data} />
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

  const statewise = data.state_wise;
  const statewise_array = Object.entries(statewise);
  for (let i = 0; i < statewise_array.length; i++) {
    statewise_array[i][1]["state"] = statewise_array[i][0];

    statewise_array[i].shift();

    statewise_array[i][0].district = Object.entries(
      statewise_array[i][0].district,
    );

    for (let j = 0; j < statewise_array[i][0].district.length; j++) {
      statewise_array[i][0].district[j][1]["district"] =
        statewise_array[i][0].district[j][0];
      statewise_array[i][0].district[j].shift();
    }
  }

  let labels = [];
  let dataFields = [];
  let colors = [];
  let MapData = [];

  for (let i = 0; i < statewise_array.length - 1; i++) {
    labels.push(statewise_array[i][0].state);
    dataFields.push(statewise_array[i][0].active);
    colors.push(getRandomColor());

    if (statewise_array[i][0].statecode === "OR")
      statewise_array[i][0].statecode = "OD";
    else if (statewise_array[i][0].statecode === "TG")
      statewise_array[i][0].statecode = "TS";
    else if (statewise_array[i][0].statecode === "UT")
      statewise_array[i][0].statecode = "UK";

    MapData.push({
      id: statewise_array[i][0].statecode,
      state: statewise_array[i][0].state,
      value: statewise_array[i][0].active,
    });
  }
  console.log(MapData);

  return {
    props: { statewise_array, labels, dataFields, colors, MapData }, // will be passed to the page component as props
  };
}
