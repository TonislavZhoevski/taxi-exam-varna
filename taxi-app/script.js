/** @type {Array} */
let dataLocation = []; // Променлива на ниво модул (не е в window)
    
// ----------------------------------------------------
// 1. ФУНКЦИЯ ЗА ЗАРЕЖДАНЕ НА ДАННИ
// ----------------------------------------------------

async function loadData() {
    try {
        // Използваме Promise.all за едновременно зареждане на двата файла
        const [q1, q2] = await Promise.all([
            fetch("/data/question1.json").then(res => res.json()),
            fetch("/data/question2.json").then(res => res.json())
        ]);
        
        // Запазваме данните в локалната променлива
        dataLocation = [...q1, ...q2]; 
        
        // Попълваме падащото меню
        populateDropdown(dataLocation);

    } catch (error) {
        console.error("Грешка при зареждане на данните (проверете пътя):", error);
        alert("Възникна проблем при зареждането на данните. Моля, проверете пътя към JSON файловете (data/...).");
    }
}

// ----------------------------------------------------
// 2. ФУНКЦИЯ ЗА ПОПЪЛВАНЕ НА DROPDOWN
// ----------------------------------------------------

function populateDropdown(data) {
    const select = document.getElementById("locationSelect");

    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.местност;
        select.appendChild(option);
    });
}

// ----------------------------------------------------
// 3. ФУНКЦИЯ ЗА ПРОВЕРКА НА АДРЕСА
// ----------------------------------------------------

function checkAddress() {
    // Взимаме референция към елемента за резултата
    const resultElement = document.getElementById("resultOutput");
    // Взимаме текущата стойност от DOM
    const id = Number(document.getElementById("locationSelect").value);
    const inputAddress = document.getElementById("addressInput").value.trim();

    if (!id || inputAddress === "") {
        // СКРИВАМЕ ЕЛЕМЕНТА, АКО НЯМА ДАННИ
        resultElement.style.display = "none"; 
        alert("Моля, изберете локация и въведете адрес."); // Използваме alert тук, тъй като елементът е скрит
        return;
    }
    
    // ВИНАГИ нулираме старото съдържание преди нова проверка
    resultElement.textContent = ""; 
    resultElement.style.color = "black"; // Нулираме цвета
    resultElement.style.display = "block"; // ПОКАЗВАНЕ НА КОМПОНЕНТА!


    // 1. Проверка за избрана локация
    if (!id) {
        resultElement.textContent = "Моля, избери локация.";
        resultElement.style.color = "orange";
        return;
    }

    // Търсим в променливата dataLocation
    const item = dataLocation.find(x => x.id === id); 

    // 2. Проверка дали локацията е намерена (трябва да е невъзможна след loadData, но е добра практика)
    if (!item) {
        resultElement.textContent = "Локацията не е намерена.";
        resultElement.style.color = "red";
        return;
    }

    // 3. Основна логика за проверка на адреса
    if (inputAddress === item.адрес) {
        resultElement.textContent = "Адресът е ВЕРЕН! ✅";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = `Грешен адрес! ❌ Правилен адрес: ${item.адрес}`;
        resultElement.style.color = "red";
    }
}

// ----------------------------------------------------
// 4. СТАРТ НА ПРИЛОЖЕНИЕТО (DOM Event Listener)
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. Прикачаме слушателя за събитие върху бутона, използвайки неговото ID
    const checkButton = document.getElementById('checkButton');
    
    // Проверка дали елементът съществува
    if (checkButton) {
        checkButton.addEventListener('click', checkAddress);
    } else {
        console.error("Грешка: Бутонът с id='checkButton' не е намерен. Проверете index.html!");
    }

    // 2. Стартираме зареждането на данните
    loadData(); 
});