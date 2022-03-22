let currentProblem;
let firstProblem = [{
        index: 0,
        processName: "P1",
        arrvialTime: 0,
        estimatedCPUBrustTime: 7,
        priority: 4,
        remainingCPUBrustTime: 7,
        color: "#4ecb71",
    },
    {
        index: 1,
        processName: "P2",
        arrvialTime: 1,
        estimatedCPUBrustTime: 10,
        priority: 8,
        remainingCPUBrustTime: 10,
        color: "#ff9790",
    },
    {
        index: 2,
        processName: "P3",
        arrvialTime: 2,
        estimatedCPUBrustTime: 7,
        priority: 2,
        remainingCPUBrustTime: 7,
        color: "#85b6ff",
    },
    {
        index: 3,
        processName: "P4",
        arrvialTime: 3,
        estimatedCPUBrustTime: 8,
        priority: 5,
        remainingCPUBrustTime: 8,
        color: "#e4a951",
    },
    {
        index: 4,
        processName: "P5",
        arrvialTime: 4,
        estimatedCPUBrustTime: 5,
        priority: 6,
        remainingCPUBrustTime: 5,
        color: "#d99bff",
    },
];

let secondProblem = [{
        index: 0,
        processName: "P1",
        arrvialTime: 1,
        estimatedCPUBrustTime: 8,
        priority: 7,
        remainingCPUBrustTime: 8,
        color: "#4ecb71",
    },
    {
        index: 1,
        processName: "P2",
        arrvialTime: 1,
        estimatedCPUBrustTime: 10,
        priority: 5,
        remainingCPUBrustTime: 10,
        color: "#ff9790",
    },
    {
        index: 2,
        processName: "P3",
        arrvialTime: 2,
        estimatedCPUBrustTime: 7,
        priority: 10,
        remainingCPUBrustTime: 7,
        color: "#85b6ff",
    },
    {
        index: 3,
        processName: "P4",
        arrvialTime: 3,
        estimatedCPUBrustTime: 12,
        priority: 3,
        remainingCPUBrustTime: 12,
        color: "#e4a951",
    },
    {
        index: 4,
        processName: "P5",
        arrvialTime: 4,
        estimatedCPUBrustTime: 14,
        priority: 1,
        remainingCPUBrustTime: 14,
        color: "#d99bff",
    },
];
let contextSwitching = 0;

console.log("Hello I am running JS");

let awt = document.querySelector(".awt");
let art = document.querySelector(".art");
let att = document.querySelector(".att");

// showing process to UI screen
const processDiv = document.querySelector(".process-div");
const updateProblem = () => {
    while (processDiv.childElementCount > 2) {
        processDiv.removeChild(processDiv.children[2]);
    }
    currentProblem.forEach((element) => {
        const div = document.createElement("div");
        div.classList.add("process");
        div.innerHTML = `
  <p class="process-name">${element.processName}</p>
  <p class="process-arrival">${element.arrvialTime}</p>
  <p class="process-time">${element.estimatedCPUBrustTime}</p>
  <p class="process-priority">${element.priority}</p>
 `;
        processDiv.appendChild(div);
    });
};

//selecting table
const table = document.querySelector(".table");
const fcfsFunction = () => {
    let currentTime = currentProblem[0].arrvialTime;
    updateGrantChart(contextSwitching, "#fff", currentTime);
    currentTime += contextSwitching;
    currentProblem.forEach((element, idx) => {
        const row = document.createElement("tr");
        let CT = currentTime + element.estimatedCPUBrustTime;
        if (element.arrvialTime + element.estimatedCPUBrustTime > CT)
            CT = element.arrvialTime + element.estimatedCPUBrustTime;
        currentProblem[element.index].waitingTime =
            CT - element.arrvialTime - element.estimatedCPUBrustTime;
        currentProblem[element.index].responseTime =
            CT - element.arrvialTime - element.estimatedCPUBrustTime;
        currentProblem[element.index].turnAroundTime = CT - element.arrvialTime;
        row.innerHTML = `
   <td>${element.processName}</td>
   <td>${element.arrvialTime}</td>
   <td>${element.estimatedCPUBrustTime}</td>
   <td>${CT}</td>
   <td>${CT - element.arrvialTime}</td>
   <td>${CT - element.arrvialTime - element.estimatedCPUBrustTime}</td>
   <td>${CT - element.arrvialTime - element.estimatedCPUBrustTime}</td>
  `;
        table.appendChild(row);
        currentTime = CT;
        updateGrantChart(
            element.estimatedCPUBrustTime,
            element.color,
            currentTime - element.remainingCPUBrustTime
        );
        if (idx < currentProblem.length - 1) {
            currentTime += contextSwitching;
            updateGrantChart(contextSwitching, "#fff", currentTime - 1);
        }
        currentProblem[idx].remainingCPUBrustTime = 0;
    });
};

