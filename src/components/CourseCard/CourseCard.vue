<template>
  <div @click="choosed(initData.courseId)">
    <el-card shadow="hover">
      <div>
        <img :src="initData.imgUrl">
      </div>
      <div>
        <div>{{initData.courseName}}</div>
        <div>{{initData.schoolName}}</div>
        <div>{{initData.summary}}</div>
        <div>{{initData.enrollCount}}人参加</div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    initData: {}
  },
  data() {
    return {

    }
  },
  methods: {
    choosed(id) {
      this.$router.push({
        path: '/learn',
        query: {
          course_id: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
