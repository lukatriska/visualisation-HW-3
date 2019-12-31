let fullName = "gapminder.csv";

const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

let currYear = 2009;

const getSliderInput = value => {

  currYear = value;

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

    data.forEach(d => {

      colors.push(colorAreas[d.continent]);

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

    // console.log(colors);
    // console.log(maxPop);
    //
    //
    // console.log("fullList", fullList);
    //
    //
    //
    // console.log(points);

    const drawChart = year => {

      let points = Object.keys(fullList).map((key) => fullList[key][year]);
      console.log(year);

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
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    };

    drawChart(currYear);

  })

};

getSliderInput(currYear);

















