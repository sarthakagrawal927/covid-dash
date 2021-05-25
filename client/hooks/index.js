export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getDataFixed(data) {
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
  return statewise_array;
}

export function getChartnMapData(statewise_array) {
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
  return { labels, dataFields, colors, MapData };
}
