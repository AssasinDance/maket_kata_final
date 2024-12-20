const menu = document.querySelector('.menu')
const background = document.querySelector('.menu-background')

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1440) {
    menu.style.transform = 'translateX(0)'
  } else {
    menu.style.transform = 'translateX(-120%)'
  }
  background.style.opacity = 0
  setTimeout(function () {
    background.style.display = 'none'
  }, 300)
})
