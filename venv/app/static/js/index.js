const result = [[], [], [], []];
let count = 0;
const btn = document.querySelectorAll("button");
const btnArr = [...btn];
btnArr.forEach((eachBtn) => {
    eachBtn.addEventListener("click", (event) => {
        const name = event.target.name;
        if(name !== 'start'){
            const testType = event.target.parentElement.parentElement.parentElement.classList[0];
            if (testType === "jjjb") {
                result[0].push(name);
            }
            if (testType === "jmbm") {
                result[1].push(name);
            }
            if (testType === "mnbn") {
                result[2].push(name);
            }
            if (testType === "mdsd") {
                result[3].push(name);
            }
    
            if (count > 10) {
                selectAge(result);
            } else {
                showHide(count);
            }
            count++;
        } else {
            startTest();
        }
    });
});

const calcResult = function (arr, age) {
    let finalResult = [];
    for (let i = 0; i < arr.length; i++) {
        if(arr[i][0] === arr[i][1] || arr[i][0] === arr[i][2]) {
            finalResult.push(arr[i][0]);
        } else {
            finalResult.push(arr[i][1]);
        }
    }
    const agePart = document.querySelector('.age');
    agePart.classList.add('hide');

    const resultPart = document.querySelector('.result');
    resultPart.classList.remove('hide');

    const resultMBTIPart = document.querySelector('.result-mbti');
    resultMBTIPart.textContent = finalResult.join('');

    sendData(finalResult, age);
};

const showHide = function(count) {
    const questions = document.querySelectorAll('.question');
    const qAA = [...questions];
    qAA[count].classList.add('hide');
    qAA[count+1].classList.remove('hide');
    qAA[count+1].classList.add('show');
}

const startTest = function() {
    const introPart = document.querySelector('.intro');
    introPart.classList.add('hide');
    const testPart = document.querySelector(".test");
    testPart.classList.remove('hide');
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

const translateForm = {
    "짜": "A",
    "짬": "B",
    "부": "C",
    "찍": "D",
    "물": "E",
    "비": "F",
    "밀": "G",
    "쌀": "H",
};

const selectAge = function(result) {
    const testPart = document.querySelector('.test');
    testPart.classList.add('hide');
    const agePart = document.querySelector('.age');
    agePart.classList.remove('hide');

    const selectElement = document.querySelector('.age-select');
    
    selectElement.addEventListener('change', (event) => {
        const age = event.target.value;
        calcResult(result, age);
    });
}

const sendData = function(finalResult, age) {
    let mbti = '';
    finalResult.forEach(letter => {
        mbti += translateForm[letter];
    });

    const data = {mbti, age};

    fetch('/my-result', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => console.log(res))
    .catch(err => console.error(err))
}