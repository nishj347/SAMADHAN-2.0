// Day 3 - Arrays & Objects

const students = [
  { name: "nissie", marks: 85 },
  { name: "dhara", marks: 72 },
  { name: "dheeraj", marks: 90 }
];


const average =
  students.reduce((sum, student) =>sum+student.marks, 0) / students.length;


const topStudent = students.reduce((prev, curr) =>
  curr.marks > prev.marks ? curr : prev
);

console.log("Average Marks:", average);
console.log("Top Student:", topStudent.name, "with", topStudent.marks, "marks");