//selecting grant chart
const grantChart = document.querySelector(".grant-block");
const updateGrantChart = (runTime, color, time) => {
    for (let i = 0; i < runTime; i++) {
        let process = document.createElement("div");
        process.classList.add("process");
        process.style.background = color;
        process.style.border = "1px solid white";
        process.setAttribute("time-stamp", time + i + " ms");
        grantChart.appendChild(process);
    }
};

const sjfFunction = () => {
    updateGrantChart(contextSwitching, "#fff", 0);
    let element = currentProblem[0];
    let currentTime = element.arrvialTime;
    currentTime += contextSwitching;
    updateGrantChart(contextSwitching, "#fff", currentTime - 1);
    currentProblem.forEach((ele, idx) => {
        const row = document.createElement("tr");
        let newElement;
        let CT = currentTime + element.estimatedCPUBrustTime;
        if (element.arrvialTime + element.estimatedCPUBrustTime > CT)
            CT = element.arrvialTime + element.estimatedCPUBrustTime;
        for (let i = 0; i < currentProblem.length; i++) {
            if (currentProblem[i].remainingCPUBrustTime == 0) continue;
            if (currentTime < currentProblem[i].arrvialTime) break;
            else {
                if (newElement === undefined) newElement = currentProblem[i];
                else {
                    if (
                        currentProblem[i].estimatedCPUBrustTime <
                        newElement.estimatedCPUBrustTime
                    )
                        newElement = currentProblem[i];
                }
            }
        }
        if (element !== newElement && newElement !== undefined) {
            element = newElement;
            currentTime += contextSwitching;
            CT = currentTime + element.estimatedCPUBrustTime;
            if (element.arrvialTime + element.estimatedCPUBrustTime > CT)
                CT = element.arrvialTime + element.estimatedCPUBrustTime;
            updateGrantChart(contextSwitching, "#fff", currentTime - 1);
        }
        currentProblem[element.index].waitingTime =
            CT - element.arrvialTime - element.estimatedCPUBrustTime;
        currentProblem[element.index].turnAroundTime = CT - element.arrvialTime;
        currentProblem[element.index].responseTime =
            CT - element.arrvialTime - element.estimatedCPUBrustTime;
        row.innerHTML = `
   <td>${element.processName}</td>
   <td>${element.arrvialTime}</td>
   <td>${element.estimatedCPUBrustTime}</td>
   <td>${CT}</td>
   <td>${CT - element.arrvialTime}</td>
   <td>${CT - element.arrvialTime - element.estimatedCPUBrustTime}</td>
   <td>${CT - element.arrvialTime - element.estimatedCPUBrustTime}</td>
  `;
        table.appendChild(row);
        currentTime = CT;
        updateGrantChart(
            element.estimatedCPUBrustTime,
            element.color,
            currentTime - element.remainingCPUBrustTime
        );
        currentProblem[element.index].remainingCPUBrustTime = 0;
    });
};

