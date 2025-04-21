import { menuArray } from "./menu.js";

const orderSection = document.getElementById('order-section')
const orderedItemContainer = document.getElementById('ordered-item-container')

let menuHtml = ''

function getMenuHtml(menu) {
 menu.forEach(function(item){
  menuHtml +=`
    <div class="item-container">
      <h2 class="item-icon">${item.emoji}</h2>
        <div>
          <h3 class="item-name">${item.name}</h3>
          <p class="item-ingredients">${item.ingredients}</p>
          <p class="item-price">$${item.price}</p>
        </div>
          <button data-id=${item.id} class="add-btn">+</button>
    </div>
`
  })
  return menuHtml
}



function addItemToOrder(e){
  menuArray.forEach(function(item){
  if(item.id == e.target.dataset.id){
    orderedItemContainer.innerHTML += `
            <div class="ordered-item-container">
              <div class="ordered-item-sub-container">
                <h3 class="order-name">${item.name}</h3>
                <button class="remove-btn">remove</button>
              </div>
                <p class="price">$${item.price}</p>
                </div>
            
    `
  }
  orderSection.classList.remove('order')
  })
  }




document.getElementById('menu').innerHTML = getMenuHtml(menuArray)

const addItemBtn = document.getElementsByClassName('add-btn')
  for (let btns of addItemBtn){
    btns.addEventListener('click', addItemToOrder)
  }


