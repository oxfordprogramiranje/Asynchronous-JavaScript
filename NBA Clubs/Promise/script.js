const navbar = document.getElementById('navbar');
const table = document.getElementById('table');
let tableContent = '';

class Navbar {
    static create() {
        navbar.innerHTML = `
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1">NBA Clubs Table</span>
                </div>
            </nav>
      `;
    }
}

class Table {
    static create() {
        table.innerHTML = `
            <table class="table table-striped table-hover" id="clubsTable">
                <thead>
                    <tr>
                        <th scope="col">Abbreviation</th>
                        <th scope="col">Team Name</th>
                        <th scope="col">Simple Name</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>

                <tbody id="tableContent">

                </tbody>
            </table>
        `;
    }
}

Navbar.create();
Table.create();

// Async part  

let clubs = new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.open('GET', 'https://raw.githubusercontent.com/bttmly/nba/master/data/teams.json', true);

    req.onreadystatechange = () => {
        if (req.readyState == 4 && req.status == 200)
            resolve(JSON.parse(req.responseText));
    }

    req.send();
});

const tbody = document.querySelector('tbody');

clubs.then((res) => {
    res.forEach(element => {
        tableContent += `
            <tr>
                <td>${element.abbreviation}</td>
                <td>${element.teamName}</td>
                <td>${element.simpleName}</td>
                <td>${element.location}</td>
            </tr>
        `;
    });

    tbody.innerHTML = tableContent;
}, (err) => {
    console.log(err);
});