const pjfFunction = () => {
    updateGrantChart(contextSwitching, "#fff", 0);
    let element = currentProblem[0];
    let currentTime = element.arrvialTime;
    currentTime += contextSwitching;
    updateGrantChart(contextSwitching, "#fff", currentTime - 1);
    currentProblem.forEach(() => {
        const row = document.createElement("tr");
        let newElement;
        let CT = currentTime + element.estimatedCPUBrustTime;
        if (element.arrvialTime + element.estimatedCPUBrustTime > CT)
            CT = element.arrvialTime + element.estimatedCPUBrustTime;
        for (let i = 0; i < currentProblem.length; i++) {
            if (currentProblem[i].remainingCPUBrustTime == 0) continue;
            if (currentTime < currentProblem[i].arrvialTime) break;
            else {
                if (newElement === undefined) newElement = currentProblem[i];
                else {
                    if (currentProblem[i].priority > newElement.priority)
                        newElement = currentProblem[i];
                }
            }
        }
        if (element !== newElement && newElement !== undefined) {
            element = newElement;
            currentTime += contextSwitching;
            CT = currentTime + element.estimatedCPUBrustTime;
            if (element.arrvialTime + element.estimatedCPUBrustTime > CT)
                CT = element.arrvialTime + element.estimatedCPUBrustTime;
            updateGrantChart(contextSwitching, "#fff", currentTime - 1);
        }
        currentProblem[element.index].waitingTime =
            CT - element.arrvialTime - element.estimatedCPUBrustTime;
        currentProblem[element.index].turnAroundTime = CT - element.arrvialTime;
        currentProblem[element.index].responseTime =
            CT - element.arrvialTime - element.estimatedCPUBrustTime;
        row.innerHTML = `
   <td>${element.processName}</td>
   <td>${element.arrvialTime}</td>
   <td>${element.estimatedCPUBrustTime}</td>
   <td>${CT}</td>
   <td>${CT - element.arrvialTime}</td>
   <td>${CT - element.arrvialTime - element.estimatedCPUBrustTime}</td>
   <td>${CT - element.arrvialTime - element.estimatedCPUBrustTime}</td>
  `;
        table.appendChild(row);
        currentTime = CT;
        updateGrantChart(
            element.estimatedCPUBrustTime,
            element.color,
            currentTime - element.remainingCPUBrustTime
        );
        currentProblem[element.index].remainingCPUBrustTime = 0;
    });
};

const psjfFunction = () => {
    let element = currentProblem[0];
    updateGrantChart(contextSwitching, "#fff", element.arrvialTime);
    let totalTime = contextSwitching;
    currentProblem.forEach((ele) => (totalTime += ele.estimatedCPUBrustTime));
    let i = element.arrvialTime + contextSwitching;
    while (i < totalTime || element.remainingCPUBrustTime > 0) {
        let newElement;
        for (let j = 0; j < currentProblem.length; j++) {
            if (currentProblem[j].remainingCPUBrustTime === 0) continue;
            if (i < currentProblem[j].arrvialTime) break;
            else {
                if (newElement === undefined) newElement = currentProblem[j];
                else {
                    if (
                        currentProblem[newElement.index].remainingCPUBrustTime >
                        currentProblem[j].remainingCPUBrustTime
                    )
                        newElement = currentProblem[j];
                }
            }
        }
        if (element !== newElement && newElement !== undefined) {
            if (element.arrvialTime != newElement.arrvialTime) {
                totalTime += contextSwitching;
                updateGrantChart(contextSwitching, "#fff", i);
                i += contextSwitching;
            }
            element = newElement;
        }
        currentProblem[element.index].remainingCPUBrustTime--;
        console.log(currentProblem[element.index].remainingCPUBrustTime);
        if (currentProblem[element.index].remainingCPUBrustTime <= 0) {
            const row = document.createElement("tr");
            let CT = i + 1;
            currentProblem[element.index].waitingTime =
                CT - element.arrvialTime - element.estimatedCPUBrustTime;
            currentProblem[element.index].turnAroundTime =
                CT - element.arrvialTime;
            row.innerHTML = `
   <td>${element.processName}</td>
   <td>${element.arrvialTime}</td>
   <td>${element.estimatedCPUBrustTime}</td>
   <td>${CT}</td>
   <td>${CT - element.arrvialTime}</td>
   <td>${CT - element.arrvialTime - element.estimatedCPUBrustTime}</td>
   <td>${CT - element.arrvialTime - element.estimatedCPUBrustTime}</td>
  `;
            table.appendChild(row);
        }
        updateGrantChart(1, element.color, i);
        i++;
    }
};

