

const burgerButton = {
    button: document.querySelector("#burgerButton"),
    flag:false,
    menu: document.querySelector("#burgerMenu"),
    mainLogo:document.querySelector("#mainLogo")
}
burgerButton.button.addEventListener('click',openBurgerMenu);

function openBurgerMenu(){
    // console.log(burgerButton.flag);
    const html =  document.querySelector('html');
    if(burgerButton.flag){
        burgerButton.flag = false;
        burgerButton.menu.style.right = '-100%';
        burgerButton.button.classList.remove('header__burger_active');
        
        burgerButton.mainLogo.style.visibility = 'visible';

        html.style.maxHeight = 'auto';
        html.style.overflow = 'scroll';

    }else{
        burgerButton.flag = true;
        burgerButton.menu.style.visibility = 'visible';
        burgerButton.menu.style.right = '0px';
        burgerButton.button.classList.add('header__burger_active');
        burgerButton.mainLogo.style.visibility = 'hidden';
        html.style.maxHeight = '100vh';
        html.style.overflow = 'hidden';


        
  
    }
}

window.addEventListener('resize',()=>{
    if(burgerButton.flag){
        openBurgerMenu();
    }
})
