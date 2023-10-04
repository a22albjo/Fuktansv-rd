function Table(props: { data: any }) {
  const { data } = props;

  // Check if data is empty or undefined before rendering the table
  if (!data) {
    return <div>Loading...</div>; // You can customize the loading message here
  }

  // Initialize arrays to store monthly statistics
  const monthlyStats = new Array(12).fill({
    avgTemperature: 0,
    maxTemperature: -Infinity,
    minTemperature: Infinity,
    avgHumidity: 0,
    maxHumidity: -Infinity,
    minHumidity: Infinity,
  });

  // Calculate monthly statistics from the data
  data.forEach((point: any) => {
    const month = new Date(point.date).getMonth();
    monthlyStats[month].avgTemperature += point.x;
    monthlyStats[month].avgHumidity += point.y;
    console.log(monthlyStats[month].avgTemperature);

    if (point.x > monthlyStats[month].maxTemperature) {
      monthlyStats[month].maxTemperature = point.x;
    }
    if (point.x < monthlyStats[month].minTemperature) {
      monthlyStats[month].minTemperature = point.x;
    }
    if (point.y > monthlyStats[month].maxHumidity) {
      monthlyStats[month].maxHumidity = point.y;
    }
    if (point.y < monthlyStats[month].minHumidity) {
      monthlyStats[month].minHumidity = point.y;
    }
  });

  // Calculate averages by dividing the sums by the number of data points for each month
  monthlyStats.forEach((stats, index) => {
    const monthDataPoints = data.filter(
      (point: any) => new Date(point.date).getMonth() === index
    );
    const numDataPoints = monthDataPoints.length;

    if (numDataPoints > 0) {
      stats.avgTemperature /= numDataPoints;
      stats.avgHumidity /= numDataPoints;
    }
  });

  // Define the month names
  const monthNames = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Luftfuktighet snitt</th>
          <th>Luftfuktighet max</th>
          <th>Luftfuktighet min</th>
          <th>Temperatur snitt</th>
          <th>Temperatur max</th>
          <th>Temperatur min</th>
        </tr>
      </thead>
      <tbody>
        {monthlyStats.map((stats, index) => (
          <tr key={index}>
            <td>{monthNames[index]}</td>
            <td>{stats.avgHumidity.toFixed(2)}</td>
            <td>{stats.maxHumidity.toFixed(2)}</td>
            <td>{stats.minHumidity.toFixed(2)}</td>
            <td>{stats.avgTemperature.toFixed(2)}</td>
            <td>{stats.maxTemperature.toFixed(2)}</td>
            <td>{stats.minTemperature.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
