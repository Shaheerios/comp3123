var http = require("http");
var employees = require("./Employee"); 

console.log("Lab 03 - NodeJs");

// Define Server Port
const port = process.env.PORT || 8081

// Create Web Server using CORE API
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end(JSON.stringify({ "error": `${http.STATUS_CODES[405]}` }));
        return;
    }

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.end("<h1>Welcome to Lab Exercise 03</h1>");
        return;
    }

    if (req.url === '/employee') {
        res.end(JSON.stringify(employees));
        return;
    }

    if (req.url === '/employee/names') {
        let names = [];
        for (let i = 0; i < employees.length; i++) {
            names.push(employees[i].firstName + " " + employees[i].lastName);
        }
        names.sort(); 
        res.end(JSON.stringify(names));
        return;
    }

    if (req.url === '/employee/totalsalary') {
        let totalSalary = 0;
        for (let i = 0; i < employees.length; i++) {
            totalSalary += employees[i].Salary;
        }
        res.end(JSON.stringify({ "total_salary": totalSalary }));
        return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ "error": `${http.STATUS_CODES[404]}` }));
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});