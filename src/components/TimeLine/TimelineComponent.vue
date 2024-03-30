<template>
<div>
    <timeline-carousel
        :timelineList="timelineList"
        :carouselLis="carouselList"
    />
</div>
</template>

<script>
export default {
    name: "TimelineComponent",
    data() {
        return {
            timelineList: [
                {
                    id: 1,
                    text: '2020-09-28'
                }
            ],
            carouselList: [
                {
                    id: 1,
                    img: require('../../../public/static/achievement/E.png'),
                    title: '陶渊明',
                    info: '盛年不重来，一日难再晨。及时宜自勉，岁月不待人。'
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>