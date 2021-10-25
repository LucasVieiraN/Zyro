const dropdownMenu = document.querySelectorAll('[data-dropdown]')

dropdownMenu.forEach(menu => {
  ['touchstart', 'click'].forEach(userEvent => {
    menu.addEventListener(userEvent, handleClick)
  })
})

function handleClick(event) {
  this.classList.toggle('ativo')
  outsideClick(this, ['touchstart', 'click'], () => {
    this.classList.remove('ativo')
  })
}

function outsideClick(element, events, callback) {
  const html = document.documentElement
  const outside = 'data-outside'

  if(!element.hasAttribute(outside)) {
    events.forEach(userEvent => {
      html.addEventListener(userEvent, handleOusideClick)
    })
    element.setAttribute(outside, '')
  }  
  function handleOusideClick(event) {
    if(!element.contains(event.target)) {
      element.removeAttribute(outside)
      events.forEach(userEvent => {
        html.removeEventListener(userEvent, handleOusideClick)
      })
      callback()
    }
  }
}