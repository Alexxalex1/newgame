
var VueJs = new Vue({
      el: '#app',
      data: {
        name: 'Vue.js',
        counter: 0
      },
      methods: {
        again () {
          if (document.querySelector('.again')) {
            return window.location.reload()



          }
        }
      }
    })
    var isActive = false
    var isActiveRight = false
    var isActiveUp = false
    document.querySelector('.left').addEventListener('pointerdown', e => {
      isActive = true
    })
    document.querySelector('.left').addEventListener('pointerup', e => {
      isActive = false
    })
    document.querySelector('.right').addEventListener('pointerdown', e => {
      isActiveRight = true
    })
    document.querySelector('.right').addEventListener('pointerup', e => {
      isActiveRight = false
    })
    document.querySelector('.up').addEventListener('pointerdown', e => {
      isActiveUp = true
    })
    document.querySelector('.up').addEventListener('pointerup', e => {
      isActiveUp = false
    })
    document.addEventListener('touchmove', function (event) {
        if (event.scale !== 1) { event.preventDefault(); }
    }, false)


    if ($(window).width() > 1025) {
      $('.position-absolute').addClass('display-none');
  } else {
      $('.position-absolute').removeClass('display-none');
  }
