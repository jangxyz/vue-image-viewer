
Vue.component('image-modal', {
  template: '#image-modal',
  props: ['image'],
  methods: {
    close: function() {
      this.$emit('close');
    }
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

