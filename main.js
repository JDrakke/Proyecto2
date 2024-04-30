function validateForm() {
    let name = document.getElementById('inputName').value;
    let rut = document.getElementById('inputRut').value;
    let email = document.getElementById('inputEmail').value;
    let phone = document.getElementById('inputPhone').value;
    let status = document.getElementById('inputStatus').value;

    if (name.trim() === "") {
        alert('El campo "Nombre Completo" es requerido');
        return false;
    }

    if (rut.trim() === "") {
        alert('El campo "Rut" es requerido');
        return false;
    }

    if (email.trim() === "") {
        alert('El campo "Correo Electrónico" es requerido');
        return false;
    } else if (!email.includes('@')) {
        alert('El correo no es válido');
        return false;
    }

    if (phone.trim() === "") {
        alert('El campo "Celular" es requerido');
        return false;
    }

    if (status.trim() === "") {
        alert('El campo "Estatus" es requerido');
        return false;
    }

    return true;
}

function readData() {
    let listPeople = [];
    if (localStorage.getItem('listPeople') !== null) {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    let html = "";
    listPeople.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.rut + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.phone + "</td>";
        html += "<td><span class='status-indicator'></span>" + element.status + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Eliminar</button> <button onclick="editData(' + index + ')" class="btn btn-warning">Editar</button></td>';
        html += "</tr>";
    });

    document.querySelector('#tableData tbody').innerHTML = html;

    let statusIndicators = document.querySelectorAll('.status-indicator');
    listPeople.forEach(function (element, index) {
        if (element.status === 'activo') {
            statusIndicators[index].classList.add('active');
        } else {
            statusIndicators[index].classList.add('inactive');
        }
    });
}

function addData() {
    if (validateForm()) {
        let name = document.getElementById('inputName').value;
        let rut = document.getElementById('inputRut').value;
        let email = document.getElementById('inputEmail').value;
        let phone = document.getElementById('inputPhone').value;
        let status = document.getElementById('inputStatus').value;

        let listPeople = [];
        if (localStorage.getItem('listPeople') !== null) {
            listPeople = JSON.parse(localStorage.getItem('listPeople'));
        }

        listPeople.push({
            name: name,
            rut: rut,
            email: email,
            phone: phone,
            status: status
        });

        localStorage.setItem('listPeople', JSON.stringify(listPeople));

        readData();

        document.getElementById('inputName').value = "";
        document.getElementById('inputRut').value = "";
        document.getElementById('inputEmail').value = "";
        document.getElementById('inputPhone').value = "";
        document.getElementById('inputStatus').value = "";
    }
}

function deleteData(index) {
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));
    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));
    readData();
}

function editData(index) {
    let listPeople = JSON.parse(localStorage.getItem('listPeople'));
    let person = listPeople[index];
    document.getElementById('inputName').value = person.name;
    document.getElementById('inputRut').value = person.rut;
    document.getElementById('inputEmail').value = person.email;
    document.getElementById('inputPhone').value = person.phone;
    document.getElementById('inputStatus').value = person.status;
    document.getElementById('btnAdd').style.display = "none";
    document.getElementById('btnUpdate').style.display = "inline-block";

    document.getElementById('btnUpdate').onclick = function () {
        if (validateForm()) {
            listPeople[index] = {
                name: document.getElementById('inputName').value,
                rut: document.getElementById('inputRut').value,
                email: document.getElementById('inputEmail').value,
                phone: document.getElementById('inputPhone').value,
                status: document.getElementById('inputStatus').value
            };
            localStorage.setItem('listPeople', JSON.stringify(listPeople));
            readData();
            document.getElementById('btnAdd').style.display = "inline-block";
            document.getElementById('btnUpdate').style.display = "none";

            document.getElementById('inputName').value = "";
            document.getElementById('inputRut').value = "";
            document.getElementById('inputEmail').value = "";
            document.getElementById('inputPhone').value = "";
            document.getElementById('inputStatus').value = "";
        }
    };
}

window.onload = function () {
    readData();
};
