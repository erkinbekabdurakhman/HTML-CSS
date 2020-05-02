//Select Element
const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Class Names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH= "lineThrough";
// Varibales
let LIST, id;
//get item from local storage
let data = localStorage.getItem("TODO");

// check if data is not empty array
if(data){
    LIST = JSON.parse(data);
    id = list.length   // set the id the last
    loadList(LIST);    // load the list to the user

} else {
    //if data is not empty
    LIST = [];
    id = 0;
}

// load the item to userface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash); 
    });
}
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})
// show local time
const options = {weekday: "long", month: "short", day:"numeric"};
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash){
    if (trash){
        return
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                 </li>`
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}
//addToDo("Drink coffee");

//Add an item to the list of user
document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        // if the input isnt empty
        if(toDo){
            addToDo(toDo, id, false, false);
        }
        LIST.push({
            name: toDo,
            id: id,
            done: false,
            trash: false
        })
        //add item to the local storage (this code must be added)
        localStorage.setItem("TODO", JSON.stringify((LIST)));

        id++;
        input.value = "";
    }
})
//addToDo("Coffee", 1, false, false)

// function complete ToDo
function completeToDO(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}
//remove ToDo
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;

}
// target Items dinamically
list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value;   // complete or delete

    if(elementJob == "complete"){
        completeToDO(element);
    } else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add item to the local storage (this code must be added)
    localStorage.setItem("TODO", JSON.stringify((LIST)));
})