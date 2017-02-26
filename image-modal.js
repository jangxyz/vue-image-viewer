
Vue.component('image-modal', {
  template: '#image-modal',
  props: [
    'image'
  ],
  data: function(){
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
