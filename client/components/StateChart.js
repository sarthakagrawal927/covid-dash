import { Pie, Doughnut, Bar } from "react-chartjs-2";

export const StateChart = ({ districts, colors }) => {
  let labels = [];
  let dataFields = [];

  for (let i = 0; i < districts.length; i++) {
    labels.push(districts[i][0].district);
    dataFields.push(districts[i][0].active);
  }
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
      <Pie data={data} />
    </>
  );
};
