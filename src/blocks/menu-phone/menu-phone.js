const burgerButton = document.querySelectorAll('.menu-phone__cross')
const menuBackground = document.querySelector('.menu-background-modal')
const menuPhone = document.querySelector('.phone-modal-block')
const menuChat = document.querySelector('.chat-modal-block')

for (let i = 0; i < burgerButton.length; i++) {
  burgerButton[i].addEventListener('click', () => {
    menuPhone.style.transform = 'translateX(140%)'
    menuChat.style.transform = 'translateX(140%)'
    menuBackground.style.opacity = '0'
    setTimeout(function () {
      menuBackground.style.display = 'none'
    }, 300)
  })
}

const inputEmail = document.querySelector('.menu-phone__input-number--email')
const labelEmail = document.querySelector('.menu-phone__label-phone--email')

inputEmail.onfocus = () => {
  labelEmail.style.opacity = 0
}

inputEmail.onblur = () => {
  if (inputEmail.value === '') {
    labelEmail.style.opacity = 1
  } else {
    labelEmail.style.opacity = 0
  }
}
