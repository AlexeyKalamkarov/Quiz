let questionType = {
    checkbox: 0,
    radio: 1,
    text: 2,
    title: 3,
}
let baseURL = 'https://64724ada6a9370d5a41b3b24.mockapi.io/api/v1/question';
let resultURL = 'https://64724ada6a9370d5a41b3b24.mockapi.io/api/v1/result'
let quiz = [];
const questionsContainer = document.getElementById("container");
const titleDiv = document.getElementById("title");
let currentIndex = 0;
let xhr = new XMLHttpRequest();
        xhr.open('GET', baseURL);
        xhr.send();
        xhr.onload = () => {
        quiz=JSON.parse(xhr.response);
            init();
            // see();
        }
function showQuiz(item) {
    if (item.type === questionType.title) {
        titleDiv.innerHTML = `
        <div class="title">${item.question}</div>
        `
    }
    else if (item.type === questionType.radio) {
        questionsContainer.innerHTML = `
                        <div class="question" id="question">${item.question}</div>
                        <form id="form">
        <input id="input" type="radio" name="nameRadio" class="radio" value="${item.options[0]}">${item.options[0]}<br>
        <input id="input" type="radio" name="nameRadio" class="radio" value="${item.options[1]}">${item.options[1]}<br>
        <input id="input" type="radio" name="nameRadio" class="radio" value="${item.options[2]}">${item.options[2]}<br>
        <input id="input" type="radio" name="nameRadio" class="radio" value="${item.options[3] || ""}">${item.options[3]}<br>
                        </form>`
        // see();
    } else if (item.type === questionType.checkbox) {
        questionsContainer.innerHTML = `
        <div class="question">${item.question}</div>
        <input id="input" name="nameCheck" type="checkbox" name="browser" class="checkbox" value="${item.options[0]}">${item.options[0]}<br>
        <input id="input" name="nameCheck" type="checkbox" class="checkbox" value="${item.options[1]}">${item.options[1]}<br>
        <input id="input" name="nameCheck" type="checkbox" class="checkbox" value="${item.options[2]}">${item.options[2]}<br>
        <input id="input" name="nameCheck" type="checkbox" class="chechbox" value="${item.options[3]}">${item.options[3]}<br>`

    } else if (item.priority===2) {
        questionsContainer.innerHTML = `
        <div class="question">${item.question}</div>
        <div class="FIO">
        <textarea  name="nameText" class="text" id="text" maxlength="10"></textarea><br>
        </div>`
    } else if (item.type === questionType.text) {
        questionsContainer.innerHTML = `
        <div class="question">${item.question}</div>
        <textarea id="input" name="nameText" class="text" id="text" maxlength="10"></textarea><br>
        </div>`

    }

    else {
        questionsContainer.innerHTML = `
        <div class="end">Error</div>
        `
        }
        // questionsContainer.innerHTML  = `
        //         <div class="question">${item.question}</div>
        //         <input type="text" name="text" class="text"><br>
        //         `

    }

function nextStep() {
    // seeRadio();
    // seeCheck();

        // sent();
    currentIndex++;
    showQuiz(quiz[currentIndex]);
    see();
    if (currentIndex === quiz.length - 1) {
        questionsContainer.innerHTML = `
        <div class="end">The end</div>
        `
    }
}


function init() {
    showQuiz(quiz[currentIndex]);
}
let dataObj = {};
        function see() {
            if (quiz[currentIndex].type === questionType.radio) {
                seeRadio();
            } else if (quiz[currentIndex].type === questionType.checkbox) {
                seeCheck();
            } else if(quiz[currentIndex].type === questionType.text) {
                seeText();
            } else {
                sent();
            }
        }
function seeRadio() {

    let dataRadio = document.querySelectorAll('input[name="nameRadio"]');
    for (let radio = 0; radio < dataRadio.length; radio++) {
        if (dataRadio[radio].checked) {
            dataObj[radio] = dataRadio[radio].value;

    }
    // console.log(dataRadioObj);
}
}
function seeCheck() {

    let dataCheck = document.querySelectorAll('input[name="nameCheck"]');
    for (let check = 0; check < dataCheck.length; check++) {
        if (dataCheck[check].checked) {
            dataObj[check] = dataCheck[check].value;

    }
    // console.log(dataObj);
}
}
function seeText() {

    let dataText = document.querySelectorAll('input[name="nameText"]');
    for (let text = 0; text < dataText.length; text++)
    {
            dataObj[text] = dataText[text].value;


    // console.log(dataObj);
}
}

function sent() {
    fetch(resultURL, {
        method: 'post',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(dataObj) // Упаковка

    }).then(response => response.json()) // Ответ с сервера переводится в JSON
        .then(res => console.log(res))
        .catch(function (err) {
            // Error :(
        })
}

































// function see() {
//         // event.preventDefault();
//         const fields = document.querySelectorAll('input');
//         const values = {};
//         fields.forEach(field => {
//             const {name, value} = field;
//             values[name] = value;
//         })
//     console.log(values);
// }
// questionsContainer.addEventListener('submit', see);





// function see() {
//     let ans = document.querySelectorAll('input[id="input"]:checked');
//     for (let f of ans) {
//         if (f.checked) {
//             console.log(f.value);
//         }
//     }
//
// }
// function saveDataToArray(){
//     const inputValue = questionsContainer.data;
//     if (!Array.isArray(savedData)) {
//         let savedData = [];
//         savedData.push(inputValue);
//         localStorage.setItem('savedData', JSON.stringify(savedData));
//         fetch(resultURL,{
//             method:'POST',
//             body: savedData
//         })
//             .then(response => {
//                 if (response.ok) {
//                     alert("Saved!")} else {alert.error("Error saved!")}
//
//             })
//             // .catch(error => {alert("Server error"), error});
//     }
// }
