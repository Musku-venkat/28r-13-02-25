
let container = document.getElementById("container");
let container1 = document.getElementById("sub-container");
async function get_data() {
    let response = await fetch("https://fakestoreapi.com/products");
    let result =  await response.json();
    localStorage.setItem('products', JSON.stringify(result));
    create_button();
    display(result);
}

async function display(filter_data) {
    container1.innerHTML = ``;
    let products = JSON.parse(localStorage.getItem('products')) || [];
    if(filter_data !== undefined){
        products = filter_data
    }
    products.forEach((obj)=>{
        let item = document.createElement("div");
        item.innerHTML = `
        <img src='${obj.image}'/>
        <p><b>Category : </b>${obj.category}</p>
        <p><b>Description : </b>${obj.description}</p>
        `;
        container1.appendChild(item);
    });
}

function create_button(){
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let result = Array.from(new Set(products.map((obj)=> obj.category)));
    result.forEach((ele)=>{
        let button = document.createElement("button");
        button.innerText = ele
        button.addEventListener('click', ()=>{
            filter_data(ele);
        });
        container.appendChild(button);

    });
}

function filter_data(category){
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let result = products.filter((obj)=> obj.category === category)
    display(result);
}

// get_data();

window.onload = get_data
