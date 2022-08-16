var hide_interval;
var show_interval;
const interval_delay = 24;

let active_category = {
    name:{},
    content:{},
    show(e){
        let element = e;

        element.style.opacity = '0';

        clearInterval(show_interval);

        let val = 0;

        show_interval = setInterval(()=>{

            if(val != 100){

                element.style.opacity = val + "%";
                val++;
            }
            else{
                clearInterval(show_interval);
            }
        }, interval_delay) 
    },
    hide(e){
        let element = e;

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

        active_category.show(element);

        active_category.content = element;
    }
}