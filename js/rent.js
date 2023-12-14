document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("rent-form");
    var tableBody = document.querySelector(".table tbody");
    var selectedRow = null;
    var data = JSON.parse(localStorage.getItem("rentalData")) || [];

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var email = document.getElementById("email").value;
        var name = document.getElementById("name").value;
        var movie = document.getElementById("movie").value;
        var time = document.getElementById("time").value;

        if (!email || !name || movie === "Select a movie" || !time) {
            alert("Debe completar todos los campos antes de enviar los datos");
            return;
        }

        var rowData = { email: email, name: name, movie: movie, time: time };

        if (selectedRow === null) {
            data.push(rowData);
            addRowToTable(rowData);
            form.reset();
        } else {
            data[selectedRow.rowIndex - 1] = rowData;
            updateRowInTable(selectedRow, rowData);
            selectedRow = null;
            form.reset();
        }

        localStorage.setItem("rentalData", JSON.stringify(data));
    });

    function addRowToTable(rowData) {
        var newRow = tableBody.insertRow();
        newRow.classList.add("unselectable");
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);

        cell1.textContent = rowData.email;
        cell2.textContent = rowData.name;
        cell3.textContent = rowData.movie;
        cell4.textContent = rowData.time;

        var deleteButton = createButton("Eliminar", "btn btn-danger", function () {
            var rowIndex = Array.from(tableBody.rows).indexOf(newRow);
            data.splice(rowIndex, 1); // Eliminar datos del array
            tableBody.deleteRow(rowIndex);
            form.reset(); // Restablecer el formulario después de eliminar la fila
            // Actualizar datos en el localStorage después de eliminar
            localStorage.setItem("rentalData", JSON.stringify(data));
        });
        cell5.appendChild(deleteButton);
        var editButton = createButton("Editar", "btn btn-primary", function () {
            var rowIndex = Array.from(tableBody.rows).indexOf(newRow);
            loadFormData(data[rowIndex]);
            selectedRow = newRow;
        });
        cell5.appendChild(editButton);
    }

    function updateRowInTable(row, rowData) {
        row.cells[0].textContent = rowData.email;
        row.cells[1].textContent = rowData.name;
        row.cells[2].textContent = rowData.movie;
        row.cells[3].textContent = rowData.time;
    }

    function createButton(text, className, clickHandler) {
        var button = document.createElement("button");
        button.textContent = text;
        button.className = className;
        button.addEventListener("click", clickHandler);
        return button;
    }

    function loadFormData(rowData) {
        document.getElementById("email").value = rowData.email;
        document.getElementById("name").value = rowData.name;
        document.getElementById("movie").value = rowData.movie;
        document.getElementById("time").value = rowData.time;
    }

    // Cargar datos del localStorage al cargar la página
    function loadTableFromLocalStorage() {
        for (var i = 0; i < data.length; i++) {
            addRowToTable(data[i]);
        }
    }

    loadTableFromLocalStorage();
});