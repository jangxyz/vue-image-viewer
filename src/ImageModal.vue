<template>
    <div class="modal-main" v-show="image">
        <header>
            <button class="btn-close" @click="close">x</button>
        </header>
        <div class="container">
            <img :src="image" :style="zoomStyle" draggable=false
                @mousedown="startMove"
            >
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
            imageX: 0,
            imageY: 0,
            //
            dragStartPos: null,
        };
    },
    computed: {
        zoomStyle: function() {
            return {
                transform: `matrix(${this.scale}, 0, 0, ${this.scale}, ${this.imageX}, ${this.imageY})`
            };
        },
        isMoving: function() {
            return this.dragStartPos !== null;
        }
    },
    methods: {
        close: function() {
            this.$emit('close');
        },
        // zoom
        zoomIn: function() {
            this.scale += 1;
        },
        zoomReset: function() {
            this.scale = 1;
        },
        zoomOut: function() {
            this.scale -= 1;
        },
        // move
        startMove: function(e) {
            var self = this;
            this.isMoving = true;
            this.dragStartPos = {x: e.clientX, y: e.clientY};

            $(document).on('mousemove.panImageInModal', function(e) {
                self.move(e);
            });
            $(document).on('mouseup.panImageInModal', function(e) {
                self.endMove(e);
            });
        },
        move: function(e) {
            if (!this.isMoving) {
                return;
            }
            var dragDistanceX = e.clientX - this.dragStartPos.x;
            var dragDistanceY = e.clientY - this.dragStartPos.y;

            this.imageX += dragDistanceX;
            this.imageY += dragDistanceY;

            this.dragStartPos.x = e.clientX;
            this.dragStartPos.y = e.clientY;
        },
        endMove: function(e) {
            if (!this.isMoving) {
                return;
            }
            this.dragStartPos = null;

            $(document).off('mousemove.panImageInModal');
            $(document).off('mouseup.panImageInModal');
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
</script>

<style scoped>
.modal-main {
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
}

header {
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
    overflow: hidden;
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
