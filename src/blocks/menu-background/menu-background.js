const menuBackground = document.querySelector('.menu-background')
const menu = document.querySelector('.menu')

menuBackground.addEventListener('click', () => {
  menu.style.transform = 'translateX(-120%)'
  menuBackground.style.opacity = '0'
  setTimeout(function () {
    menuBackground.style.display = 'none'
  }, 300)
})
