function reSizing() {
    const columns = Math.floor(visualViewport.width / 7);

    const container = document.querySelector('main');
    container.innerHTML = '';

    for (let i = 0; i < columns; i++) {
        const div = document.createElement('div');

        div.classList.add('bar');
        div.style.height = `${(Math.random() * 50) + 1}vh`;
        container.append(div);
    }
}

visualViewport.addEventListener('resize', reSizing);

const timer = () => {
    let time = 0
    let timeDisplay = document.querySelectorAll('.timer');

    setInterval(() => {
        timeDisplay.innerHTML = ''
        let minutes = Math.floor(time % 6000);
        let seconds = Math.floor(time % 1000);
        time += 1
        timeDisplay.innerHTML = `timer: ${minutes}:${seconds}.${time}`
        console.log(minutes, ":", seconds, ".", time)
    }, 1);
}

addCompletedClass = async (index) => {
    let columns = document.querySelectorAll('.bar');
    columns[index].classList.add('bar-moving');
}

removeCompletedClass = async (index) => {
    let columns = document.querySelectorAll('.bar');
    columns[index].classList.remove('bar-moving');
}

codeWait = async (delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}

document.querySelector('#bubbleSort').addEventListener('click', async () => {
    const columnLengh = document.querySelectorAll('.bar').length;

    for (let i = 0; i < columnLengh; i++) {
        for (let index = 0; index < columnLengh - i - 1; index++) {
            let columns = document.querySelectorAll('.bar');

            if (parseFloat(columns[index].style.height) > parseFloat(columns[index + 1].style.height)) {
                await codeWait(10);
                await addCompletedClass(index)
                columns[index].insertAdjacentElement('beforebegin', columns[index + 1]);
            }
            await removeCompletedClass(index)
        }
        await addCompletedClass(columnLengh - 1 - i)
    }
});

document.querySelector('#insertionSort').addEventListener('click', async () => {
    let column = document.querySelectorAll('.bar');

    for (let i = 0; i < column.length - 1; i++) {
        let j = i;

        while (j >= 0 && parseFloat(column[j].style.height) > parseFloat(column[j + 1].style.height)) {
            await codeWait(60);
            await addCompletedClass(j + 1)
            column[j].insertAdjacentElement('beforebegin', column[j + 1]);
            await codeWait(60)
            await removeCompletedClass(j + 1)
            j -= 1;
            column = document.querySelectorAll('.bar');
        }
    }
});

reSizing();