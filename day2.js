// Day 2 - Functions & Loops

function findHighestMarks(marks) {
  let highest=marks[0];
  for (let i=1; i<marks.length; i++) {
    if (marks[i]>highest) {
      highest = marks[i];
    }
  }
  return highest;
}


