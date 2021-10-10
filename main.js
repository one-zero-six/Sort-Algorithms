function randomList(length) {
    let newList = []

    while (true) {
        let num = Math.floor(Math.random() * length) + 10
        if (!newList.includes(num)) {
            newList.push(num)
        }
        if (newList.length === length) {
            break
        }
    }
    return newList
}


function bubbleSort(list) {
    for (let i = 0; i < list.length; i++) {
        for (let index = 0; index < list.length - i - 1; index++) {

            if (list[index] > list[index + 1]) {
                let large = list[index]
                let small = list[index + 1]

                list[index] = small
                list[index + 1] = large
            }
        }
    }
}


const myList = randomList(40)
console.log(myList)

const sorted = bubbleSort(myList)

console.log(myList)