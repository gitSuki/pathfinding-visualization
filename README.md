<!-- PROJECT LOGO -->
<br />
<h3 align="center"> 🛣 Pathfinding Visualization</h3>
  <p align="center">
    A visualization tool built in Vue for the A* and Dijkstra Algorithms.
    <br />
    <br />
    <a href="https://gitsuki.github.io/pathfinding-visualization/"><strong>Check Out the Demo »</strong></a>
    <br />
    <br />
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About The Project
A* and Dijkstra's algorithm are both graph search algorithms that are used to find the shortest path between two nodes in a graph. The main difference between them is the way they calculate the cost of reaching the goal node.

Dijkstra's Algorithm guarantees the shortest possible path to it's target, it does this by beginning it's search from it's starting node and fully exploring every neighboring node until it reaches it's target. This means that it can be slow when searching over large areas due to the fact it will continue searching even if it's going in the opposite direction of it's target.

A* optimizes on Dijkstra's original algorithm by applying heuristics to first search nodes that are in the direction of it's target which can lead to much faster calculation times than Dijkstra's.

### Motivation
Pathfinding algorithms can be quite confusing to wrap your head around as a beginner. I decided to build this app to help myself more deeply understand how the A* Algorithm and Dijkstra's Algorithm find their optimal path and see the results in action.

### Showcase

![chrome_6OBVWOVnLg](https://user-images.githubusercontent.com/96004796/216793725-446d4638-c67f-4371-bea9-4bf362e2ffe7.gif)
![chrome_jlXlERBqnl](https://user-images.githubusercontent.com/96004796/216793718-49610e84-aae0-4f52-af83-d28b5ac8ac26.gif)
You can also drag and drop the start/end locations and toggle walls.
![chrome_XI1wPgvB52](https://user-images.githubusercontent.com/96004796/216793771-edd5add7-6432-49bf-bec3-5cbc4b76644b.gif)

### Built With

* [JavaScript](https://www.javascript.com/)
* [Vue](https://github.com/vuejs/vue)
* [Vuex](https://github.com/vuejs/vuex)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Installation

1. Install NPM Packages
 ```sh
 npm install
 ```
2. Run the Development Server
 ```sh
 npm run serve
 ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
