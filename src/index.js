import { Post } from "@models/Post";
import { createAnalytics } from "./info";
import './css/main';
import './scss/index';
import json from './assets/posts';
import imageOne from './assets/img/image_1';
import xmlFile from './assets/foot-menu.xml';
import table from './assets/table.xlsx';

const post = new Post('Webpack post title', imageOne);
const dataMenu = document.querySelector('.foot-menu');

function component() {
    const element = document.createElement('div');

    element.innerHTML = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis similique adipisci voluptatum quisquam rerum consequuntur ducimus delectus ea facere vel natus aut in, odio mollitia ullam voluptatem? Corporis, praesentium maxime!`;

    element.classList.add('hello');

    const myIcon = new Image();
    myIcon.src = imageOne;

    element.appendChild(myIcon);

    return element;
}

document.body.appendChild(component());

let menu = xmlFile.breakfast_menu.food;

let result = menu.map(function (item) {
    return `<h2>${item.name}</h2>`;
}).join(' ');

if (dataMenu) {
    dataMenu.innerHTML = result;
}