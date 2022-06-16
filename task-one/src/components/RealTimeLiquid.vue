<template>
    <div id="rtlContainer"></div>
</template>
<script setup>
import { reactive, toRefs, getCurrentInstance, onMounted, watch } from 'vue'
import "echarts-liquidfill"

let chartObj = reactive({})
const { proxy } = getCurrentInstance()
const props = defineProps({
    rtLiquidData: {
        type: Object,
        required: true
    }
})
const { rtLiquidData } = toRefs(props)

watch(rtLiquidData, (val) => {
    chartObj.setOption({
        series: [
            {
                data: val.data,
            },
        ],
    });
})

onMounted(() => {
    var myChartDom = document.getElementById("rtlContainer");
    var myChart = proxy.$echarts.init(myChartDom);
    chartObj = myChart;

    var option = {
        title: {
            text: "疫\n情\n防\n控\n进\n度",
            textStyle: {
                color: "#eee",
                fontWeight: "900",
                textBorderColor: "#95a2ff",
                textBorderWidth: "2",
                textShadowColor: "#95a2ff",
                textShadowBlur: 2,
            },
            left: "88%",
            top: "center",
        },
        series: [
            {
                type: "liquidFill",
                name: "疫情防控进度",
                radius: "70%",
                center: ["50%", "50%"],
                silent: true,
                animationEasingUpdate: "linear",
                animationDurationUpdate: 1000,
                data: [],
                label: {
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "bold",
                },
                outline: {
                    borderDistance: 2,
                    itemStyle: {
                        borderColor: "rgba(149, 162, 255, 0.5)",
                        shadowColor: "#fff",
                        borderWidth: 3,
                        shadowBlur: 20,
                    },
                },
                backgroundStyle: {
                    color: "rgba(149, 162, 255, 0.5)",
                },
            },
        ],
    };

    myChart.setOption(option);
    window.onresize = function () {
        myChart.resize();
    };
})
</script>
<style scoped>
#rtlContainer {
    width: 200px;
    height: 160px;
}
</style>