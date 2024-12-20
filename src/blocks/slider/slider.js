const buttonReadMore = document.querySelector('.slider__read-more')
const buttonReadMoreTechType = document.querySelector(
  '.slider__read-more-tech-type'
)
const listOfTech = document.querySelector('.list-of-tech')

const clickReadMore = (classHiddenMd, classHiddenLg) => {
  let buttonClicked = false
  const hiddenBlocksMd = document.querySelectorAll('.' + classHiddenMd)
  const hiddenBlocksLg = document.querySelectorAll('.' + classHiddenLg)

  return function () {
    for (let i = 0; i < hiddenBlocksMd.length; i++) {
      hiddenBlocksMd[i].classList.toggle(classHiddenMd)
    }

    for (let i = 0; i < hiddenBlocksLg.length; i++) {
      hiddenBlocksLg[i].classList.toggle(classHiddenLg)
    }

    if (buttonClicked) {
      this.innerHTML = '<div class="read-more-icon"></div>Показать все'
    } else {
      this.innerHTML =
        '<div class="read-more-icon" style="transform: rotate(180deg)"></div>Скрыть'
    }

    buttonClicked = !buttonClicked
  }
}

const clickReadMoreNewVersion = (listOfItems) => {
  let buttonClicked = false

  return function () {
    if (buttonClicked) {
      this.innerHTML = '<div class="read-more-icon"></div>Показать все'
      listOfItems.style.height = '183px'
    } else {
      this.innerHTML =
        '<div class="read-more-icon" style="transform: rotate(180deg)"></div>Скрыть'
      listOfItems.style.height = 'auto'
    }

    buttonClicked = !buttonClicked
  }
}

buttonReadMore.addEventListener(
  'click',
  clickReadMore(
    'list-of-brands__item--hidden--md',
    'list-of-brands__item--hidden--lg'
  )
)
buttonReadMoreTechType.addEventListener(
  'click',
  clickReadMoreNewVersion(listOfTech)
)

