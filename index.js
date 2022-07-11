const svg = d3.select("svg");

d3.json("menu.json").then((data) => {
  const max = d3.max(data, (d) => d.orders);

  // Create margin and dimentions
  const margin = { top: 20, bottom: 100, left: 100, right: 20 };
  const graphWidth = 600 - margin.left - margin.right;
  const graphHeight = 600 - margin.top - margin.bottom;

  const graph = svg
    .append("g")
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xAixGroup = graph
    .append("g")
    .attr("transform", `translate(0,${graphHeight})`);
  const yAixGroup = graph.append("g");

  const y = d3.scaleLinear().domain([0, max]).range([graphHeight, 0]);
  const x = d3
    .scaleBand()
    .domain(data.map((item) => item.name))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  const rects = graph.selectAll("rect").data(data);

  rects
    .attr("width", x.bandwidth)
    .attr("height", (d) => y(d.orders))
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.orders));

  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.orders));

  // Create and call axis
  const xAxis = d3.axisBottom(x);

  const yAxis = d3
    .axisLeft(y)
    .ticks(3)
    .tickFormat((d) => d + " orders");

  xAixGroup.call(xAxis);
  yAixGroup.call(yAxis);

  xAixGroup
    .selectAll("text")
    .attr("transform", "rotate(-40)")
    .attr("text-anchor", "end")
    .attr("fill", "blue");
});

// d3.json("./planets.json").then((data) => {
//   const circs = svg.selectAll("circle").data(data);

//   // Add attrs to cirsc already in DOM

//   circs
//     .attr("cy", 200)
//     .attr("cx", (d) => d.distance)
//     .attr("r", (d) => d.radius)
//     .attr("fill", (d) => d.fill);

//   circs
//     .enter()
//     .append("circle")
//     .attr("cy", 200)
//     .attr("cx", (d) => d.distance)
//     .attr("r", (d) => d.radius)
//     .attr("fill", (d) => d.fill);
// });