const ppjfFunction = () => {
    let element = currentProblem[0];
    let i = element.arrvialTime;
    updateGrantChart(contextSwitching, "#fff", i);
    let totalTime = 0;
    currentProblem.forEach((ele) => (totalTime += ele.estimatedCPUBrustTime));
    totalTime += contextSwitching;
    i += contextSwitching;
    console.log(totalTime, i);
    while (i < totalTime || element.remainingCPUBrustTime > 0) {
        let newElement;
        for (let j = 0; j < currentProblem.length; j++) {
            if (currentProblem[j].remainingCPUBrustTime === 0) continue;
            if (i < currentProblem[j].arrvialTime) break;
            else {
                if (newElement === undefined) newElement = currentProblem[j];
                else {
                    if (
                        currentProblem[newElement.index].priority <
                        currentProblem[j].priority
                    )
                        newElement = currentProblem[j];
                }
            }
        }
        if (element !== newElement && newElement !== undefined) {
            if (element.arrvialTime != newElement.arrvialTime) {
                totalTime += contextSwitching;
                updateGrantChart(contextSwitching, "#fff", i);
                i += contextSwitching;
            }
            element = newElement;
        }
        if (element.estimatedCPUBrustTime == element.remainingCPUBrustTime)
            currentProblem[element.index].responseTime =
            i - element.arrvialTime;
        currentProblem[element.index].remainingCPUBrustTime--;

        if (currentProblem[element.index].remainingCPUBrustTime === 0) {
            const row = document.createElement("tr");
            let CT = i + 1;
            currentProblem[element.index].waitingTime =
                CT - element.arrvialTime - element.estimatedCPUBrustTime;
            currentProblem[element.index].turnAroundTime =
                CT - element.arrvialTime;
            row.innerHTML = `
   <td>${element.processName}</td>
   <td>${element.arrvialTime}</td>
   <td>${element.estimatedCPUBrustTime}</td>
   <td>${CT}</td>
   <td>${CT - element.arrvialTime}</td>
   <td>${CT - element.arrvialTime - element.estimatedCPUBrustTime}</td>
   <td>${currentProblem[element.index].responseTime}</td>
  `;
            table.appendChild(row);
        }
        i++;
        updateGrantChart(1, element.color, i - 1);
    }
};

currentProblem = JSON.parse(JSON.stringify(firstProblem));
contextSwitching = 0;
updateProblem();

// ppjfFunction();
// pjfFunction();
// psjfFunction();
// sjfFunction();
// fcfsFunction();

const calculateAverage = () => {
    let avgWT = 0,
        avgTAT = 0,
        avgRT = 0;
    currentProblem.forEach((element) => {
        avgWT += element.waitingTime;
        avgTAT += element.turnAroundTime;
        avgRT += element.responseTime;
    });

    console.log(avgWT, avgTAT, avgRT);
    avgWT /= currentProblem.length;
    avgTAT /= currentProblem.length;
    avgRT /= currentProblem.length;

    avgWT = Math.round((avgWT + Number.EPSILON) * 100) / 100;
    avgTAT = Math.round((avgTAT + Number.EPSILON) * 100) / 100;
    avgRT = Math.round((avgRT + Number.EPSILON) * 100) / 100;

    awt.textContent = avgWT;
    art.textContent = avgRT;
    att.textContent = avgTAT;
};

document.querySelector("#problem1").addEventListener("click", () => {
    currentProblem = JSON.parse(JSON.stringify(firstProblem));
    contextSwitching = 0;
    updateProblem();
});

document.querySelector("#problem2").addEventListener("click", () => {
    currentProblem = JSON.parse(JSON.stringify(secondProblem));
    contextSwitching = 1;
    updateProblem();
});

document.querySelector("#createTable").addEventListener("click", () => {
    while (table.childElementCount > 1) table.removeChild(table.children[1]);
    while (grantChart.childElementCount > 0)
        grantChart.removeChild(grantChart.children[0]);
    let algo = document.querySelector("#algo").value;
    if (
        document.querySelector('input[name="problem"]:checked').value ===
        "first"
    ) {
        currentProblem = JSON.parse(JSON.stringify(firstProblem));
    } else {
        currentProblem = JSON.parse(JSON.stringify(secondProblem));
    }
    console.log(currentProblem);
    if (algo == "FCFS") fcfsFunction();
    else if (algo == "SJF") sjfFunction();
    else if (algo == "PSA") pjfFunction();
    else if (algo == "PSJF") psjfFunction();
    else ppjfFunction();
    calculateAverage();
});