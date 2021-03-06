var d = (function(){
"use strict";
var d = {
	getD3: function(){
		return window.d3;
	}
	,oBar: function(data,config){
	
	var config = this.validateConfig(config);	
	
	var margin = {top: config.top, right: config.right, bottom: config.bottom, left: config.left},
    
    width = config.width - margin.left - margin.right,
    height = config.height - margin.top - margin.bottom;

	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(10);

	var svg = d3.select("body").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


		  x.domain(data.map(function(d) { return d[0]; }));
		  y.domain([0, d3.max(data, function(d) { return d[1]; })]);

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis);

		  svg.append("g")
		      .attr("class", "y axis")
		      .call(yAxis)
		    .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text(config.label);

		  /*Grafico las rectas */
		  svg.selectAll(".bar")
		      .data(data)
		    .enter().append("rect")
		      .attr("class", "bar")
		      .attr("x", function(d) { return x(d[0]); })
		      .attr("width", x.rangeBand())
		      .attr("y", function(d) { return y(d[1]); })
		      .attr("height", function(d) { return height - y(d[1]); })
		      .attr('fill',config.color)
		      .on('mouseover', function(){
		      	d3.select(this).attr('fill',config.hoverColor);
		      })
		      .on('mouseout', function(){
		      	d3.select(this).attr('fill',config.color);
		      });;


	}
	,validateConfig: function(config){
		return config;
	}
}
return d;
})();
