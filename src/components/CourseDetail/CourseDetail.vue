<template>
  <div>
    <div style="font-size: 16px; font-weight: 500; margin: 20px 0;">课件</div>
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="item of courseDetails"
        :key="item.key">
        <template slot="title">
          <span :class="isParentLearned(item.key) ? 'parent-learned' : ''">{{item.label}}</span>
        </template>
        <div v-for="child of item.children" :key="child.key" @click="goVideo(item.key, child.key)">
          <el-row>
            <el-col :span="12" :class="isLearned(child.key) ? 'child-learned' : ''">{{child.label}}</el-col>
            <el-col :span="12">
              <div @click="playVideo(item.key,child.key)">
                <el-tooltip
                v-for="(operation, videoIndex) of child.operations"
                :key="videoIndex"
                class="item"
                effect="dark"
                :content="operation.label">
                  <i style="margin: 0 10px" v-if="operation.type === 'video'" class="el-icon-view"></i>
                  <i style="margin: 0 10px" v-else-if="operation.type === 'markdown'" class="el-icon-tickets"></i>
                  <i style="margin: 0 10px" v-else-if="operation.type === 'pdf'" class="el-icon-document"></i>
                </el-tooltip>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
  </el-collapse>
  </div>
</template>

<script>
const courseId = 199001
import {courseDetails} from '../../constant'
import {getLearnedCourse} from '../../api'
export default {
  data() {
    return {
      activeNames: ['1'],
      courseDetails: courseDetails[courseId],
      learnedDetail: []
    }
  },
  created() {
    const userId = localStorage.getItem('userId')
    getLearnedCourse({
      userId,
      courseId
    }).then(res => {
      console.log('getLearnedCourse',res)
      this.learnedDetail = JSON.parse(res.data[0].detail).learnedCategory
      localStorage.setItem('learnedCourse',JSON.stringify(res.data[0]))
    })
  },
  methods: {
    isParentLearned(key) {
      return Boolean(this.learnedDetail.find(item => key == item.toString()[0] ))
    },
    isLearned(key) {
      return this.learnedDetail.includes(key)
    },
    goVideo(itemKey,childKey) {
      console.log("itemKey = " ,itemKey,"childKey = ", childKey )
      this.$router.push({
        path: 'videoPlay',
        query: {
          courseId: courseId,
          parentKey: itemKey,
          childKey: childKey
        }
      })
    },
    playVideo(itemKey,childKey) {
      console.log("itemKey = " ,itemKey,"childKey = ", childKey )
      this.$router.push({
        path: 'videoPlay',
        query: {
          courseId: courseId,
          parentKey: itemKey,
          childKey: childKey
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.parent-learned {
  color: red;
}
.child-learned {
  color: grey;
}
</style>
