function randomList(length) {
    let newList = [];

    while (true) {
        let num = (Math.random() * 50) + 1;

        if (!newList.includes(num)) {
            newList.push(num);
        }

        if (newList.length === length) {
            return newList;
        }
    }
}

function updateColumnNumber() {
    const bar = document.querySelectorAll('.bar')

    for (let i = 0; i < bar.length; i++) {
        bar[i].style.height = `${list[i]}vh`
    }
}

function bubbleSort() {
    for (let i = 0; i < list.length; i++) {
        for (let index = 0; index < list.length - i - 1; index++) {

            if (list[index] > list[index + 1]) {
                let large = list[index];
                let small = list[index + 1];

                list[index] = small;
                list[index + 1] = large;
            }


            updateColumnNumber()
        }
    }
}

function rezising() {
    list = randomList(Math.floor(visualViewport.width / 7));

    let container = document.querySelector('main')
    container.innerHTML = ''


    for (let i = 0; i < list.length; i++) {
        const div = document.createElement('div')
        div.classList.add('bar')
        container.append(div)
    }
    updateColumnNumber()
}

let list = []

visualViewport.addEventListener('resize', rezising)

rezising();

document.querySelectorAll('p')[2].addEventListener('click', bubbleSort);