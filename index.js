import './style.css';
import { select, scaleLinear, max, scaleBand, axisLeft, axisBottom } from 'd3';

let values = [];

let url =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    values = data.data;
    console.log(values);
    renderRect(values);
  })
  .catch((error) => {
    console.error('Error fetching JSON:', error);
  });

const width = window.innerWidth;
const height = window.innerHeight;

//const width;
//const height;

const svg = select('svg');
//const width = +svg.attr('width');
//const height = +svg.attr('height');

function renderRect() {
  const margin = { top: 5, right: 160, bottom: 20, left: 50 };
  const innerwidth = width - margin.right - margin.left;
  const innerheight = height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain([0, max(values, (d) => d[1])])
    .range([0, innerwidth]);

  //  console.log(xScale.domain());
  //  console.log(xScale.range());

  const yScale = scaleBand()
    .domain(values.map((d) => d[0]))
    .range([0, innerheight]);

  // console.log(yScale.domain());
  //  console.log(yScale.range());

  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  g.append('g').call(axisLeft(yScale));
  g.append('g')
    .call(axisBottom(xScale))
    .attr('transform', `translate(0,${innerheight})`);

  g.append('text').attr('x', 150).attr('y', 250).text('United States GDP');

  g.selectAll('rect')
    .data(values)
    .enter()
    .append('rect')
    .attr('y', (d) => yScale(d[0]))
    .attr('width', (d) => xScale(d[1]))
    .attr('height', yScale.bandwidth())
    .attr('class', 'bar');
}


