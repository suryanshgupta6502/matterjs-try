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

import decomp from "poly-decomp";
window.decomp = decomp;



// Create engine and world
const engine = Engine.create();
const world = engine.world;
engine.gravity.y = 1; // Earth-like gravity


// DOM element
// const boxDiv = document.getElementById(".head");
// console.log(boxDiv);


// Create a box body
// const boxBody = Bodies.rectangle(100, 100, boxDiv.clientWidth, boxDiv.clientHeight * 2, {
//     restitution: 1,
// });



// Create a static ground
const ground = Bodies.rectangle(100, (window.innerHeight + (10 / 2)), 600, 10, {
    isStatic: true
});

World.add(world, ground);



// const path = document.querySelector(".svg"); // use id from SVG
// console.log(path);
// const vertices = Svg.pathToVertices(path); // 20 = precision
// console.log(vertices);
// const armBody = Bodies.fromVertices(200, 200, vertices);
// World.add(world, armBody);

const svg = document.querySelector(".svg")
const bodies = []


const svghead = document.querySelector(".svg-1")
// console.log(svghead);
const svgheadbody = Bodies.fromVertices(10, 10,
    Svg.pathToVertices(svghead),
    { render: { fillStyle: "red", }, restitution: 1 }
);
// console.log(svgheadbody);
World.add(world, svgheadbody)



// svg.querySelectorAll("path").forEach(each => {

//     // console.log(each.getAttribute("d"));

//     const body = Bodies.fromVertices(150, 150, Svg.pathToVertices(each, 25), {
//         // render: { fillStyle: "red" }
//     });


//     // var v = Bodies.fromVertices(500, 80, Svg.pathToVertices(each),
//     //     {
//     //         render: {
//     //             fillStyle: "red",
//     //             strokeStyle: "black"
//     //         }
//     //     },
//     //     true
//     // );
//     if (body) {
//         bodies.push(body)
//         World.add(world, body)
//     }
//     console.log(body);

// })




// Run the engine
// const runner = Runner.create();
// Runner.run(runner, engine);



// Animate DOM
const timeStep = 800 / 60;
function update() {

    Engine.update(engine, timeStep)

    // console.log(bodies);

    // bodies.forEach((each, i) => {
    //     console.log(each);
    //     const div = document.querySelector(`.svg-${i + 1}`)
    //     console.log(`.svg-${i + 1}`, div);

    //     if (!div) {
    //         return
    //     }
    //     // console.log(i, each);
    //     div.style.left = each.position.x

    // })

    // console.log(svgheadbody.position);
    svghead.style.transform = `translate(${svgheadbody.position.x}px, ${svgheadbody.position.y}px)`


    // console.log(document.querySelector(`.svg1`).style.left);


    // console.log(svg.style.left);

    // Update div position (center -> top-left)
    // boxDiv.style.left = (boxBody.position.x - 50) + "px";
    // boxDiv.style.top = (boxBody.position.y) + "px";


    // svg.style.left = (boxBody.position.x - 50) + "px";
    // svg.style.top = (boxBody.position.y) + "px";


    // boxDiv.style.transform = `rotate(${boxBody.angle}rad)`;

    requestAnimationFrame(update);
}

update();