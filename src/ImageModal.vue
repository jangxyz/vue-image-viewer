<template>
    <div class="modal-main" v-show="image">
        <header>
            <button class="btn-close" @click="close">x</button>
        </header>
        <div class="container"
            @mousemove="move"
            @mouseup="endMove"
        >
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
                transform: `translate(${this.imageX}px, ${this.imageY}px)`
                //transform: `scale(${this.scale}, ${this.scale})`
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
            this.isMoving = true;
            this.dragStartPos = {x: e.x, y: e.y};
        },
        move: function(e) {
            if (!this.isMoving) {
                return;
            }
            var dragDistanceX = e.x - this.dragStartPos.x;
            var dragDistanceY = e.y - this.dragStartPos.y;

            this.imageX += dragDistanceX;
            this.imageY += dragDistanceY;

            this.dragStartPos.x = e.x;
            this.dragStartPos.y = e.y;
        },
        endMove: function(e) {
            if (!this.isMoving) {
                return;
            }
            this.dragStartPos = null;
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
