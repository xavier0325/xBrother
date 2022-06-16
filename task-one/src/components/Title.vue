<template>
    <div class="titleBox" :class="!reverse ? 'img' : 'img_reverse'">{{ title }}</div>
</template>
<script setup>
import { toRefs } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    reverse: {
        type: Boolean,
        required: true
    }
})
const { title, reverse } = toRefs(props)
// let img = reverse.value === true ? "url('../assets/border_reverse.png');" : "url('../assets/border.png');"
</script>
<style scoped>
.titleBox {
    display: inline-block;
    width: 100px;
    height: 20px;
    line-height: 20px;
    padding: 1px;
    text-align: center;
    border: 5px solid transparent;
    border-width: 3px 100px 3px 89px;
    border-image-slice: 7 240 21 254;
    flex: 1;
}

.img {
    border-image-source: url('../assets/border.png');
}

.img_reverse {
    border-image-source: url('../assets/border_reverse.png');
}
</style>