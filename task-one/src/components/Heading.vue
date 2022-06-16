<template>
    <div id="main">
        <h1>城市监测数据可视化系统</h1>
        <div id="time">{{ date1 }} {{ date2 }} {{ date3 }}</div>
        <div id="monitoring_pages">
            <ul>
                <li><span @click="goPageLeft"></span></li>
                <li>
                    <div id="num"><span>{{ page }}</span><span>/</span><span>3</span></div>
                </li>
                <li><span @click="goPageRight"></span></li>
            </ul>

        </div>
        <div id="titleContainer">
            <Title :title="'疫情监控'" :reverse="false"></Title>
            <span></span>
            <Title :title="'项目分布'" :reverse="true"></Title>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import Title from './Title.vue'

let date1 = ref("")
let date2 = ref("")
let date3 = ref("")
let page = ref(1)
let timer = ref({})
const emit = defineEmits(['subPage', 'addPage'])
const goPageLeft = () => {
    let temp = page.value === 1 ? 1 : --page.value
    emit('subPage', temp)
}
const goPageRight = () => {
    let temp = page.value === 3 ? 3 : ++page.value
    emit('addPage', temp)
}
onMounted(() => {
    document.getElementById("main").style.height = window.innerHeight * 0.1 + 'px'
    timer = setInterval(() => {
        let date = new Date()
        date1.value = date.toLocaleDateString().split("/").join("-")
        date2.value = "星期" + "日一二三四五六".charAt(date.getDay())
        date3.value = date.toLocaleTimeString()
    }, 1000)
})
onUnmounted(() => {
    clearInterval(timer)
})
</script>
<style scoped>
#main {
    background: url('../assets/bg_heading.png') no-repeat;
    background-size: 100% 100%;
    /* background-color: rgb(16, 51, 91); */
    background-color: rgba(0, 0, 0, 1);
    color: #eee;
    padding-top: 10px;
}

#main h1 {
    font-size: 28px;
    font-weight: bolder;
    text-align: center;
}

#main #time {
    position: absolute;
    top: 15px;
    right: 10px;
    width: fit-content;
}

#main #monitoring_pages {
    display: inline-block;
    text-align: left;
    height: 21.6px;
    padding: 5px 0;
    margin-left: 0;
}

#main #monitoring_pages ul {
    font-size: 0;
    user-select: none;
}

#main #monitoring_pages ul li {
    display: inline-block;
    width: fit-content;
    height: 22px;
    margin: 0 5px;
    line-height: 22px;

}

#main #monitoring_pages ul li:nth-child(2) {
    position: relative;
    transform: translateY(-25%);
}

#main #monitoring_pages ul li:first-child span,
#main #monitoring_pages ul li:last-child span {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 0 10px;
    border-radius: 50% 50%;
    background-size: 100% 100%;
    cursor: pointer;
    border: 0.8px solid #eee;
}

#main #monitoring_pages ul li:first-child span:active,
#main #monitoring_pages ul li:last-child span:active {
    border: 0.8px solid green;
}

#main #monitoring_pages ul li:first-child span {
    background: url('../assets/arrow_left.png') no-repeat;
    background-position: center 50%;
}

#main #monitoring_pages ul li:last-child span {
    background: url('../assets/arrow_right.png') no-repeat;
    background-position: 70% 50%;
}

#main #monitoring_pages #num {
    display: inline-block;
    height: 20px;
    margin: 0 auto;
    font-size: 16px;
    line-height: 20px;
}

#main #monitoring_pages #num>span {
    display: inline-block;
    width: fit-content;
    height: fit-content;
}

#main #titleContainer {
    position: absolute;
    top: 45px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
}
#main #titleContainer span {
    display: inline-block;
    width: 646px;
    flex: 11;
}
</style>