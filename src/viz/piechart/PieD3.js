import * as d3 from "d3";

class PieD3 {
	constructor(node, group, wh) {

		this.group = group
		this.node = node
		this.width = wh.w;
		this.height = wh.h;
		this.radius = Math.min(this.width, this.height) * .4;
		this.colorList = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"]

		this.color = d3.scaleOrdinal()
		    .range(this.colorList);

		this.arc = d3.arc()
		    .outerRadius(this.radius)
		    .innerRadius(0);

		this.labelArc = d3.arc()
		    .outerRadius(this.radius-50)
		    .innerRadius(this.radius-50);

		this.pie = d3.pie()
		    .sort(null)
		    .value( d => d.percent );
	}

	getDegreeByItem_average(id) {
		const gList = this.g._groups[0]
		const result = gList.find(item => item.__data__.data.id===id)
		const distance = result.__data__.endAngle - result.__data__.startAngle
		const distanceHalf = distance / 2
		const half = result.__data__.startAngle + distanceHalf
		const degrees = half * 180 / Math.PI
		return degrees
	}

	getDegreeByItem_random(id) {
		const gList = this.g._groups[0]
		const result = gList.find(item => item.__data__.data.id===id)
		const distance = result.__data__.endAngle - result.__data__.startAngle
		const rand = Math.random() * distance * .8
		const radians = rand + (result.__data__.startAngle + distance * .1)
		return radians * 180 / Math.PI

	}



	create(data) {

		while (this.group.firstChild) {
		    this.group.removeChild(this.group.firstChild);
		}

		var svg = d3.select( "g" )
		this.g = svg.selectAll(".arc")
		      	.data( this.pie(data))
		    	.enter().append("g")
		      	.attr("class", "arc")
		      	.attr("id", (d)=>`arc${d.index}`);


		this.g.append("path")
		    .attr("d", this.arc)
		    .style("fill", d => {
		    	return this.color(d.data.id)
		    } )
		    // .style("stroke", 'black' );


		this.g.append("text")
      		.attr("transform", d => "translate(" + this.labelArc.centroid(d) + ")" )
      		.attr("dy", ".5em")
      		.attr("dx", "-2em")
      		.style("fill", "white")
      		.text( d => d.data.label );




	}
}

export default PieD3