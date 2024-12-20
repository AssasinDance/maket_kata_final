const hiddenDescription = document.querySelector('.info__hidden-description')
const readMore = document.querySelector('.read-more')
const readMoreText = readMore.querySelector('.read-more__text')

const clickReadMore = () => {
  let buttonClicked = false

  return function () {
    hiddenDescription.classList.toggle('info__hidden-description')

    if (buttonClicked) {
      readMoreText.innerHTML = '<div class="read-more-icon"></div>Читать далее'
    } else {
      readMoreText.innerHTML =
        '<div class="read-more-icon" style="transform: rotate(180deg)"></div>Скрыть'
    }
    buttonClicked = !buttonClicked
  }
}

readMore.addEventListener('click', clickReadMore())
