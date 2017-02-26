var app = new Vue({
  el: '#app',
  data: {
    greeting: 'Welcome to your Vue.js app!',
    docsURL: 'http://vuejs.org/guide/',
    images: [
      'assets/images/small1.jpg',
      'assets/images/wide1.jpg',
      'assets/images/long1.jpg',
      'assets/images/big1.jpg'
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

