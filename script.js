let startBtn = document.querySelector('.btnStart')
let btnMenu =  document.querySelector('.btnMenu')
let btnGame = document.querySelector('.btnStartGame')
let chooseBtn = document.querySelectorAll('.chooseBnt')

//PAGES
let startPage = document.querySelector('.main_page')
let menuPage = document.querySelector('.menu_page')
let gamePage = document.querySelector('.game_page')
let picForPuzzle = document.querySelector('.pic_for_puzzle')
let displayGame = document.querySelector('.display_game')
let display = document.querySelector('.display')
//PICTURES

let pic1 = "./img/1.jpg"
let pic2 = "./img/2.jpg"
let pic3 = "./img/3.jpg"



let slide_1 = document.querySelector('.slide_1')
let slide_2 = document.querySelector('.slide_2')
let slide_3 = document.querySelector('.slide_3')




function slider(){

    setInterval(()=>{
        slide_1.style.display = 'none'
        slide_2.style.display = 'block'
    },2000)

    setInterval(()=>{
        slide_2.style.display = 'none'
        slide_3.style.display = 'block'
    },4000)

    setInterval(()=>{
        slide_3.style.display = 'none'
        slide_1.style.display = 'block'
    },6000)

}

slider()


//EVENTS
startBtn.addEventListener('click',(e)=>{
    startPage.style.display = 'none'
    menuPage.style.display = 'flex'
    isCheckSlideWhile = false;
})




btnMenu.addEventListener('click', (e) => {
    menuPage.style.display = 'none'
    gamePage.style.display = 'flex'
})


let showResPic = ''

for (let i = 0; i < chooseBtn.length; i++) {
    let result = chooseBtn[i]
    result.addEventListener('click', (e) =>{
        btnMenu.style.display = 'block'


        switch (result.id){
            case('pic_1'):
                showResPic = pic1
                // renderImg()
                break;

            case ('pic_2'):
                showResPic = pic2
                // renderImg()
                break;

            case('pic_3'):
                showResPic = pic3
                // renderImg()
                break;
        }

    })

}


function renderShowImg(){
    return showResPic;
}

// function renderImg () {
//     let img = document.querySelector('.pic_for_puzzle')
//     img.src = showResPic
// }



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


export  {btnMenu,pic1,pic2,pic3,showResPic, renderShowImg};