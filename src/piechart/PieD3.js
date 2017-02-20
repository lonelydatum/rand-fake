import * as d3 from "d3";

class PieD3 {
	constructor(node) {
		this.node = node
		this.width = 500;
		this.height = 500;
		this.radius = Math.min(this.width, this.height) / 2;
		this.radius = 200

		this.color = d3.scaleOrdinal()
		    .range(["red", "blue", "yellow", "green", "#a05d56", "#d0743c", "#ff8c00"]);

		this.arc = d3.arc()
		    .outerRadius(this.radius)
		    .innerRadius(0);

		this.labelArc = d3.arc()
		    .outerRadius(this.radius)
		    .innerRadius(this.radius+20);

		this.pie = d3.pie()
		    .sort(null)
		    .value( d => d.percent );
	}

	getItem(id) {
		const gList = this.g._groups[0]
		const result = gList.find(item => item.__data__.data.id===id)
		const distance = result.__data__.endAngle - result.__data__.startAngle
		const distanceHalf = distance / 2
		const half = result.__data__.startAngle + distanceHalf
		const degrees = half * 180 / Math.PI
		return degrees
	}

	create(data) {

		while (this.node.firstChild) {
		    this.node.removeChild(this.node.firstChild);
		}

		var svg = d3.select( this.node )
		this.g = svg.selectAll(".arc")
		      	.data( this.pie(data))
		    	.enter().append("g")
		      	.attr("class", "arc");

		this.g.append("path")
		    .attr("d", this.arc)
		    .style("fill", d => {
		    	return this.color(d.data.label)
		    } )
		    .style("stroke", 'black' );


		this.g.append("text")
      		.attr("transform", d => "translate(" + this.labelArc.centroid(d) + ")" )
      		.attr("dy", ".35em")
      		.text( d => d.data.label );




	}
}

export default PieD3