var jobs = [];
const todokey = "ToDoList";

function init(){
    if(localStorage.getItem(todokey) == undefined){
        jobs = [
            {
                name: "Học bài",
                timer: 60
            },
            {
                name: "Chơi game",
                timer: 30
            }     
        ]

        localStorage.setItem(todokey, JSON.stringify(jobs))
    }
    else{
        jobs = JSON.parse(localStorage.getItem(todokey))
    }
}

let start = {
    index: 0,
    status: "focus"
}

function renderJob(){
    let tbJob = document.querySelector('table>tbody');
    let htmls = jobs.map(function(job, index){
        return `
                <tr class="trText" id="tr_${index}">
                    <td>${index + 1}</td>
                    <td>${job.name}</td>
                    <td>${job.timer}</td>   
                    <td class="text-center">
                        <a id="done_${index}" href="javascript:;" onclick="makeDone(${index})">
                        <i class="fas fa-check"></i>
                        </a>
                        <a style="font-size: 15px" id="undone_${index}" class="d-none" href="javascript:;" onclick="makeUndone(${index})">
                        <i style="font-size: 15px" class="far fa-window-close"></i>
                        </a>
                        <a id="remove_${index}" href="javascript:;" onclick="removeJob(${index})">
                        <i class="fas fa-trash"></i>
                        </a>
                    </td>
                </tr>
                `
    })

  tbJob.innerHTML = htmls.join("");
}

btnStart = function(){
    document.querySelector(`#done_`+start.index).classList.add("d-none");
    document.querySelector(`#remove_`+start.index).classList.add("d-none");
    document.querySelector(`#undone_`+start.index).classList.add("d-none");
}
 function btnReset(index){
    document.querySelector(`#done_`+start.index).classList.remove("d-none");
    document.querySelector(`#remove_`+start.index).classList.remove("d-none");
    document.querySelector(`#undone_`+start.index).classList.add("d-none");
} 
 function btnPause(index){
    document.querySelector(`#done_`+start.index).classList.remove("d-none");
    document.querySelector(`#remove_`+start.index).classList.remove("d-none");
} 

function makeDone(index){
    //document.querySelector(`#tr_${index}>td:nth-child(2)`).classList.add("make-done");
    start.index = index;
    document.querySelector(`#done_${index}`).classList.add("d-none");
    document.querySelector(`#undone_${index}`).classList.remove("d-none");
    document.getElementById('focusTime').value = jobs[index].timer;
    document.getElementById('idName').innerHTML = jobs[index].name;
    
}
function makeUndone(index){
    document.querySelector(`#tr_${index}>td:nth-child(2)`).classList.remove("make-done");   
    document.querySelector(`#done_${index}`).classList.remove("d-none");
    document.querySelector(`#undone_${index}`).classList.add("d-none");
    document.getElementById('focusTime').value = 0;
}

function removeJob(index){
    let confirmed =  window.confirm("Are you sure to remove this job?");
    if(confirmed){
        jobs.splice(index,1);
        renderJob();
        localStorage.setItem(todokey, JSON.stringify(jobs))
    }
}


function createJob(){
    let jobName = document.querySelector("#jobname").value;
    let jobTimer = document.querySelector("#jobtime").value;
    let job = {
        name: jobName,
        timer: jobTimer
    }
    if(jobName === ''){
        alert("Job name is required")
        return;
    }
    if(jobTimer === ''){
        alert("Job timer is required")
        return;
    }
    jobs.push(job);
    localStorage.setItem(todokey, JSON.stringify(jobs))
    renderJob();
    clearform()
    
}
function clearform(){
    document.querySelector("#jobname").value = "";
    document.querySelector("#jobtime").value = "";
}
init();
renderJob();
