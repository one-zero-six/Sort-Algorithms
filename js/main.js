let sorting = false;
const currentYear = new Date();

const reSizing = () => {
    sorting = false;
    stepCounter(0);
    document.querySelector('#timer').innerHTML = '00:00';
    const columns = Math.floor(visualViewport.width / 37);
    const container = document.querySelector('main');

    container.innerHTML = '';

    for (let i = 0; i < columns; i++) {
        const mainDiv = document.createElement('div');
        const div = document.createElement('div');
        const span = document.createElement('span');
        let height = Math.floor((Math.random() * 50) + 10);

        div.classList.add('bar');
        span.classList.add('bar-number');

        div.style.height = `${height}vh`;
        span.innerHTML = `${height - 10}`;

        mainDiv.append(span);
        mainDiv.append(div);
        container.append(mainDiv);
    }

    document.querySelector('#column-amount').innerHTML = columns;
};

const codeWait = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 50)
    })
}

const addSortedColor = async (index) => {
    document.querySelectorAll('.bar')[index].classList.add('bar-done');
}

const addCheckColor = async (index) => {
    document.querySelectorAll('.bar')[index].classList.add('bar-check');
}

const addMinColor = async (index) => {
    document.querySelectorAll('.bar')[index].classList.add('bar-min');
}

const removeCheckColor = async (index) => {
    document.querySelectorAll('.bar')[index].classList.remove('bar-check');
}

const removeMinColor = async (index) => {
    document.querySelectorAll('.bar')[index].classList.remove('bar-min');
}

const checkSize = async (index1, index2) => {
    let value1 = parseFloat(document.querySelectorAll('.bar')[index1].style.height);
    let value2 = parseFloat(document.querySelectorAll('.bar')[index2].style.height);

    await codeWait();

    if (value1 < value2) {
        return true;
    }
    return false;
}

const changeElement = async (index1, index2) => {
    const col1 = document.querySelectorAll('.bar')[index1].parentElement;
    const col2 = document.querySelectorAll('.bar')[index2].parentElement;
    await codeWait();
    document.querySelectorAll('.bar')[index1].parentElement.insertAdjacentElement('beforebegin', col2);
    await codeWait();
    document.querySelectorAll('.bar')[index2].parentElement.insertAdjacentElement('beforebegin', col1);

}

const stepCounter = (step) => {
    document.querySelector('#steps').innerHTML = `${step}`;
}

const setTime = (totalSeconds) => {
    let minutes = parseInt(totalSeconds / 60, 10);
    let seconds = parseInt(totalSeconds % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.querySelector('#timer').innerHTML = `${minutes}:${seconds}`;
}



const insertionSort = async () => {
    if (sorting) {
        reSizing()
    }

    sorting = true;

    document.querySelector('#insertionSort').classList.add('selected-algorithm')

    let step = 1;
    let time = 1;
    let timer = setInterval(() => setTime(time++), 1000);
    let n = document.querySelectorAll('.bar').length;

    for (let i = 0; i < n - 1; i++) {
        let j = i;

        while (j >= 0 && await checkSize(j + 1, j)) {
            if (!sorting) {
                clearInterval(timer);
                return undefined;
            }
            stepCounter(step++);
            await addCheckColor(j);
            await addCheckColor(j + 1);
            await codeWait();
            await changeElement(j, j + 1);
            await removeCheckColor(j);
            await removeCheckColor(j + 1);
            if (await checkSize(i, j)) {
                await addSortedColor(j)
            }
            j -= 1;
        }
    }

    for (let i = 0; i < n; i++) {
        await codeWait()
        await addSortedColor(i)
    }

    sorting = false;
    clearInterval(timer);
};

const selectionSort = async () => {
    if (!sorting) {
        sorting = true;

        let step = 1, time = 1;
        let timer = setInterval(() => setTime(time++), 1000);
        let min_idx, column;
        let n = document.querySelectorAll('.bar').length;

        for (let i = 0; i < n; i++) {
            min_idx = i;

            for (let j = i + 1; j < n; j++) {
                if (!sorting) {
                    clearInterval(timer);
                    return null;
                }

                await addMinColor(min_idx);
                await addCheckColor(j);
                await codeWait();

                if (await checkSize(j, min_idx)) {
                    await removeMinColor(min_idx);
                    min_idx = j;
                }
                await removeCheckColor(j);
                await codeWait();

                stepCounter(step++);
            }
            await removeMinColor(min_idx);
            await changeElement(i, min_idx);
            await addSortedColor(i);
        }
        sorting = false;
        clearInterval(timer);
    }
};

const bubbleSort = async () => {
    if (!sorting) {
        sorting = true;

        let step = 1, time = 1;
        const n = document.querySelectorAll('.bar').length;
        let timer = setInterval(() => setTime(time++), 1000);

        for (let i = 0; i < n; i++) {
            for (let index = 0; index < n - i - 1; index++) {
                if (!sorting) {
                    clearInterval(timer);
                    return null;
                }

                stepCounter(step++);
                await addCheckColor(index);
                if (await checkSize(index + 1, index)) {
                    await codeWait();
                    await changeElement(index + 1, index);
                }
                await removeCheckColor(index);
            }
            await removeCheckColor(n - 1 - i);
            await addSortedColor(n - 1 - i);
        }
        sorting = false;
        clearInterval(timer);
    }
};


visualViewport.addEventListener('resize', reSizing);

document.querySelector('#insertionSort').addEventListener('click', insertionSort);
document.querySelector('#selectionSort').addEventListener('click', selectionSort);
document.querySelector('#bubbleSort').addEventListener('click', bubbleSort);

document.querySelector('#copyrightyear').after(`${currentYear.getFullYear()} Edel Perez`);

// reSizing();