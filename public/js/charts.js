new Chart(document.getElementById("genre-chart"), {
  type: 'line',
  data: {
    labels: ['1 AM','2 AM','3 AM','4 AM','5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM','12 AM'],
    datasets: [{
        data: [0,0,0,0,0,0,395,0,0,0,0,512,0,0,80,120,666,0,0,100,0,0,0,0],
        label: "Calories Ingested",
        borderColor: "green",
        fill: true,
      }, {
        data: [0,0,0,0,0,100,-50,0,0,50,0,100,50,0,50,50,100,0,0,100,0,0,0,0],
        label: "Mood",
        borderColor: "blue",
        fill: true,
      }, {
        data: [0,0,0,0,0,-300,0,0,0,-100,0,0,-100,0,0,0,0,0,0,-650,0,0,0,0],
        label: "Calories Burned",
        borderColor: "red",
        fill: true,
      },
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Calories Ingested, Calories Burned, and Mood: Daily'
    }
  }
});
