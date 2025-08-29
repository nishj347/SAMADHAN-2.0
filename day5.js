const http =require("http");

const students = [
  { id: 1, name: "Alice", marks: 85 },
  { id: 2, name: "Bob", marks: 72 },
  { id: 3, name: "Charlie", marks: 90 }
];

const server = http.createServer((req, res) => {
  if (req.url === "/students" && req.method==="GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(students));
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  }
});

server.listen(3000, ()=>{
  console.log("Server running at http://localhost:3000/");
});

//output
[{"id":1,"name":"Alice","marks":85},{"id":2,"name":"Bob","marks":72},{"id":3,"name":"Charlie","marks":90}]
