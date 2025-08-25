// My first Node.js script with variables, types and operators
let studentName = "Karan";   // string
let marks = 72;              // number
let hasSubmitted = true;     // boolean

let extraMarks = 5;
let finalMarks = marks + extraMarks;   // arithmetic operator

console.log("Student: " + studentName);
console.log("Marks: " + marks);
console.log("Has Submitted: " + hasSubmitted);
console.log("Final Marks after bonus: " + finalMarks);

// comparison operator with if-else
if (finalMarks >= 50) {
  console.log("Result: Pass");
} else {
  console.log("Result: Fail");
}
