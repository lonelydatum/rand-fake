import * as d3 from "d3";

class PieD3 {
	constructor(node) {
		this.node = node
		this.width = 960;
		this.height = 500;
		this.radius = Math.min(this.width, this.height) / 2;

		this.color = d3.scaleOrdinal()
		    .range(["red", "blue", "yellow", "green", "#a05d56", "#d0743c", "#ff8c00"]);

		this.arc = d3.arc()
		    .outerRadius(this.radius)
		    .innerRadius(0);

		this.labelArc = d3.arc()
		    .outerRadius(this.radius)
		    .innerRadius(this.radius-200);

		this.pie = d3.pie()
		    .sort(null)
		    .value( d => d.percent );
	}

	create(data) {
		while (this.node.firstChild) {
		    this.node.removeChild(this.node.firstChild);
		}

		var svg = d3.select( this.node )
		var g = svg.selectAll(".arc")
		      	.data( this.pie(data))
		    	.enter().append("g")
		      	.attr("class", "arc");

		g.append("path")
		    .attr("d", this.arc)
		    .style("fill", d => this.color(d.data.label) );


		g.append("text")
      		.attr("transform", d => "translate(" + this.labelArc.centroid(d) + ")" )
      		.attr("dy", ".35em")
      		.text( d => d.data.label );
	}
}

export default PieD3