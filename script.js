// объявление переменных
const info = document.querySelector('.info');
const errorText = document.querySelector('.info__errors');
const number = document.querySelector('.input__number');
const button = document.querySelector('.input__button');
const option = document.querySelector('#select');


const text = document.querySelector('.info__text');


// функция для выбора одной из опций

function selectValue() {
    let selectedValue = option.value;
    return selectedValue;
}

//вызов функции при выборе опции

option.addEventListener('change', selectValue);

//функция показывает текст ошибки
function creatErrorMessage(error) {
    const displayError = `<div>${error}</div>`
    errorText.innerHTML = displayError;
}

// функция показывает информацию, шаблон

function createTemplate(name) {
    const display = `<div> Информация найдена: ${name} </div>`;
    info.innerHTML = display;
}

// функция показывает инфу из API

function showInfo() {
    const choice = selectValue();
    const inputId = number.value;


    fetch('https://swapi.dev/api/' + choice + '/' + inputId + '/')
        .then(response => response.json())
        .then((data) => {
            if (inputId > 10) return Promise.reject('Ошибка: информация не найдена!');
            if (choice === 'films') {
                return createTemplate(data.title);
            } else {
                return createTemplate(data.name)
            }
        })

        .catch((error) => {
            creatErrorMessage(error);
            text.classList.add('hidden');
        })
        .finally(() => {
            alert('May the 4th be with you!');
        })
}
// отображение информации или текста ошибки при клике на кнопку
button.addEventListener('click', showInfo);

