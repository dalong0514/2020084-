function myFunc(theObject) {
  theObject.make = 'dalong';
}

var mycar = {make: "Honda", model: "Accord", year: 1998};
var x, y;

x = mycar.make;
myFunc(mycar);
y = mycar.make;

console.log(x);
console.log(y);