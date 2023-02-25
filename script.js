const dragAbleList = document.getElementById('dragable-list');
const check = document.getElementById("check");

const richestPeopleList = [
    'Bernard Arnault & family',
    'Elon Musk',
    'Jeff Bezos',
    'Larry Ellison',
    'Warren Buffett',
    'Bill Gates',
    'Carlos slim Helu',
    'Mukesh Ambani',
    'Steve Ballmer',
    'Larry Page'
]


//store listItem
const listItems = []

let dragStarIndex;

createList()

//insert list items into DOM
function createList() {
    [...richestPeopleList]
        .map(a => ({ value: a, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
                .map(a => a.value)
                    .forEach((people, index) => {
                        const listItem = document.createElement('li');

                        // listItem.classList.add("wrong")

                        listItem.setAttribute("data-index", index);

                        listItem.innerHTML = `
                            <span class="number">${index + 1}</span>
                            <div class="draggable" draggable="true">
                                <p class="person-name">${people}</p>
                                <i class="fas fa-grip lines"></i>
                            </div>
                            `;

                        listItems.push(listItem);

                        dragAbleList.appendChild(listItem);
        });

        addEventListers()
}

function dragStart() {
    dragStarIndex = +this.closest('li').getAttribute('data-index');
    
    
}

function dragOver(e) {
    e.preventDefault()

}

function dragEnter() {
    this.classList.add('over')

}

function dragLeave() {
    this.classList.remove('over')

}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItem(dragStarIndex, dragEndIndex);
    this.classList.remove('over')

}

//swap list items
function swapItem(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

//Event Listeners 
function addEventListers () {
    const draggableAll = document.querySelectorAll('.draggable');
    const dragListItem = document.querySelectorAll('.dragable-list li');
    
    
    draggableAll.forEach(drag => {
        drag.addEventListener('dragstart', dragStart);
    })

    dragListItem.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}

check.addEventListener('click', () => {
    listItems.forEach((item, index) => {
        const personName = item.querySelector('.draggable').innerText.trim();

        if(personName !== richestPeopleList[index]){
            item.classList.add('wrong');
        } else {
            item.classList.remove('wrong');
            item.classList.add('right');
        }
    })
})