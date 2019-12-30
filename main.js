let fullName = "gapminder.csv";

const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

d3.csv(fullName, data => {

  let fullList = {};

  let years = [];

  let colorAreas = {
    Americas: 'rgb(127, 235, 0)',
    Europe: 'rgb(255, 231, 0)',
    Africa: 'rgb(0, 213, 233)',
    Asia: 'rgb(255, 88, 114)'
  };


  let colors = [];

  let minPop, maxPop = 0;

  data.forEach(d => {
    // if (d.year === "2009") {
    //
    // }

    colors.push(colorAreas[d.continent]);

    if (maxPop === 0) {
      maxPop = d.pop
    } else if (maxPop < d.pop) {
      maxPop = d.pop;
    }

    if (d.country in fullList) {

      fullList[d.country][d.year] = {
        "x": parseInt(d.gdpPerCap),
        "y": parseInt(d.lifeExp),
        "r": parseInt(d.pop) / 10000000
      };
    } else {
      fullList[d.country] = {};
      fullList[d.country][d.year] = {
        "x": parseInt(d.gdpPerCap),
        "y": parseInt(d.lifeExp),
        "r": parseInt(d.pop) / 10000000
      };
    }


    let currYear = new Date(d.year).getFullYear();

    // get the list of years
    if (!years.includes(currYear)) {
      years.push(currYear)
    }
  });

  console.log(colors);
  console.log(maxPop);


  console.log("fullList", fullList);

  let points = Object.keys(fullList).map((key) => fullList[key][2012]);


  console.log(points);

  // years = years.sort((a, b) => a - b);

  let bubbleChart = new Chart(document.getElementById('myChart1'), {
    type: 'bubble',

    data: {
      datasets: [
        {
          data: points,
          backgroundColor: colors
        }
      ],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: 10,
            max: 100
          },
          scaleLabel: {
            display: true,
            labelString: 'Life expectancy, years'
          }
        }],
        xAxes: [{
          type: 'logarithmic',
          ticks: {
            max: 100000,
            callback: value => [300, 500, 1000, 5000, 10000].indexOf(value) === -1 ? '' : value
          },
          scaleLabel: {
            display: true,
            labelString: 'GDP per capita'
          }
        }]
      },
      title: {
        display: true,
        text: 'Gap Minder'
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            console.log(tooltipItem);
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });


});


















