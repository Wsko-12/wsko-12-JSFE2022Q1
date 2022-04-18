const PETS = [
    {
      "name": "Jennifer",
      "img": "../../assets/images/jennifer.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "img": "../../assets/images/sophia.png",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "img": "../../assets/images/woody.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "img": "../../assets/images/scarlett.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "img": "../../assets/images/katrine.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "img": "../../assets/images/timmy.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "img": "../../assets/images/freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "img": "../../assets/images/charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
];

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
        }else{
            this.flag = true;
            this.menu.style.visibility = 'visible';
            this.menu.style.right = '0px';
            this.button.classList.add('header__burger_active');
            this.mainLogo.style.visibility = 'hidden';
            this.overlay.style.display = 'block';
    
            html.style.maxHeight = '100vh';
            html.style.overflow = 'hidden';
        };
    }
}
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
        card.classList.add('pet-card', 'pets__card');
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
};




const pagination = {
    mainArr:[],
    window:document.querySelector('#pagination'),
    firstBtn:document.querySelector('#pagination_first'),
    prevBtn:document.querySelector('#pagination_prev'),
    nextBtn:document.querySelector('#pagination_next'),
    lastBtn:document.querySelector('#pagination_last'),
    pageNumber:document.querySelector('#pagination_number'),

    nextActive:true,
    prevActive:false,
    inProgress:false,
    current_i:0,
    init(){
        this.generateMainArr();

        this.firstBtn.addEventListener('click', ()=>{
            this.changePage(-Infinity);
        });
        this.nextBtn.addEventListener('click', ()=>{
            this.changePage(1);
        });
        this.prevBtn.addEventListener('click', ()=>{
            this.changePage(-1);
        });
        this.lastBtn.addEventListener('click', ()=>{
            this.changePage(Infinity);
        });
        window.addEventListener('resize',()=>{
            this.changePage(0);
        });

        this.window.addEventListener('click', (e)=>{
            if(e.target != this.window){
                const path = e.path || (e.composedPath && e.composedPath());
                const card = path.find(item => {
                    if(item.tagName === "FIGURE"){
                        return item;
                    };
                });
                this.openModal(+card.dataset.pet_id);
            };
        });
        this.changePage(0);
    },
    generateMainArr (){
        const base = [0,1,2,3,4,5,6,7];
        for(let i = 0;i<2;i++){
            //Это ужас, признаю. Иначе я уходил в бесконечность или зависало надолго
            //Тут алгоритм хоть и захаркодил, но он работает быстро
            //Можно еще его описать наподобие пузырьковой сортировки массива, где повторяещиеся элементы будут уходить,
            //Но там тоже тогда будет очень большая сложность алгоритма


            //генерируем три 8-ки
            let a_1 = [...base];
            let a_2 = [...base];
            let a_3 = [...base];

            //первую 8-ку можно рандомить как угодно
            a_1 = a_1.sort(()=> 0.5 - Math.random());

            //рандомним вторую 8-ку.
            a_2 = a_2.sort(()=> 0.5 - Math.random());
            //теперь, во второй восьмерке первые 4 числа не должны быть такие, как последние 2 в первой 8-ке;
            let i_1 = a_2.indexOf(a_1[6]);
            const i_2 = a_2.indexOf(a_1[7]);

            //если они на первых местах, то кидаем их в конец
            if(i_1 < 4){
                //но в конец так, чтобы не наткнуться на еще какой-нибудь из a_1;
                for(let i = 4;i<8;i++){
                    if(a_1.indexOf(a_2[i]) < 6){
                        const value = a_2[i_1];
                        a_2[i_1] = a_2[i];
                        a_2[i] = value;
                        break;
                    };
                };
            };
            
            if(i_2 < 4){
                //но в конец так, чтобы не наткнуться на i_2;
                loop2:
                for(let i = 4;i<8;i++){
                    if(a_1.indexOf(a_2[i]) < 6){
                        const value = a_2[i_2];
                        a_2[i_2] = a_2[i];
                        a_2[i] = value;
                        break;
                    };
                };
            };

            //в последней 8-ке нам нужно, чтобы ее первые 2 числа не были такие,
            // как 4 последних у второй 8-ки;

            a_3 = a_3.sort(()=> 0.5 - Math.random());
            let i_1_2 = a_2.indexOf(a_3[0]);
            let i_2_2 = a_2.indexOf(a_3[1]);

            //если это так, то переносим сначала первое чилсло куда подальше
            if(i_1_2 > 3){
                for(let i = 2;i<a_3.length;i++){
                    //смотрим, чтобы число не повторялось в последних 4 второй восьмерки
                    if(a_2.indexOf(a_3[i]) < 4){
                        const value = a_3[i];
                        a_3[i] = a_3[0];
                        a_3[0] = value;
                        break;
                    };
                };
            };

            
            if(i_2_2 > 3){
                for(let i = 2;i<a_3.length;i++){
                    //смотрим, чтобы число не повторялось в последних 4 второй восьмерки
                    if(a_2.indexOf(a_3[i]) < 4){
                        const value = a_3[i];
                        a_3[i] = a_3[1];
                        a_3[1] = value;
                        break;
                    };
                };
            };
            
            this.mainArr.push(...a_1, ...a_2, ...a_3);
        };
    },

    changePage(value){
        //все далее сделано для того, что при динамической смене размера экрана 
        //не возвращаться к первой странице, хоть в реальной жизни это редкость

        if(value > 0){
            if(!this.nextActive){
                return;
            };
        }else if(value < 0){
            if(!this.prevActive){
                return;
            };
        };
        if(this.inProgress) return;
        this.inProgress = true;

        const windowSize = window.innerWidth;
        let maxCard = 8;
        if(windowSize < 1280 && windowSize >= 768){
            maxCard = 6;
        }else if(windowSize < 768){
            maxCard = 3;
        };

        //находим начальный индекс для этого размера страницы;
        this.current_i = this.current_i -  this.current_i % maxCard;
        if(value === -Infinity){
            this.current_i = 0;
        }else if(value === Infinity){
            this.current_i = 48 - maxCard;
        }else{
            this.current_i += maxCard*value;
            if(this.current_i < 0){
                this.current_i = 0;
            }else if(this.current_i > 48 - maxCard){
                this.current_i = 48 - maxCard;
            };
            
        };
        this.showSet(value);
    },

    showSet(value){
        this.window.style.transitionDuration ='0.25s';
        const windowSize = window.innerWidth
        let maxCard = 8;
        if(windowSize >= 768 && windowSize < 1280 ){
            maxCard = 6;
        }else if(windowSize < 768){
            maxCard = 3;
        };
        this.window.style.opacity = 0;
        this.changePageNumber();

        const applySet = () => {
            const set = [];
            this.window.innerHTML = '';

            for(let i = 0;i<maxCard;i++){
                const id = this.mainArr[this.current_i + i];
                const card = new PetCard(id);
                set.push(card.element);
            }
            this.window.append(...set);
        
            this.window.style.opacity = 1;
            this.inProgress = false;
        }

        if(value === 0){
            applySet();
        }else{
            setTimeout(()=>{
                applySet();
            },250);
        };
    },
    
    changePageNumber(){
        const windowSize = window.innerWidth
        let maxCard = 8;
        if(windowSize >= 768 && windowSize < 1280 ){
            maxCard = 6;
        }else if(windowSize < 768){
            maxCard = 3;
        };
        const number =  Math.round(this.current_i/maxCard)+1;

        this.pageNumber.innerHTML = number;

        this.prevBtn.classList.remove('slider-button_disabled')
        this.firstBtn.classList.remove('slider-button_disabled');

        this.nextBtn.classList.remove('slider-button_disabled')
        this.lastBtn.classList.remove('slider-button_disabled');
        this.prevActive = true;
        this.nextActive = true;

        if(number === 1){
            this.prevBtn.classList.add('slider-button_disabled');
            this.firstBtn.classList.add('slider-button_disabled');
            this.prevActive = false;
        };
        if(number === 48/maxCard){
            this.nextBtn.classList.add('slider-button_disabled');
            this.lastBtn.classList.add('slider-button_disabled');
            this.nextActive = false;
        };
    },

    openModal(id){
        const modal = new Modal(id);
        document.querySelector('main').insertAdjacentElement('beforeend',modal.element);
    },
};
pagination.init();



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
            const path = e.path || (e.composedPath && e.composedPath());
            const buttonClicked = ~path.indexOf(button);
            if(e.target === overlay || buttonClicked || e.target === container){
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
};








