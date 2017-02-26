<template>
  <div id="app">
    <img src="https://vuejs.org/images/logo.png" alt="Vue logo">

    <div>
      <ul>
          <li v-for="image in images"><a @click.prevent="showModal(image)" :href="image">{{image}}</a></li>
      </ul>
    </div>
    <image-modal v-if="selectedImageSrc" :image="selectedImageSrc" @close="closeModal"></image-modal>
  </div>
</template>

<script>

import ImageModal from './ImageModal.vue';

export default {
    data: function() {
        return {
            greeting: 'Welcome to your Vue.js app!',
            docsURL: 'http://vuejs.org/guide/',
            images: [
                require('./assets/small1.jpg'),
                require('./assets/wide1.jpg'),
                require('./assets/long1.jpg'),
                require('./assets/big1.jpg')
            ],
            selectedImageSrc: null,
        };
    },
    components: {
        ImageModal: ImageModal,
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
};

</script>

<style>
</style>
