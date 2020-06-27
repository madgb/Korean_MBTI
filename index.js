const result = [[], [], [], []];
let count = 0;
const btn = document.querySelectorAll("button");
const btnArr = [...btn];
btnArr.forEach((eachBtn) => {
    eachBtn.addEventListener("click", (event) => {
        const name = event.target.name;
        const testType = event.target.parentElement.parentElement.classList[0];
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
            calcResult(result);
        } else {
            showHide(count);
        }
        count++;
    });
});

const calcResult = function (arr) {
    let finalResult = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === arr[i][1] || arr[i][0] === arr[i][2]) {
            finalResult.push(arr[i][0]);
        } else {
            finalResult.push(arr[i][1]);
        }
    }
    const testPart = document.querySelector(".test");
    const resultPart = document.querySelector(".result");
    testPart.classList.add("hide");
    resultPart.classList.remove("hide");
    resultPart.textContent = finalResult.join("");
    resultPart.classList.add("show");
};

const showHide = function (count) {
    const questions = document.querySelectorAll(".question");
    const qAA = [...questions];
    qAA[count].classList.add("hide");
    qAA[count + 1].classList.remove("hide");
    qAA[count + 1].classList.add("show");
};
