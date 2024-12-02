import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";

const SankeyDiagramF = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 1100; // Slightly increased width
    const height = 550; // Increased height for better spacing
    const margin = { top: 60, right: 60, bottom: 60, left: 60 }; // Increased margins

    svg.attr("width", width).attr("height", height);

    const colorScale = d3
      .scaleOrdinal()
      .domain([
        "Patients",
        "Male",
        "Female",
        "Ophthalmologist",
        "Neurologist",
        "Wheelchair or Sightloss",
        "Mild Symptoms",
      ])
      .range([
        "#42A5F5", // Bright Blue for Patients
        "#2196F3", // Slightly Darker Blue for Male
        "#F06292", // Bright Pink for Female
        "#9C27B0", // Bright Purple for Ophthalmologist
        "#8D6E63", // Earthy Brown for Neurologist
        "#FFC107", // Bright Amber for Wheelchair or Sightloss
        "#8E24AA", // Deep Purple for Mild Symptoms
      ]);

    const data = {
      nodes: [
        { name: "Patients", value: 100 },
        { name: "Male", value: 35 },
        { name: "Female", value: 65 },
        { name: "Ophthalmologist", value: 35 },
        { name: "Neurologist", value: 65 },
        { name: "Wheelchair or Sightloss", value: 35 },
        { name: "Mild Symptoms", value: 65 },
      ],
      links: [
        { source: 0, target: 1, value: 35 },
        { source: 0, target: 2, value: 65 },
        { source: 1, target: 3, value: 17 },
        { source: 1, target: 4, value: 18 },
        { source: 2, target: 3, value: 18 },
        { source: 2, target: 4, value: 47 },
        { source: 3, target: 5, value: 11 },
        { source: 3, target: 6, value: 24 },
        { source: 4, target: 5, value: 11 },
        { source: 4, target: 6, value: 41 },
      ],
    };

    const sankeyGenerator = sankey()
      .nodeWidth(40)
      .nodePadding(30) // Increased padding for better separation
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ]);

    const { nodes, links } = sankeyGenerator(data);

    const chart = svg.append("g");

    // Gradient for links to add depth
    const defs = svg.append("defs");
    const linkGradient = defs
      .selectAll("linearGradient")
      .data(links)
      .enter()
      .append("linearGradient")
      .attr("id", (d, i) => `linkGradient${i}`)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", (d) => d.source.x1)
      .attr("x2", (d) => d.target.x0);

    linkGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", (d) => colorScale(d.source.name));

    linkGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", (d) => colorScale(d.target.name));

    // Links with improved hover effect
    const linkEnter = chart
      .append("g")
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", sankeyLinkHorizontal())
      .attr("fill", "none")
      .attr("stroke", (d, i) => `url(#linkGradient${i})`)
      .attr("stroke-opacity", 0.5)
      .attr("stroke-width", (d) => Math.max(1, d.width))
      .on("mouseover", function () {
        d3.select(this)
          .attr("stroke-opacity", 0.9)
          .attr("stroke-width", (d) => Math.max(2, d.width * 1.5));
      })
      .on("mouseout", function () {
        d3.select(this)
          .attr("stroke-opacity", 0.5)
          .attr("stroke-width", (d) => Math.max(1, d.width));
      });

    // Nodes with enhanced hover effect
    const node = chart
      .append("g")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    node
      .append("rect")
      .attr("height", (d) => d.y1 - d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("fill", (d) => colorScale(d.name))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("rx", 5) // Added rounded corners
      .attr("ry", 5)
      .on("mouseover", function () {
        d3.select(this)
          .attr("stroke", "#000")
          .attr("stroke-width", 3)
          .attr("opacity", 0.8);
      })
      .on("mouseout", function () {
        d3.select(this)
          .attr("stroke", "#fff")
          .attr("stroke-width", 2)
          .attr("opacity", 1);
      });

    node
      .append("text")
      .attr("x", (d) => (d.x1 - d.x0) / 2)
      .attr("y", (d) => (d.y1 - d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => `${d.name}: ${d.value}%`)
      .attr("fill", "#000")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("pointer-events", "none"); // Prevents text from interfering with hover

    // Add title to the chart
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Patient Demographics and Healthcare Provider Distribution");
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default SankeyDiagramF;
