var hide_interval;
var show_interval;
var menu_interval;
const interval_delay = 2;

let menu_active = false;

let active_category = {
    name:{},
    content:{},
    show(e, n){
        let element = e;
        let element_num = parseInt(element.id[9]);
        let prev_num = (n)?n:1;

        element.style.opacity = '0';

        clearInterval(show_interval);

        let val = 0;

        show_interval = setInterval(()=>{

            if(val != 100){

                element.style.opacity = val + "%";

                if(element_num > prev_num){

                    element.style.left = (100 - val) + "%";
                }
                else{

                    element.style.right = (100 - val) + "%";
                }
                val++;
            }
            else{
                clearInterval(show_interval);
            }
        }, interval_delay) 
    },
    hide(e){
        const element = e;

        element.style.opacity = '1';

        clearInterval(hide_interval);

        let val = 100;

        hide_interval = setInterval(()=>{

            if(val != 0){

                element.style.opacity = val + "%";
                val--;
            }
            else{
                element.style.display = 'none';
                clearInterval(hide_interval);
            }
        }, interval_delay) 
    }
};

window.onload = () => {
    const category = document.querySelectorAll('.content-category');
    const name_1 = (document.querySelector('a[data-target="#category-1"]')).parentElement;
    
    active_category.name = name_1;


    category.forEach(element => {

        const element_id = element.id;

        if (element_id != 'category-1') {

            const element_html = document.getElementById(element_id)

            element_html.style.display = 'none';
        }
        else {
            let element = document.getElementById(element_id);

            active_category.show(element);
            active_category.content = element;
        }

    });
}

let on = document.querySelector('.active');

function toActive_nav(e) {

    on.classList.remove('active');

    li_element = e.parentElement;

    li_element.classList.add('active');

    on = li_element;
}



async function toActive_category(e) {

    const last_category = active_category.name.children[0].innerHTML;
    const last_category_num = parseInt(last_category[9]);


    const li_item = e.parentElement;

    const element_id = e.dataset.target;

    const element = document.querySelector(element_id);

    if (li_item == active_category.name) {
        return;
    }
    else {
        
        active_category.name.classList.remove('active');
        
        li_item.classList.add('active');
        
        active_category.name = li_item;
        

        active_category.hide(active_category.content);

        element.style.display = 'flex';

        active_category.show(element, last_category_num);

        active_category.content = element;
    }
}

function activeMenu(e){
    let nav = document.querySelector('header nav');

    let e_1 = e.children[0];
    let e_2 = e.children[1];
    let e_3 = e.children[2];

    if (!menu_active) {
        
        nav.style.display = 'block';

        clearInterval(menu_interval)
        let val = 100;
        menu_interval = setInterval(()=>{

            if(val > 0){
                e_2.style.opacity = val + '%';

                e_1.style.rotate = [(val > 50)?100-val:50] + 'deg';
                e_3.style.rotate = [(val > 50)?(100-val)*-1:-50] + 'deg';
                e_3.style.position = 'absolute';
                e_3.style.top = [(val > 60)?40-(100-val):0] + '%';

                val--;
            }
            else{
                clearInterval(menu_interval)
            }
        },interval_delay)

        menu_active = true;
    }
    else{

        clearInterval(menu_interval)
        let val = 0;
        menu_interval = setInterval(()=>{

            if(val < 100){
                e_2.style.opacity = val + '%';

                e_1.style.rotate = [(val < 50)?50-val:0] + 'deg';
                e_3.style.rotate = [(val < 50)?(50-val)*-1:0] + 'deg';
                e_3.style.top = [(val < 50)?val:50] + '%';
                
                val++;
            }
            else{

                e_3.style.position = 'static';

                clearInterval(menu_interval)
            }
        },interval_delay)

        nav.style.display = 'none';
        menu_active = false;
    }

    // console.log(menu_list)
}