// Import all images
import burgerImg from "../images/burger.png";
import icecreamImg from "../images/icecream.png";
import icecream1Img from "../images/icecream1.png";
import kebabImg from "../images/kebab.png";
import pizzaImg from "../images/pizza.png";
import saladImg from "../images/salad.png";
import waterImg from "../images/water.png";

// Export the function
export function getData() {
  return [
    { id: 1, title: "Burger", price: 9.99, image: burgerImg },
    { id: 2, title: "Ice Cream", price: 50.99, image: icecreamImg },
    { id: 3, title: "Ice Cream1", price: 60.99, image: icecream1Img },
    { id: 4, title: "Kebab", price: 120.99, image: kebabImg },
    { id: 5, title: "Pizza", price: 200.99, image: pizzaImg },
    { id: 6, title: "Salad", price: 230.99, image: saladImg },
    { id: 7, title: "Water", price: 20.99, image: waterImg },
  ];
}