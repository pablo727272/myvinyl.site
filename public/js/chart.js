console.log('Hello world from /js/chart.js');

// daily check progress chart...  very unhappy (-100), unhappy (-50), okay (0), happy (50), very happy (100)

new Chart(document.getElementById("line-chart-today"), {
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

// function adddata(){
//
// }

// weekly check progress chart

new Chart(document.getElementById("line-chart-this-week"), {
  type: 'line',
  data: {
    labels: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    datasets: [{
        data: [1680,2300,1972,1911,1768,2040,1862],
        label: "Calories Ingested",
        borderColor: "green",
        fill: true
      }, {
        data: [750,100,680,250,660,-200,-100],
        label: "Mood",
        borderColor: "blue",
        fill: true
      }, {
        data: [-680,-300,-972,-511,-768,-140,-262],
        label: "Calories Burned",
        borderColor: "red",
        fill: true
      },
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Calories Ingested, Calories Burned, and Mood: Weekly Average'
    }
  }
});


// function adddata(){
// 	myLineChart.data.datasets[0].data[7] = 60;
//   myLineChart.data.labels[7] = "Newly Added";
//   myLineChart.update();
// }
//
// var option = {
// 	showLines: true
// };
// var myLineChart = Chart.Line(canvas,{
// 	data:data,
//   options:option
// });

// This corresponds with lines 80 and 81 of check-progress.html
// input type="button" value="Add Data" onclick="adddata()">
// to add a button c/o https://jsfiddle.net/red_stapler/u5aanta8/1/
