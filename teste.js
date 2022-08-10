
var data = [],
  k = 2;
for (var i = -25; i < 25; i += k) {
  for (var j = -25; j < 25; j += k) {
    data.push([j ,
                Math.sin(Math.sqrt(j * j + i * i)) / Math.sqrt(j * j + i * i),
                i]);
    data.push([j + k, Math.sin(Math.sqrt((j + k) * (j + k) + i * i)) / Math.sqrt((j + k) * (j + k) + i * i), i]);
    data.push([j + k, Math.sin(Math.sqrt((j + k) * (j + k) + (i + k) * (i + k))) / Math.sqrt((j + k) * (j + k) + (i + k) * (i + k)), (i + k)]);
    data.push([j, Math.sin(Math.sqrt(j * j + (i + k) * (i + k))) / Math.sqrt(j * j + (i + k) * (i + k)), (i + k)]);
  }
}





// Set up the chart
var chart = new Highcharts.Chart({
  chart: {
    renderTo: 'container',
    type: 'polygon3d',
    options3d: {
      enabled: true,
      alpha: 18,
      beta: 28,
      depth: 500,
      viewDistance: 5,
    }
  },


  plotOptions: {
    series: {
      showInLegend: false,
    }
  },
  yAxis: {
    title: null,
    min: -1,
    max: 1
  },
  xAxis: {
    min: -25,
    max: 25,
    gridLineWidth: 1
  },
  zAxis: {
    min: -25,
    max: 25
  },
  series: [{
    data: data
  }]
});


// Add mouse events for rotation
$(chart.container).on('mousedown.hc touchstart.hc', function(eStart) {
  eStart = chart.pointer.normalize(eStart);

  var posX = eStart.chartX,
    posY = eStart.chartY,
    alpha = chart.options.chart.options3d.alpha,
    beta = chart.options.chart.options3d.beta,
    newAlpha,
    newBeta,
    sensitivity = 5; // lower is more sensitive

  $(document).on({
    'mousemove.hc touchmove.hc': function(e) {
      // Run beta
      e = chart.pointer.normalize(e);
      newBeta = beta + (posX - e.chartX) / sensitivity;
      chart.options.chart.options3d.beta = newBeta;

      // Run alpha
      newAlpha = alpha + (e.chartY - posY) / sensitivity;
      chart.options.chart.options3d.alpha = newAlpha;

      chart.redraw(false);
    },
    'mouseup touchend': function() {
      $(document).off('.hc');
    }
  });
});
