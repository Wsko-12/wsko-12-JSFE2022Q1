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
    constructor(id){
        const data = PETS[id];
        const card = document.createElement('figure');
        card.classList.add('pet-card', 'our-friends__pet-card');
        card.dataset.pet_id = id;

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
        button.innerHTML = 'Learn more';

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
    body:document.querySelector('#sliderBody'),
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
            return new PetCard(id).element;
        });
        this.animate(cards,useOld,nextButton);
    },
    openModal(id){
        const modal = new Modal(id);
        document.querySelector('main').insertAdjacentElement('beforeend',modal.element);
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
        const speed = 500;

        if(nextButton){
            const bodySize = this.body.getBoundingClientRect().width;
            const windowWidthBefore = this.cardsCount === 3 ? bodySize+5 : bodySize-40;
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
            },speed+20);
        }else{
            const bodySize = this.body.getBoundingClientRect().width;
            const windowWidthBefore = this.cardsCount === 3 ? bodySize+5 : bodySize-40;
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
            },speed+20);
        }
    },
    init(){
        this.prevBtn.addEventListener('click',()=>{this.generate(false)});
        this.nextBtn.addEventListener('click',()=>{this.generate(false,true)});
        window.addEventListener('resize',()=>{this.generate(true,true,true)});
        this.generate();


        this.window.addEventListener('click', (e)=>{
            if(e.target != this.window){
                const card = e.path.find(item => {
                    if(item.tagName === "FIGURE"){
                        return item;
                    };
                });
                this.openModal(+card.dataset.pet_id);
            };
        });
    },  
};
slider.init();






class Modal{
    constructor(id){
        const data = PETS[id];
        const overlay = document.createElement('section');
        overlay.classList.add('modal__overlay');

        const container = document.createElement('div');
        container.classList.add('modal__container');

        const button = document.createElement('button');
        button.classList.add('modal__button','slider-button','slider-button_cross');
        button.innerHTML = `
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
            </svg>
        `;

        const card = this.generateCard(data);

        container.append(card,button);
        overlay.append(container);


        overlay.addEventListener('click',(e)=>{
            if(e.target === overlay || e.target === button){
                this.element.remove();
            };

        });

        this.element = overlay;
    };

    generateCard(data){
        const figure = document.createElement('figure');
        figure.classList.add('modal__card');


        const image = document.createElement('img');
        const link = `../../assets/images/500px/${data.name.toLocaleLowerCase()}.png`;
        image.src = link;
        image.alt = data.name;
        image.classList.add('modal__image');

        const figcaption = this.generateCardDescription(data);

        figure.append(image,figcaption);

        return figure;
    };

    generateCardDescription(data){
        const figcaption = document.createElement('figcaption');
        figcaption.classList.add('modal__content');

        const title = document.createElement('h3');
        title.classList.add('modal__content_title');
        title.innerHTML = data.name;

        const subtitle = document.createElement('h4');
        subtitle.classList.add('modal__content_subtitle');
        subtitle.innerHTML = data.type + " - " + data.breed;

        const description = document.createElement('p');
        description.classList.add('modal__content_text');
        description.innerHTML = data.description; 

        const list = document.createElement('ul');
        list.classList.add('modal__content_list');

        const itemsKeys = ['Age', 'Inoculations', 'Diseases', 'Parasites'];

        const listItems = itemsKeys.map(item => {
            const _data = data[item.toLocaleLowerCase()];
            const element = document.createElement('li');
            element.classList.add('modal__content_list-item');
            let content = `<b>${item}: </b>`
            if(Array.isArray(_data)){
                _data.forEach(str =>{
                    content += str;
                });
            }else{
                content += _data;
            }
            element.innerHTML = content;
            return element;
        });
        list.append(...listItems);

        figcaption.append(title,subtitle,description,list);

        return figcaption
    }



}