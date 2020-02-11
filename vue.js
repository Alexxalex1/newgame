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
                // this.scene.start('preload')
            }
        }
    }
})
var isActive = false
var isActiveRight = false
var isActiveUp = false
/*document.querySelector('.left').addEventListener('pointerdown', e => {
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
})*/
