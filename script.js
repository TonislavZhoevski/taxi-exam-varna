// Създаваме глобална променлива за съхранение на данните, 
// за да избегнем конфликт със специалния обект window.location.
/** @type {Array} */
window.dataLocation = []; 

async function loadData() {
    const q1 = await fetch("./data/question1.json").then(res => res.json());
    const q2 = await fetch("./data/question2.json").then(res => res.json());

    // КОРИГИРАНО: Запазваме данните в новата променлива
    window.dataLocation = [...q1, ...q2]; 
    
    // Подаваме новата променлива на функцията за попълване
    populateDropdown(window.dataLocation);
}

function populateDropdown(data) {
    const select = document.getElementById("locationSelect");

    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.местност;
        select.appendChild(option);
    });
}

function checkAddress() {
    const id = Number(document.getElementById("locationSelect").value);
    const inputAddress = document.getElementById("addressInput").value.trim();

    if (!id) {
        alert("Моля, избери локация.");
        return;
    }

    // КОРИГИРАНО: Търсим в новата променлива window.dataLocation
    const item = window.dataLocation.find(x => x.id === id); 

    if (!item) {
        alert("Локацията не е намерена.");
        return;
    }

    if (inputAddress === item.адрес) {
        alert("Адресът е ВЕРЕН!");
    } else {
        alert(`Грешен адрес!\nПравилен адрес: ${item.адрес}`);
    }
}

window.onload = loadData;