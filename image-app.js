var app = new Vue({
  el: '#app',
  data: {
    greeting: 'Welcome to your Vue.js app!',
    docsURL: 'http://vuejs.org/guide/',
    images: [
      'small1.jpg',
      'wide1.jpg',
      'long1.jpg',
      'big1.jpg'
    ],
    selectedImageSrc: null,
  },
  methods: {
    humanizeURL: function (url) {
      return url
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, '')
    },
    showModal: function(image) {
      this.selectedImageSrc = image;
    },
    closeModal: function() {
      this.selectedImageSrc = null;
    }
  }
})

