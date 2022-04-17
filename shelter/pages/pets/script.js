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

    generateMainArr (){
        const base = [0,1,2,3,4,5,6,7];
        for(let i = 0;i<1;i++){
            //Это ужас, признаю. Иначе я уходил в бесконечность или зависало надолго
            //Можно еще его описать на подобии пузырьковой сортировки массива, где повторяещиеся элементы будут уходить,
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
        console.log(this.mainArr)

    },

    showSet(){

    },

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
    },

    changePage(value){

    },
};
pagination.init();
// console.log(pagination.mainArr)


