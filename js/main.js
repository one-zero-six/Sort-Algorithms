let sorting = false

reSizing = () => {
    sorting = false;
    stepCounter(0);
    document.querySelector('#timer').innerHTML = '00:00';
    const columns = Math.floor(visualViewport.width / 7);
    const container = document.querySelector('main');

    container.innerHTML = '';

    for (let i = 0; i < columns; i++) {
        const div = document.createElement('div');

        div.classList.add('bar');
        div.style.height = `${(Math.random() * 50) + 1}vh`;
        container.append(div);
    }

    const columnAmount = document.querySelector('#column-amount');
    columnAmount.innerHTML = columns;
}

addCompletedClass = async (index) => {
    let columns = document.querySelectorAll('.bar');
    columns[index].classList.add('bar-moving');
}

removeCompletedClass = async (index) => {
    let columns = document.querySelectorAll('.bar');
    columns[index].classList.remove('bar-moving');
}

codeWait = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 5)
    })
}

stepCounter = (step) => {
    document.querySelector('#steps').innerHTML = `${step}`
}

setTime = (time) => {
    let minutes = parseInt(time / 60, 10);
    let seconds = parseInt(time % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.querySelector('#timer').innerHTML = `${minutes}:${seconds}`
}

visualViewport.addEventListener('resize', reSizing);

document.querySelector('#bubbleSort').addEventListener('click', async () => {

    if (!sorting) {
        sorting = true;

        let step = 0, time = 1;
        const columnLengh = document.querySelectorAll('.bar').length;
        let timer = setInterval(() => setTime(time++), 1000);

        for (let i = 0; i < columnLengh; i++) {
            for (let index = 0; index < columnLengh - i - 1; index++) {
                if (!sorting) {
                    clearInterval(timer);
                    return null;
                }

                stepCounter(step++)
                let columns = document.querySelectorAll('.bar');

                if (parseFloat(columns[index].style.height) > parseFloat(columns[index + 1].style.height)) {
                    await codeWait();
                    await addCompletedClass(index)
                    columns[index].insertAdjacentElement('beforebegin', columns[index + 1]);
                }
                await removeCompletedClass(index)
            }
            await addCompletedClass(columnLengh - 1 - i)
        }
        sorting = false;
        clearInterval(timer);
    }
});

document.querySelector('#insertionSort').addEventListener('click', async () => {
    if (!sorting) {
        sorting = true

        let step = 0, time = 1;
        let timer = setInterval(() => setTime(time++), 1000);
        let column = document.querySelectorAll('.bar');

        for (let i = 0; i < column.length - 1; i++) {
            let j = i;

            while (j >= 0 && parseFloat(column[j].style.height) > parseFloat(column[j + 1].style.height)) {
                if (!sorting) {
                    clearInterval(timer);
                    return null;
                }

                stepCounter(step++)
                await codeWait();
                await addCompletedClass(j)
                await addCompletedClass(j + 1)
                column[j].insertAdjacentElement('beforebegin', column[j + 1]);
                j -= 1;
                column = document.querySelectorAll('.bar');
            }
        }
        sorting = false;
        clearInterval(timer);
    }
});

reSizing();