const sliderBrands = (
  sliderClass,
  sliderListClass,
  sliderTrackClass,
  slidesClass,
  circleListClass,
  slideWidth
) => {
  let slider = document.querySelector(sliderClass), //slider__brands
    sliderList = slider.querySelector(sliderListClass), //slider-list
    sliderTrack = slider.querySelector(sliderTrackClass), //list-of-brands
    slides = slider.querySelectorAll(slidesClass), //brand
    circleList = slider.querySelector(circleListClass), //circle-list
    stopSliderWidth = 555,
    slideIndex = 0,
    posInit = 0,
    posX1 = 0,
    posX2 = 0,
    posY1 = 0,
    posY2 = 0,
    posFinal = 0,
    isSwipe = false,
    isScroll = false,
    allowSwipe = true,
    transition = true,
    nextTrf = 0,
    prevTrf = 0,
    lastTrf = --slides.length * slideWidth,
    posThreshold = slides[0].offsetWidth * 0.35,
    trfRegExp = /([-0-9.]+(?=px))/,
    getEvent = function () {
      return event.type.search('touch') !== -1 ? event.touches[0] : event
    },
    slide = function () {
      if (transition) {
        sliderTrack.style.transition = 'transform .5s'
      }
      sliderTrack.style.transform = `translate3d(-${
        slideIndex * slideWidth
      }px, 0px, 0px)`
    },
    swipeStart = function () {
      let evt = getEvent()

      if (allowSwipe) {
        transition = true

        nextTrf = (slideIndex + 1) * -slideWidth
        prevTrf = (slideIndex - 1) * -slideWidth

        posInit = posX1 = evt.clientX
        posY1 = evt.clientY

        sliderTrack.style.transition = ''

        document.addEventListener('touchmove', swipeAction)
        document.addEventListener('mousemove', swipeAction)
        document.addEventListener('touchend', swipeEnd)
        document.addEventListener('mouseup', swipeEnd)

        sliderList.classList.remove('grab')
        sliderList.classList.add('grabbing')
      }
    },
    swipeAction = function () {
      let evt = getEvent(),
        style = sliderTrack.style.transform,
        transform = +style.match(trfRegExp)[0]

      posX2 = posX1 - evt.clientX
      posX1 = evt.clientX

      posY2 = posY1 - evt.clientY
      posY1 = evt.clientY

      // определение действия свайп или скролл
      if (!isSwipe && !isScroll) {
        let posY = Math.abs(posY2)
        if (posY > 7 || posX2 === 0) {
          isScroll = true
          allowSwipe = false
        } else if (posY < 7) {
          isSwipe = true
        }
      }

      if (isSwipe) {
        // запрет ухода влево на первом слайде
        if (slideIndex === 0) {
          if (posInit < posX1) {
            setTransform(transform, 0)
            return
          } else {
            allowSwipe = true
          }
        }

        // запрет ухода вправо на последнем слайде
        if (slideIndex === --slides.length) {
          if (posInit > posX1) {
            setTransform(transform, lastTrf)
            return
          } else {
            allowSwipe = true
          }
        }

        // запрет протаскивания дальше одного слайда
        if (
          (posInit > posX1 && transform < nextTrf) ||
          (posInit < posX1 && transform > prevTrf)
        ) {
          reachEdge()
          return
        }

        if (window.innerWidth > stopSliderWidth) {
          setTransform(transform, 0)
          return
        }

        // двигаем слайд
        sliderTrack.style.transform = `translate3d(${
          transform - posX2
        }px, 0px, 0px)`
      }
    },
    swipeEnd = function () {
      posFinal = posInit - posX1

      isScroll = false
      isSwipe = false

      document.removeEventListener('touchmove', swipeAction)
      document.removeEventListener('mousemove', swipeAction)
      document.removeEventListener('touchend', swipeEnd)
      document.removeEventListener('mouseup', swipeEnd)

      sliderList.classList.add('grab')
      sliderList.classList.remove('grabbing')

      if (allowSwipe) {
        if (Math.abs(posFinal) > posThreshold) {
          if (posInit < posX1) {
            slideIndex--
          } else if (posInit > posX1) {
            slideIndex++
          }
        }

        if (posInit !== posX1) {
          allowSwipe = false
          slide()
          for (let i = 0; i < circleList.children.length; i++) {
            circleList.children[i].classList.remove('circle-list__item--active')
          }
          circleList.children[slideIndex].classList.toggle(
            'circle-list__item--active'
          )
        } else {
          allowSwipe = true
        }
      } else {
        allowSwipe = true
      }
    },
    setTransform = function (transform, comapreTransform) {
      if (transform >= comapreTransform) {
        if (transform > comapreTransform) {
          sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`
        }
      }
      allowSwipe = false
    },
    reachEdge = function () {
      transition = false
      swipeEnd()
      allowSwipe = true
    }

  sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)'
  if (window.innerWidth >= stopSliderWidth) {
    slides[0].style.marginLeft = '0px'
  } else {
    slides[0].style.marginLeft = `${(window.innerWidth - 320) / 2.1}px`
  }
  sliderList.classList.add('grab')

  sliderTrack.addEventListener('transitionend', () => (allowSwipe = true))
  slider.addEventListener('touchstart', swipeStart)
  slider.addEventListener('mousedown', swipeStart)

  window.addEventListener('resize', () => {
    if (window.innerWidth >= stopSliderWidth) {
      sliderTrack.style.transition = 'transform 0s'
      sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)'
      slides[0].style.marginLeft = '0px'
    } else {
      slides[0].style.marginLeft = `${(window.innerWidth - 320) / 2.1}px`
    }
  })
}

sliderBrands(
  '.slider__brands',
  '.slider-list',
  '.list-of-brands',
  '.brand',
  '.circle-list',
  260
)

sliderBrands(
  '.slider__tech-type',
  '.slider-list-tech',
  '.list-of-tech',
  '.tech-type',
  '.circle-list-tech',
  260
)

sliderBrands(
  '.slider__prices',
  '.slider-list-price',
  '.list-of-price',
  '.price',
  '.circle-list-price',
  260
)
