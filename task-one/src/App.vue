<template>
  <div>
    <heading @subPage="subPage" @addPage="addPage"></heading>
    <RealTimeMonitoring :page="page"></RealTimeMonitoring>
    <project-map></project-map>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Heading from './components/Heading.vue'
import RealTimeMonitoring from './components/RealTimeMonitoring.vue'
import ProjectMap from './components/ProjectMap.vue'

let page = ref(1)
function subPage(val) {
  // console.log(val)
  page.value = val
}
function addPage(val) {
  page.value = val
}
</script>
<style>
body {
  min-width: 1280px;
}
/*取消百度地图logo*/
.anchorBL {
  display: none;
}
</style>
