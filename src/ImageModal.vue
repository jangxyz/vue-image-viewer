<template>
    <div class="modal-main" v-show="image">
      <header class="modal-header">
        <button class="btn-close" @click="close">x</button>
      </header>
      <div class="container">
        <img :style="zoomStyle" :src="image">
      </div>
      <footer class="modal-footer">
        <button class="zoom-in btn-zoom" @click="zoomIn">+</button>
        <button class="zoom-reset btn-zoom" @click="zoomReset">=</button>
        <button class="zoom-out btn-zoom" @click="zoomOut">-</button>
      </footer>
    </div>
</template>

<script>
import Vue from 'vue';

export default Vue.component('image-modal', {
  template: '#image-modal',
  props: [
    'image'
  ],
  data: function() {
    return {
      scale: 1,
    };
  },
  computed: {
    zoomStyle: function() {
      return {
        transform: `scale(${this.scale}, ${this.scale})`
      };
    }
  },
  methods: {
    close: function() {
      this.$emit('close');
    },
    zoomIn: function() {
      this.scale += 1;
    },
    zoomReset: function() {
      this.scale = 1;
    },
    zoomOut: function() {
      this.scale -= 1;
    },
  },
  mounted: function() {
    var self = this;
    $('body').on('keydown.closeImageModal', function(e) {
      if (e.keyCode === 27) {
        self.close();
      }
    })
  },
  destroyed: function() {
    $('body').off('keydown.closeImageModal');
  }
});
</script>

<style>
.modal-main {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}

.modal-header {
  background-color: black;
  width: 100%;
  height: 70px;
  color: white;
}

.btn-close {
  font-size: 24px;
  width: 40px;
  height: 40px;
}
.container {
    height: calc(100% - 170px);
    overflow: auto;
}

footer {
  background-color: black;
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 100px;

  padding: 0;
  font-size: 24px;
}

.button-zoom {
  width: 50px;
  height: 50px;
}
</style>

