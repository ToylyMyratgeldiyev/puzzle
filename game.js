import {btnMenu,pic1,pic2,pic3,showResPic, renderShowImg} from './script.js'

let containerNode = document.getElementById('puzzle');
const itemNodes = Array.from(containerNode.querySelectorAll('.item'))
const countItems = 9;




let urlImg;



btnMenu.addEventListener('click', (e)=>{
    renderShowImg()
    if(showResPic){
        console.log(showResPic)
    }
    itemNodes.map((item,index) => {
        switch(index){
            case (0) :
                item.style.background = `url('${showResPic}') 0px 0px no-repeat`
                break;
            case (1) :
                item.style.background = `url('${showResPic}') -150px 0px no-repeat`
                break;
            case (2) :
                item.style.background = `url('${showResPic}') -300px 0px no-repeat`
                break;
            case (3) :
                item.style.background = `url('${showResPic}') 0px -150px no-repeat`
                break;
            case (4) :
                item.style.background = `url('${showResPic}') -150px -150px no-repeat`
                break;
            case (5) :
                item.style.background = `url('${showResPic}') -300px -150px no-repeat`
                break;
            case (6) :
                item.style.background = `url('${showResPic}') 0px -300px no-repeat`
                break;
            case (7) :
                item.style.background = `url('${showResPic}') -150px -300px no-repeat`
                break;
        }
    })
})


















// if (itemNodes.length !== 8){
//     throw new Error(`Должно быть ровно ${countItems} items in HTML`)
// }

//1) Position
itemNodes[countItems - 1].style.display = 'none';   //удаляем последний элемент из массива//
let matrix = getMatrix(
    itemNodes.map(item =>Number(item.dataset.matrixId))
);

setLocationItems(matrix)


// 2) Shuffle
document.getElementById('shuffle').addEventListener('click', ()=>{
    const shuffledArray = shuffleArray(matrix.flat())
    matrix = getMatrix(shuffledArray)
    setLocationItems(matrix)
})





//3)Change position by click
const blankNumber = 9;
containerNode.addEventListener('click',(e)=>{
    const buttonNode = e.target.closest('button')
    if (!buttonNode){
        return
    }
    const buttonNumber = Number(buttonNode.dataset.matrixId)
    const buttonCoords = findCoordinatesByNumber(buttonNumber,matrix)
    const blankCoords = findCoordinatesByNumber(blankNumber,matrix)
    const isValid = isValidForSwap(buttonCoords,blankCoords)


    console.log(isValid)

    if (isValid){
        swap(blankCoords,buttonCoords,matrix)
        setLocationItems(matrix)
    }
})







//Helpers
function getMatrix(arr){
    const matrix = [[],[],[]]
    let y = 0;
    let x = 0;
    for (let i = 0; i < arr.length; i++) {
        if (x >= 3){
            y++;
            x=0;
        }
        matrix[y][x]=arr[i]
        x++;
    }
    return matrix;
}

function setLocationItems(matrix){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const value = matrix[y][x]
            const node = itemNodes[value - 1];
            setNodeStyles(node,x,y)
        }
    }
}

function setNodeStyles(node,x,y){
    const shiftPs = 100;
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`
}

//перемешивает массив
function shuffleArray(arr) {
    return arr
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

//находит x и y в двухмерном массиве
function findCoordinatesByNumber(number, matrix){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
         if (matrix[y][x] === number){
             return {x,y}
         }
        }
    }
    return null;
}

function isValidForSwap(coords1, coords2){
    const diffX = Math.abs(coords1.x - coords2.x)
    const diffY = Math.abs(coords1.y - coords2.y)

    return (diffX === 1 || diffY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y)

}


function swap(coords1, coords2, matrix){
    const coords1Number = matrix[coords1.y][coords1.x];
    matrix [coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
    matrix[coords2.y][coords2.x] = coords1Number

    if(isWon(matrix)){
        addWonClass();
    }
}


const winFlatArr = new Array(9).fill(0).map((item,i) => i + 1)
function isWon(matrix){
    const flatMatrix = matrix.flat();
    for(let i = 0; i < winFlatArr.length; i++){
        if(flatMatrix[i] !== winFlatArr[i]){
            return false
        }
    }
    return true
}


const wonClass = 'puzzleWon'
function addWonClass(){
    setTimeout(()=>{
        containerNode.classList.add(wonClass)
        document.querySelector('.display_game').style.backgroundColor = 'green'
        setTimeout(() => {
            containerNode.classList.remove(wonClass)
            document.querySelector('.display_game').style.backgroundColor = 'white'

        }, 1000);
    },200)
}

