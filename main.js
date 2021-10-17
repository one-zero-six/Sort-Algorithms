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

addMoveClass = async (index) => {
    let columns = document.querySelectorAll('.bar');
    columns[index].classList.add('bar-moving');
}

removeMoveClass = async (columns, index) => {
    columns[index + 1].classList.remove('bar-moving');
}

codeWait = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 5)
    })
}

document.querySelector('#bubbleSort').addEventListener('click', async () => {
    const columnLengh = document.querySelectorAll('.bar').length;

    for (let i = 0; i < columnLengh; i++) {
        for (let index = 0; index < columnLengh - i - 1; index++) {
            let columns = document.querySelectorAll('.bar');

            await codeWait()
            if (parseFloat(columns[index].style.height) > parseFloat(columns[index + 1].style.height)) {
                columns[index].insertAdjacentElement('beforebegin', columns[index + 1]);
            }
        }
        await addMoveClass(columnLengh - 1 - i)
    }
});

reSizing();