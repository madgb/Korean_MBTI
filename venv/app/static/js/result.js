const allTypeChartElem = document.getElementById("allTypeChart");

const teenTypeChartElem = document.getElementById("teenTypeChart");
const twentyTypeChartElem = document.getElementById("twentyTypeChart");
const thirtyTypeChartElem = document.getElementById("thirtyTypeChart");
const FourtyTypeChartElem = document.getElementById("FourtyTypeChart");

const teenEachChartElem = document.getElementById("teenEachChart");
const twentyEachChartElem = document.getElementById("twentyEachChart");
const thirtyEachChartElem = document.getElementById("thirtyEachChart");
const fourtyEachChartElem = document.getElementById("fourtyEachChart");

const translateForm = {
    A: "짜장",
    B: "짬뽕",
    C: "부먹",
    D: "찍먹",
    E: "물냉",
    F: "비냉",
    G: "밀떡",
    H: "쌀떡",
};

// MBTI 총 통계
const totalType = data.totalType;

// 나이대별 MBTI 통계
const ageType = data.ageType;

// 나이대별 선호 음식 통계
const ageEachType = data.ageEachType;

// 그래프 데이터용
let totalTypeKr, ageEachTypeKr;

function distribute(dataType, className, each, label, elem) {
    const wrapper = document.querySelector(className);
    const typeVariable = Object.keys(dataType);
    const typeValues = Object.values(dataType);
    const allResult = letterToKorean(
        typeVariable,
        typeValues,
        each,
        label,
        elem
    );
    wrapper.innerHTML = allResult;
}

function letterToKorean(
    typeVariable,
    typeValues,
    each,
    label,
    elem,
    simple = false
) {
    if (simple) {
        return typeVariable.split("").map((letter) => translateForm[letter] ? translateForm[letter][0] : "").join("");
    }

    let mappedType;

    if (!each) {
        mappedType = typeVariable.map((type) =>
            type
                .split("")
                .map((letter) => translateForm[letter] ? translateForm[letter][0] : "")
                .join("")
        );
    } else {
        mappedType = typeVariable.map((type) => translateForm[type] ? translateForm[type] : "");
    }

    let allResult = "";
    typeValues.forEach((eachVal, idx) => {
        allResult += `<div>${mappedType[idx]}</div><div>${eachVal}</div>`;
    });
    createChart(elem, mappedType, typeValues, label);
    return allResult;
}

distribute(
    totalType,
    ".total-type-wrapper",
    false,
    "전체 통계",
    allTypeChartElem
);
distribute(
    ageType.teen,
    ".age-type-wrapper .teen",
    false,
    "10대 통계",
    teenTypeChartElem
);
distribute(
    ageType.twenty,
    ".age-type-wrapper .twenty",
    false,
    "20대 통계",
    twentyTypeChartElem
);
distribute(
    ageType.thirty,
    ".age-type-wrapper .thirty",
    false,
    "30대 통계",
    thirtyTypeChartElem
);
distribute(
    ageType.fourty,
    ".age-type-wrapper .fourty",
    false,
    "40대 통계",
    FourtyTypeChartElem
);
distribute(
    ageEachType.teen,
    ".age-each-type-wrapper .teen",
    true,
    "10대 음식별 통계",
    teenEachChartElem
);
distribute(
    ageEachType.twenty,
    ".age-each-type-wrapper .twenty",
    true,
    "20대 음식별 통계",
    twentyEachChartElem
);
distribute(
    ageEachType.thirty,
    ".age-each-type-wrapper .thirty",
    true,
    "30대 음식별 통계",
    thirtyEachChartElem
);
distribute(
    ageEachType.fourty,
    ".age-each-type-wrapper .fourty",
    true,
    "40대 음식별 통계",
    fourtyEachChartElem
);

function createChart(elem, labels, data, label) {
    new Chart(elem, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: label,
                    data: data,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });
}

const toggleButton = document.querySelector(".result-toggle");
toggleButton.addEventListener("click", toggleRawData);

function toggleRawData() {
    const dataElem = document.querySelector(".raw-data");
    if (dataElem.classList.contains("hide")) {
        dataElem.classList.remove("hide");
    } else {
        dataElem.classList.add("hide");
    }
}

const totalTypesArr = Object.keys(totalType);
const totalTypesValArr = Object.values(totalType);

const codedTotalTypeArr = [];
for (let i = 0; i < totalTypesArr.length; i++) {
    codedTotalTypeArr.push({
        type: totalTypesArr[i],
        value: totalTypesValArr[i],
    });
}

const sortedTotalType = codedTotalTypeArr.sort((a, b) =>
    b.value > a.value ? 1 : -1
);
const totalVisitor = totalTypesValArr.reduce((a, b) => a + b);

const today = new Date();
const date = [today.getFullYear(), today.getMonth() + 1, today.getDate()].join(
    "/"
);
const time = today.getHours();

const rankWrapper = document.querySelector(".rank-wrapper");
const first = rankWrapper.querySelector(".first span.type");
const second = rankWrapper.querySelector(".second span.type");
const third = rankWrapper.querySelector(".third span.type");

first.textContent = letterToKorean(sortedTotalType[0].type, null, null, null, null, true);
second.textContent = letterToKorean(sortedTotalType[1].type, null, null, null, null, true);
third.textContent = letterToKorean(sortedTotalType[2].type, null, null, null, null, true);

const totalVisitorElem = rankWrapper.querySelector(".total-visitor span.visitor");
totalVisitorElem.textContent = totalVisitor;

const dateElem = rankWrapper.querySelector(".date");
const timeElem = rankWrapper.querySelector(".time");

dateElem.textContent = date;
timeElem.textContent = time;
