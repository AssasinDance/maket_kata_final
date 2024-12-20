const imageOfCompany = document.querySelector('.info__image-of-company')
const description = document.querySelector('.info__description')

imageOfCompany.onload = function () {
  description.style.height = imageOfCompany.height + 'px'
}
