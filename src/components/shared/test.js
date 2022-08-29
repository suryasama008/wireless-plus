var arr = [
  {
    id: 1,
    name: "surya",
  },
  {
    id: 2,
    name: "sama",
  },
];
var obj = {
  name: "surya",
  lname: "sama",
};
function text({ name, lname }) {
  return `This is a text of name ${name} and last name ${lname}.`;
}
console.log(text(obj));
