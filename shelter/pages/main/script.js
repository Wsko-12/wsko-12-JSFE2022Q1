import PETS from '../../assets/pets.json' assert { type: "json" };

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
            this.button.classList.remove('header__burger_active');
            
            this.mainLogo.style.visibility = 'visible';
            this.overlay.style.display = 'none';
    
    
            html.style.maxHeight = 'auto';
            html.style.overflow = 'scroll';
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
});

class PetCard{
    constructor(data){
        const card = document.createElement('figure');
        card.classList.add('pet-card', 'our-friends__pet-card');

        const image = document.createElement('img');
        const link = `../../assets/images/main/pets-${data.name.toLowerCase()}.png`;
        image.src = link;
        image.alt = data.name;
        image.classList.add('pet-card__image');
        
        const caption = document.createElement('figcaption');
        caption.classList.add('pet-card__title');
        caption.innerHTML = data.name;

        const button = document.createElement('button');
        button.classList.add('button-add', 'pet-card__button');
        button.innerHTML = 'Learn More'

        card.append(image, caption, button);

        this.element = card;
    };
}



const slider = {
    prevBtn: document.querySelector('#sliderPrevBtn'),
    nextBtn: document.querySelector('#sliderNextBtn'),
    window: document.querySelector('#sliderWindow'),
    prev: [],
    inProgress:false,
    cardsCount:0,
    generate(useOld,nextButton){
        if(this.inProgress){
            return;
        };
        this.inProgress = true;
        const windowSize = window.innerWidth
        let count = 3;
        if(windowSize >= 768 && windowSize < 1280 ){
            count = 2;
        }else if(windowSize < 768){
            count = 1;
        };
        this.cardsCount = count;
        const generated = useOld ? [...this.prev] : [];
        while(generated.length < count){
            const id = Math.round(Math.random()*(PETS.length-1));
            if(!~this.prev.indexOf(id) && !~generated.indexOf(id)){
                generated.push(id);
            };
        };
        this.prev = [...generated];
        generated.length = count;
        const cards = generated.map(id=>{
            return new PetCard(PETS[id]).element;
        });
        this.animate(cards,useOld,nextButton);
    },
    animate(newCards,useOld,nextButton){
        const childrenBefore = [...this.window.children];

        //start
        if(childrenBefore.length === 0){
            this.window.append(...newCards);
            this.inProgress = false;
            return;
        }
        if(useOld){
            this.window.innerHTML = '';
            this.window.append(...newCards);
            this.inProgress = false;
            return;
        }
        //if we shrink the screen, slider still will have 3 or 2 card
        //so, we need to delete extra cards before we add new for better and correct animation
        for(let i = 0; i < childrenBefore.length;i++){
            if(childrenBefore[i]){
                if(i > this.cardsCount){
                    childrenBefore[i].remove();
                };
            };
        };

        //now we can add new pet cards and move slider;
        const speed = 500

        if(nextButton){
            const windowWidthBefore = this.window.getBoundingClientRect().width * 1.09;
            this.window.style.transitionDuration = speed + 'ms';
            this.window.append(...newCards);
            //move slider
            this.window.style.transform = `translate(-${windowWidthBefore}px)`;
            //and now we need to delete old cards
            setTimeout(()=>{
                const childrenAfter = [...this.window.children];
                let needToDelete = 0;
                for(let i = childrenAfter.length-1; i >= 0;i--){
                    needToDelete++;
                    if(needToDelete > this.cardsCount){
                        //use childrenBefore to not shift the index in current;
                        childrenBefore[i].remove();
                    };
                };
                this.window.style.transitionDuration ='0ms';
                this.window.style.transform = 'translate(0)';
                this.inProgress = false;
            },speed);
        }else{
            const windowWidthBefore = this.window.getBoundingClientRect().width * 1.09;
            //make slider shift because we add new elements in start of window
            this.window.style.transitionDuration = '0ms';

            this.window.style.transform = `translate(-${windowWidthBefore}px)`;
            this.window.prepend(...newCards);

            //move slider
            setTimeout(()=>{
                this.window.style.transitionDuration = speed + 'ms';
                this.window.style.transform = `translate(0)`;



            },100);

            // //delete old
            setTimeout(()=>{

                const childrenAfter = [...this.window.children];
                for(let i = childrenAfter.length-1;i>=0;i--){
                    if(i >= this.cardsCount){
                        childrenAfter[i].remove();
                    };
                };

                this.inProgress = false;
            },speed);
        }
    },
    init(){
        this.prevBtn.addEventListener('click',()=>{this.generate(false)});
        this.nextBtn.addEventListener('click',()=>{this.generate(false,true)});
        window.addEventListener('resize',()=>{this.generate(true,true,true)});
        this.generate();
    },  
};
slider.init();