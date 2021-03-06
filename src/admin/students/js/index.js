function formOnChange(select) {
    if (select.value == 'crear') {
        divId = document.getElementById('div-id');
        divId.style.display = "";

        divEmail = document.getElementById('div-email');
        divEmail.style.display = "";

        divFirstName = document.getElementById('div-first-name');
        divFirstName.style.display = "";

        divSecondName = document.getElementById('div-second-name');
        divSecondName.style.display = "";

        divLastName = document.getElementById('div-last-name');
        divLastName.style.display = "";

        divSecondLastName = document.getElementById('div-second-last-name');
        divSecondLastName.style.display = "";

        btn = document.getElementById('btn1');
        btn.style.display = "";

        table = document.getElementById('data');
        table.style.display = "none";

        levelForm = document.getElementById('div-level-group');
        levelForm.style.display = "";

    }
    else {
        divId = document.getElementById('div-id');
        divId.style.display = "none";

        divEmail = document.getElementById('div-email');
        divEmail.style.display = "none";

        divFirstName = document.getElementById('div-first-name');
        divFirstName.style.display = "none";

        divSecondName = document.getElementById('div-second-name');
        divSecondName.style.display = "none";

        divLastName = document.getElementById('div-last-name');
        divLastName.style.display = "none";

        divSecondLastName = document.getElementById('div-second-last-name');
        divSecondLastName.style.display = "none";

        btn = document.getElementById('btn1');
        btn.style.display = "none";

        table = document.getElementById('data');
        table.style.display = "";

        levelForm = document.getElementById('div-level-group');
        levelForm.style.display = "none";

        listStudent(link_student);
    }
}

const formStudent = {
    data_id: document.getElementById('id'),
    id: document.getElementById('identification'),
    email: document.getElementById('email'),
    firstName: document.getElementById('first-name'),
    secondName: document.getElementById('second-name'),
    lastName: document.getElementById('last-name'),
    secondLastName: document.getElementById('second-last-name'),
    level: document.getElementById('levelGroup'),
};

let link_student = 'https://61cd1a30198df60017aec2d4.mockapi.io/api/v1/student';

function addStudent() {
    fetch(link_student, {
        method: 'POST',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            identification: formStudent.id.value,
            firstName: formStudent.firstName.value,
            secondName: formStudent.secondName.value,
            lastName: formStudent.lastName.value,
            secondLastName: formStudent.secondLastName.value,
            email: formStudent.email.value,
            password: formStudent.id.value,
            levelGroup: formStudent.level.value,
        }),

    })
        .then((response) => {
            if (response.status == 201) {
                alert('Se ha creado correctamente');
                window.location.href = "index.html";
            }
        })
        .catch((err) => {
            console.log(err);
            alert('Error al crear el estudiante');
        });
}

function updateStudent(id) {

    fetch(link_student + `/${id}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            identification: formStudent.id.value,
            firstName: formStudent.firstName.value,
            secondName: formStudent.secondName.value,
            lastName: formStudent.lastName.value,
            secondLastName: formStudent.secondLastName.value,
            email: formStudent.email.value,
            password: formStudent.id.value,
            levelGroup: formStudent.level.value,
        }),
    })
        .then((response) => {
            if (response.status == 200) {
                alert('Se ha creado actualizado correctamente');
                window.location.href = "index.html";
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function listStudent(link_student) {
    const tbody = document.getElementById('list');
    fetch(link_student)
        .then(response => response.json())
        .then(data => {
            tbody.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                let fila = tbody.insertRow();
                fila.insertCell().innerHTML = data[i].identification;
                fila.insertCell().innerHTML = data[i].firstName + ' ' + data[i].secondName + ' ' + data[i].lastName + ' ' + data[i].secondLastName;
                fila.insertCell().innerHTML = `
            <button onclick="goedit(${data[i].id})" type="button">Editar</button> | <button type="button" onclick="deleteStudent(${data[i].id})" >Borrar</button>
            `;
            }
        });
}

function deleteStudent(id) {
    fetch(link_student + `/${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
            console.log(response.status);
            if (response.status == 200) {
                alert('Se ha eliminado correctamente');
            }
        })
}

function goedit(id) {
    window.location.href = "editar.html?id=" + id;
}

const link_groups = 'https://61cd1a30198df60017aec2d4.mockapi.io/api/v1/group';

function listGroup() {
    const select = document.getElementById('levelGroup');
    fetch(link_groups)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (i == 0) {
                    let option = document.createElement('option');
                    option.value = '';
                    option.innerHTML = 'Seleccionar un Grupo';
                    select.appendChild(option);
                }
                let option = document.createElement('option');
                option.value = data[i].level;
                option.innerHTML = data[i].level;
                select.appendChild(option);
            }
        });
}


