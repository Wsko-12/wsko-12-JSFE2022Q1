

const burgerButton = {
    button: document.querySelector("#burgerButton"),
    flag:false,
    menu: document.querySelector("#burgerMenu"),
    mainLogo:document.querySelector("#mainLogo"),
    overlay:document.querySelector('#burgerMenuOverlay'),
    linksContainer:document.querySelector('#linksContainer'),
    open: function(){
        const html =  document.querySelector('html');
        if(this.flag){
            this.flag = false;
            this.menu.style.right = '-100%';
            this.menu.style.visibility = 'hidden';

            this.button.classList.remove('header__burger_active');
            
            this.mainLogo.style.visibility = 'visible';
            this.overlay.style.display = 'none';
    
    
            html.style.maxHeight = 'auto';
            html.style.overflow = 'auto';
            this.button.style.position = 'static';
    
        }else{
            this.flag = true;
            this.menu.style.visibility = 'visible';
            this.menu.style.right = '0px';
            this.button.classList.add('header__burger_active');
            this.mainLogo.style.visibility = 'hidden';
            this.overlay.style.display = 'block';
    
            html.style.maxHeight = '100vh';
            html.style.overflow = 'hidden';
            this.button.style.position = 'fixed';
            this.button.style.right = '10px';
    
    
            
      
        }
    }
};


burgerButton.button.addEventListener('click',()=>{burgerButton.open()});
burgerButton.linksContainer.addEventListener('click',(e)=>{
    if(e.target != burgerButton.linksContainer){
        if(burgerButton.flag){
            burgerButton.open();
        };
    };
});
burgerButton.overlay.addEventListener('click', ()=>{
    if(burgerButton.flag){
        burgerButton.open();
    };
});

window.addEventListener('resize',()=>{
    if(burgerButton.flag){
        burgerButton.open();
    }
})
