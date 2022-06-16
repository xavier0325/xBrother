<template>
    <div id="rtcContainer"></div>
</template>
<script setup>
import { reactive, toRefs, getCurrentInstance, onMounted, watch } from 'vue'

let chartObj = reactive({})
const { proxy } = getCurrentInstance()
const props = defineProps({
    rtCalendarData: {
        type: Object,
        required: true
    }
})
const { rtCalendarData } = toRefs(props)

watch(rtCalendarData, (val) => {
    chartObj.setOption({
        series: [
            {
                data: val.dateList,
            },
            {
                data: val.data,
            },
        ],
    });
})

onMounted(() => {
    var myChartDom = document.getElementById("rtcContainer");
    var myChart = proxy.$echarts.init(myChartDom);
    chartObj = myChart;

    var option = {
        title: {
            text: "三月\n疫情\n程度\n日览",
            textStyle: {
                color: "#fff",
                fontSize: 15,
                fontWeight: "900",
                textBorderColor: "#d81e06",
                textBorderWidth: "2",
                textShadowColor: "#d81e06",
                textShadowBlur: 2,
            },
            left: "5%",
            top: "center",
        },
        tooltip: {},
        visualMap: {
            show: false,
            min: 0,
            max: 200,
            calculable: true,
            seriesIndex: [1],
            orient: "vertical",
            right: 20,
            bottom: "center",
            inRange: {
                color: ["rgba(224,255,255,1)", "rgba(216, 30, 6, 1)"],
                opacity: 1,
            },
            controller: {
                inRange: {
                    opacity: 1,
                },
            },
        },
        calendar: [
            {
                left: "25%",
                bottom: 0,
                height: "80%",
                cellSize: [40, 20],
                yearLabel: {
                    show: false,
                },
                orient: "vertical",
                dayLabel: {
                    show: true,
                    firstDay: 1,
                    nameMap: "cn",
                    color: "#fff",
                    textShadowColor: "#fff",
                    textShadowBlur: 7,
                    margin: 1,
                },
                monthLabel: {
                    show: true,
                    color: "#fff",
                    textShadowColor: "#fff",
                    textShadowBlur: 7,
                },
                itemStyle: {
                    color: "rgba(255,255,255,1)",
                },
                range: "2022-03",
            },
        ],
        series: [
            {
                type: "scatter",
                coordinateSystem: "calendar",
                symbolSize: 0,
                label: {
                    show: true,
                    formatter: function (params) {
                        var d = proxy.$echarts.number.parseDate(params.value);
                        return d.getDate();
                    },
                    color: "#000",
                },
                data: [],
            },
            {
                name: "各日期疫情程度",
                type: "heatmap",
                coordinateSystem: "calendar",
                data: [],
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
#rtcContainer {
    width: 440px;
    height: 110px;
}
</style>