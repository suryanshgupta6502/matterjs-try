import {
    Engine,
    Render,
    Runner,
    World,
    Bodies,
    Body,
    Events,
    Svg
} from "matter-js";



// Create engine and world
const engine = Engine.create();
const world = engine.world;
engine.gravity.y = 1; // Earth-like gravity


// DOM element
const boxDiv = document.getElementById("box");
console.log(boxDiv);


// Create a box body
const boxBody = Bodies.rectangle(100, 100, boxDiv.clientWidth, boxDiv.clientHeight * 2, {
    restitution: 1,
});



// Create a static ground
const ground = Bodies.rectangle(100, (window.innerHeight + (10 / 2)), 600, 10, {
    isStatic: true
});



const path = document.querySelector(".body"); // use id from SVG
console.log(path);
const vertices = Svg.pathToVertices(path, 20); // 20 = precision

const armBody = Bodies.fromVertices(200, 200, vertices);
World.add(world, armBody);



// document.querySelector("#svg").querySelectorAll("path").forEach(each => {

//     console.log(each.getAttribute("d"));
//     var v = Bodies.fromVertices(
//         500,
//         80,
//         Svg.pathToVertices(each),
//         {
//             render: {
//                 fillStyle: "red",
//                 strokeStyle: "black"
//             }
//         },
//         true
//     );
//     console.log(v);
//     // vertexSets.push(v);
// })

// console.log(svg);

// .find("path")
// .each(function (i, path) {
//     var v = Bodies.fromVertices(
//         500,
//         80,
//         Svg.pathToVertices(path, 5),
//         {
//             render: {
//                 fillStyle: color,
//                 strokeStyle: color
//             }
//         },
//         true
//     );
//     console.log(v);
//     vertexSets.push(v);
//     // World.add(engine.world, v);
// });



World.add(world, [boxBody, ground]);


// Run the engine
// const runner = Runner.create();
// Runner.run(runner, engine);



// Animate DOM
const timeStep = 800 / 60;
function update() {

    Engine.update(engine, timeStep)

    // Update div position (center -> top-left)
    boxDiv.style.left = (boxBody.position.x - 50) + "px";
    boxDiv.style.top = (boxBody.position.y) + "px";
    // boxDiv.style.transform = `rotate(${boxBody.angle}rad)`;

    requestAnimationFrame(update);
}

update();