document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { name: 'Emily Davis', age: 28, location: 'Seattle' },
        { name: 'William Wilson', age: 32, location: 'Denver' },
        { name: 'Linda Garcia', age: 37, location: 'San Diego' },
        { name: 'David Martinez', age: 42, location: 'Dallas' },
        { name: 'Susan Rodriguez', age: 29, location: 'Miami' },
        { name: 'Richard Hernandez', age: 33, location: 'Austin' },
        { name: 'Jennifer Lopez', age: 48, location: 'San Francisco' },
        { name: 'Charles Gonzalez', age: 31, location: 'Boston' },
        { name: 'Margaret Adams', age: 38, location: 'Atlanta' },
        { name: 'Joseph Scott', age: 43, location: 'Las Vegas' },
        { name: 'Karen Hall', age: 27, location: 'Minneapolis' },
        { name: 'Thomas Young', age: 34, location: 'Detroit' },
        { name: 'Nancy Clark', age: 39, location: 'Portland' },
        { name: 'Daniel Turner', age: 44, location: 'Charlotte' },
        { name: 'Betty White', age: 26, location: 'Raleigh' },
        { name: 'Paul Baker', age: 30, location: 'Nashville' },
        { name: 'Lisa Harris', age: 35, location: 'Orlando' },
        { name: 'Mark Adams', age: 41, location: 'New Orleans' },
        { name: 'Donna Wilson', age: 46, location: 'Salt Lake City' },
        { name: 'Robert Taylor', age: 29, location: 'Indianapolis' },
        { name: 'Deborah Lewis', age: 32, location: 'Columbus' },
        { name: 'John Anderson', age: 37, location: 'Kansas City' },
        { name: 'Carol Garcia', age: 42, location: 'San Jose' },
        { name: 'James Walker', age: 47, location: 'Tampa' },
        { name: 'Dorothy Hall', age: 25, location: 'Phoenix' },
        { name: 'William Smith', age: 31, location: 'Chicago' },
        { name: 'Jennifer Johnson', age: 36, location: 'Houston' },
        { name: 'Michael Brown', age: 40, location: 'Philadelphia' },
        { name: 'Mary Taylor', age: 45, location: 'San Antonio' }
    ];
    let currentPage = 1;
    const recordsPerPage = 5;

    function createTable(data) {
        const table = document.createElement('table');
        let thead = table.createTHead();
        let tbody = table.createTBody();
        table.id = 'data-table';
    
        
        let headerRow = thead.insertRow();

        Object.keys(data[0]).forEach(key => {
            let th = document.createElement('th');
            key = key.charAt(0).toUpperCase() + key.slice(1);
            th.innerHTML = key + ' <i class="fa fa-sort-up sort-asc"></i><i class="fa fa-sort-down sort-desc"></i>';
            th.setAttribute('data-key', key.toLowerCase());
        
            let ascIcon = th.querySelector('.sort-asc');
            let descIcon = th.querySelector('.sort-desc');
        
            ascIcon.addEventListener('click', () => sortTable(key.toLowerCase(), true));
            descIcon.addEventListener('click', () => sortTable(key.toLowerCase(), false));
        
            headerRow.appendChild(th);
        });
    
        
        data.forEach(item => {
            let row = tbody.insertRow();
            Object.values(item).forEach(value => {
                let cell = row.insertCell();
                cell.innerHTML = value;
            });
        });
    
        return table;
    }
    


    function sortTable(key, isAscending) {
        data.sort((a, b) => {
            if (typeof a[key] === 'number') {
                return isAscending ? a[key] - b[key] : b[key] - a[key];
            } else {
                return isAscending ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
            }
        });
        document.querySelectorAll('#data-table th').forEach(th => {
            let ascIcon = th.querySelector('.sort-asc');
            let descIcon = th.querySelector('.sort-desc');
    
            
            ascIcon.classList.remove('active-sort');
            descIcon.classList.remove('active-sort');
    
            
            if (th.getAttribute('data-key') === key) {
                if (isAscending) {
                    ascIcon.classList.add('active-sort');
                } else {
                    descIcon.classList.add('active-sort');
                }
            }
        });
    
        
        renderTable();
    }
    

    function paginateData(data) {
        return data.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);
    }

    function renderTable() {
        const tableContainer = document.getElementById('table-container');
        tableContainer.innerHTML = '';
        tableContainer.appendChild(createTable(paginateData(data)));

        renderPagination();
    }

    function renderPagination() {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';
    
        const totalPages = Math.ceil(data.length / recordsPerPage);
        let prevPage = currentPage > 1 ? currentPage - 1 : 1;
        let nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    
        
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<i class="fa fa-chevron-left"></i>';
        prevButton.onclick = function() {
            currentPage = prevPage;
            renderTable();
        };
        pagination.appendChild(prevButton);
    
        
        const currentPageButton = document.createElement('button');
        currentPageButton.innerText = currentPage;
        currentPageButton.classList.add('active');
        pagination.appendChild(currentPageButton);
    
        
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '<i class="fa fa-chevron-right"></i>';
        nextButton.onclick = function() {
            currentPage = nextPage;
            renderTable();
        };
        pagination.appendChild(nextButton);
    
        
        if (currentPage === 1) {
            prevButton.disabled = true;
        }
    
        
        if (currentPage === totalPages) {
            nextButton.disabled = true;
        }
    }
    

    renderTable();
});
