<template>
    <div id="page">
        <div class="col">
            <div class="left_box border">
                <div class="content" style="height: 110px; top: -58px">
                    <RealTimeWord></RealTimeWord>
                </div>
            </div>
            <div class="left_box border">
                <div class="content">
                    <RealTimePeople :rtPeopleData="rtPeopleData"></RealTimePeople>
                </div>
            </div>
            <div class="left_box" style="display: flex">
                <div class="border" style="flex: 1; height: 98px; max-width: 110px; min-width: 90px">
                    <div class="content" style="width: 220px; height: 160px; min-width: 200px">
                        <RealTimeLiquid :rtLiquidData="rtLiquidData"></RealTimeLiquid>
                    </div>
                </div>
                <div class="border" style="flex: 1; height: 98px; max-width: 110px; min-width: 90px">
                    <div class="content" style="width: 220px; height: 160px; min-width: 200px">
                        <RealTimeLiquidHealth :rtLiquidHealthData="rtLiquidHealthData"></RealTimeLiquidHealth>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div id="center_box">
                <RealTimeMap :rtMapData="rtMapData"></RealTimeMap>
            </div>
        </div>
        <div class="col">
            <div class="right_box border">
                <div class="content" style="height: 110px; top: -55px">
                    <RealTimeCalendar :rtCalendarData="rtCalendarData"></RealTimeCalendar>
                </div>
            </div>
            <div class="right_box border">
                <div class="content">
                    <RealTimeArea :rtAreaData="rtAreaData"></RealTimeArea>
                </div>
            </div>
            <div class="right_box border">
                <div class="content" style="height: 165px">
                    <RealTimeDegree :rtDegreeData="rtDegreeData"></RealTimeDegree>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, toRefs, watch, onMounted, onUnmounted } from 'vue'
import RealTimeWord from './RealTimeWord.vue'
import RealTimePeople from './RealTimePeople.vue'
import RealTimeLiquid from './RealTimeLiquid.vue'
import RealTimeLiquidHealth from './RealTimeLiquidHealth.vue'
import RealTimeMap from './RealTimeMap.vue'
import RealTimeCalendar from './RealTimeCalendar.vue'
import RealTimeArea from './RealTimeArea.vue'
import RealTimeDegree from './RealTimeDegree.vue'

const path = ref("ws://localhost:8888/realtimemonitoring/realtimemonitoring_ws")
let socket = reactive({})
let rtPeopleData = ref({})
let rtLiquidData = ref({})
let rtLiquidHealthData = ref({})
let rtMapData = ref({})
let rtCalendarData = ref({})
let rtAreaData = ref({})
let rtDegreeData = ref({})

const props = defineProps({
    page: {
        type: Number,
        required: true
    }
})
const { page } = toRefs(props)
watch(page, () => {
    console.log(page.value)
    for (let i = 0; i < 3; i++) {
        document.getElementsByClassName("col")[i].style.transform = "translateX(-" + 454 * (page.value - 1) + "px)"
    }
})

onMounted(() => {
    wsInit()
    let pageBox = document.getElementById("page")
    // pageBox.style.width = window.innerWidth * 0.5 + "px"
    pageBox.style.height = window.innerHeight * 0.9 + "px"
    pageBox.style.top = window.innerHeight * 0.1 + "px"
})
onUnmounted(() => {
    socket.onclose = wsClose
})

function wsInit() {
    if (!WebSocket) {
        console.log("Your browser do not apply WebSocket!");
    } else {
        socket = new WebSocket(path.value); //socket实例
        socket.onopen = wsOpen; //socket开启
        socket.onerror = wsError; //socket错误
        socket.onmessage = wsGetMsg; //socket消息

    }
}
function wsOpen() {
    console.log("WebSocket连接成功!");
    socket.send("realtimemonitoring客户端已连接WebSocket服务!");
}
function wsError() {
    console.log("WebSocket连接错误!正在重连...");
    wsInit(); //连接失败则重连
}
function wsGetMsg(msg) {
    // console.log(JSON.parse(msg.data));
    rtPeopleData.value = JSON.parse(msg.data).realtimepeopleData;
    rtLiquidData.value = JSON.parse(msg.data).realtimeliquidData;
    rtLiquidHealthData.value = JSON.parse(msg.data).realtimeliquidhealthData;
    rtCalendarData.value = JSON.parse(msg.data).realtimecalendarData;
    rtAreaData.value = JSON.parse(msg.data).realtimeareaData;
    rtDegreeData.value = JSON.parse(msg.data).realtimedegreeData;
    rtMapData.value = JSON.parse(msg.data).realtimemapData;
}
function wsSend(content) {
    socket.send(content);
}
function wsClose() {
    socket.close();
    socket = undefined;
    console.log("WebSocket连接关闭!");
    socket.send("连接断开");
}
</script>
<style scoped>
#page {
    width: 454px;
    display: flex;
    max-width: 1920px;
    position: absolute;
    left: 0;
    z-index: 999;
    overflow: hidden;

    /* padding: 10px; */
}

#page .col {
    flex: 3;
    min-width: 454px;
    transition: transform 1s ease;
    /* background: rgba(149,162,255,0.1); */
    /* border: 2px solid #fff; */
}

#page .col:nth-child(2) {
    flex: 4;
}

.border {
    max-width: 440px;
    min-width: 300px;
    margin-bottom: 20px;
}

#page .col:first-child .border {
    position: relative;
    border: 15px solid transparent;
    border-image-source: url(../assets/border.png);
    border-width: 54px 40px 13px 97px;
    border-image-slice: 51 38 20 132;
    /* box-shadow: 0 0 18px #fff; */
}

#page .col:last-child .border {
    position: relative;
    border: 15px solid transparent;
    border-image-source: url(../assets/border_reverse.png);
    border-width: 54px 40px 13px 97px;
    border-image-slice: 51 38 20 132;
}

.left_box {
    color: #fff;
    /* background: #FFFC11; */
}

.left_box:nth-child(1),
.right_box:nth-child(1) {
    height: 7%;
}

.left_box:nth-child(2),
.right_box:nth-child(2) {
    height: 40%;
}

.left_box:nth-child(3),
.right_box:nth-child(3) {
    height: 15%;
}

#center_box {
    width: 95%;
    height: 90%;
    min-width: 447px;
    border: 1px solid rgba(149, 162, 255, 0.5);
    margin: 10% auto;
    color: #fff;
    box-shadow: 0 0 10px rgba(149, 162, 255, 0.5);
}

.right_box {
    height: 100px;
    color: #fff;
}

.content {
    width: 440px;
    height: 300px;
    min-width: 440px;
    position: absolute;
    left: -91px;
    top: -44px;
}
</style>