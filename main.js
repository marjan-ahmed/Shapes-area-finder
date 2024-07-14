#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
class Shape {
    constructor(name) {
        this.name = name;
    }
    calculateArea() {
        return 0;
    }
    displayArea() {
        console.log(chalk_1.default.yellow.bold(`Area of ${this.name}: ${this.calculateArea()}`));
    }
}
class Square extends Shape {
    constructor(side, name) {
        super(name);
        this.side = side;
    }
    calculateArea() {
        return this.side * this.side;
    }
}
class Circle extends Shape {
    constructor(radius, name) {
        super(name);
        this.radius = radius;
    }
    calculateArea() {
        return Math.PI * this.radius * this.radius;
    }
}
class Rectangle extends Shape {
    constructor(length, width, name) {
        super(name);
        this.length = length;
        this.width = width;
    }
    calculateArea() {
        return this.length * this.width;
    }
}
const promptUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = yield inquirer_1.default.prompt({
        name: "shape",
        type: "list",
        message: "Select the Shape:",
        choices: [
            { name: "Square", value: "sq" },
            { name: "Circle", value: "cr" },
            { name: "Rectangle", value: "rt" }
        ]
    });
    let shape = null;
    switch (userInput.shape) {
        case "sq":
            const squareResponse = yield inquirer_1.default.prompt({
                name: "side",
                type: "input",
                message: "Enter the side length of the square:",
                validate: (value) => {
                    const parsed = parseFloat(value);
                    return !isNaN(parsed) && parsed > 0;
                }
            });
            shape = new Square(parseFloat(squareResponse.side), "Square");
            break;
        case "cr":
            const circleResponse = yield inquirer_1.default.prompt({
                name: "radius",
                type: "input",
                message: "Enter the radius of the circle:",
                validate: (value) => {
                    const parsed = parseFloat(value);
                    return !isNaN(parsed) && parsed > 0;
                }
            });
            shape = new Circle(parseFloat(circleResponse.radius), "Circle");
            break;
        case "rt":
            const rectangleResponse = yield inquirer_1.default.prompt({
                name: "length",
                type: "input",
                message: "Enter the length of the rectangle:",
                validate: (value) => {
                    const parsed = parseFloat(value);
                    return !isNaN(parsed) && parsed > 0;
                }
            });
            const rectangleWidthResponse = yield inquirer_1.default.prompt({
                name: "width",
                type: "input",
                message: "Enter the width of the rectangle:",
                validate: (value) => {
                    const parsed = parseFloat(value);
                    return !isNaN(parsed) && parsed > 0;
                }
            });
            shape = new Rectangle(parseFloat(rectangleResponse.length), parseFloat(rectangleWidthResponse.width), "Rectangle");
            break;
        default:
            console.log(chalk_1.default.red("Invalid choice."));
            break;
    }
    if (shape) {
        shape.displayArea();
    }
});
promptUser();
