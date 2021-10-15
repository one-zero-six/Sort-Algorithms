function bubbleSort() {
    const columns = document.querySelectorAll('.bar')

    for (let i = 0; i < columns.length; i++) {
        for (let index = 0; index < columns.length - i - 1; index++) {

            if (parseFloat(columns[index].style.height) > parseFloat(columns[index + 1].style.height)) {
                let large = columns[index].style.height;
                let small = columns[index + 1].style.height;

                columns[index].style.height = small;
                columns[index + 1].style.height = large;
            }
        }
    }
}

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
document.querySelectorAll('p')[2].addEventListener('click', bubbleSort);

reSizing();