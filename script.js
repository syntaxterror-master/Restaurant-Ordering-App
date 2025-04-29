import { menuArray } from "./menu.js";

const menuEl = document.getElementById('menu')
const orderSection = document.getElementById('order-section')
const orderedItemContainer = document.getElementById('ordered-item-container')
const totalPrice = document.getElementById('total-price')
const cardNumberInput = document.getElementById('enterCardNumber')
const completeOrderBtn = document.getElementById('complete-order-btn')
const paymentForm = document.getElementById('payment-form')
const form = document.getElementById('form')
const orderComplete = document.getElementById('order-complete')

let currentOrder = []
let isOrderCompleted = false



function getMenuHtml(menu) {
return menu.map ((item =>
  `
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
)).join('')
}

function renderOrder() {
  orderedItemContainer.innerHTML = ''
  let total = 0

  currentOrder.forEach(function(item, index){
    const itemEl = document.createElement('div')
    itemEl.classList.add('ordered-item-container')
    itemEl.dataset.index = index
    itemEl.innerHTML = `
       <div class="ordered-item-sub-container">
                <h3 class="order-name">${item.name}</h3>
                <button class="remove-btn" data-index="${index}">remove</button>
                </div>
                 <p class="price">$${item.price}</p>
    `
    total += item.price
    orderedItemContainer.appendChild(itemEl)
  })
  totalPrice.textContent = `$${total}`

  if(currentOrder.length > 0){
    orderSection.classList.remove('order')
  } else {
    orderSection.classList.add('order')
  }
}

function addItemToOrder(e){
  if(isOrderCompleted) return
  const itemId = e.target.dataset.id
  const item = menuArray.find(item => item.id == itemId)
  if(item){
    currentOrder.push(item)
  }
  renderOrder()
}

function removeItemFromOrder(e){
  if(isOrderCompleted) return
 const index = e.target.dataset.index
 currentOrder.splice(index, 1)
 renderOrder()
 
}


menuEl.innerHTML = getMenuHtml(menuArray)

menuEl.addEventListener('click', function(e){
  if(e.target.classList.contains('add-btn')){
    addItemToOrder(e)
    orderComplete.innerHTML = ''
  }
})

orderedItemContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('remove-btn')){
    removeItemFromOrder(e)
  }
})

cardNumberInput.addEventListener('input', function(e){
  let value = e.target.value.replace(/\D/g, '')
  value = value.match(/.{1,4}/g)?.join(' ') ?? ''
  e.target.value = value
})

completeOrderBtn.addEventListener('click', function(){
  isOrderCompleted = true
  paymentForm.classList.remove('form-container-display-none')
})

form.addEventListener('submit', function(e){
  e.preventDefault()
   paymentForm.classList.add('form-container-display-none')
   orderSection.classList.add('order')
  currentOrder = []
  isOrderCompleted = false

  const name = document.getElementById('enterName').value
  document.getElementById('enterCardNumber').value = ''
  document.getElementById('enterCCV').value = ''
  document.getElementById('enterName').value = ''


  orderComplete.innerHTML += `
    <div class="order-complete">
          <h3>Thanks, ${name}! Your order is on its way!</h3>
        </div>
  `


})
