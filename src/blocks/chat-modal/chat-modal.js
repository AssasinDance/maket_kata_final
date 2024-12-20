const phoneButtons = document.querySelectorAll('.chat-modal')
const menuBackground = document.querySelector('.menu-background-modal')
const phoneModal = document.querySelector('.chat-modal-block')

for (let i = 0; i < phoneButtons.length; i++) {
  phoneButtons[i].addEventListener('click', () => {
    phoneModal.style.transform = 'translateX(0)'
    menuBackground.style.display = 'block'
    setTimeout(function () {
      menuBackground.style.opacity = '1'
    }, 10)
  })
}
