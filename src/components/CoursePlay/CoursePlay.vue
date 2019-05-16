<template>
  <div @mousemove="mouseMove">
    <div>
      <span>课件</span>
      <span>></span>
      <el-select v-model="parentKey">
        <el-option
          v-for="item in initData"
          :key="item.key"
          :label="item.label"
          :value="item.key">
        </el-option>
      </el-select>
      <span>></span>
      <el-select v-model="childKey">
        <el-option
          v-for="item in childData"
          :key="item.key"
          :label="item.label"
          :value="item.key"
          pleaceholder="请选择课时">
        </el-option>
      </el-select>
    </div>
    <div>
      <el-row>
        <div v-for="item of childOperation" :key="item.label" @click="changeCurrentPlay(item)">
          <el-col :span="parseInt(24 / childOperation.length)">
            <el-tooltip
              effect="dark"
              :content="item.label">
              <i v-if="item.type === 'video'" class="el-icon-view"></i>
              <i v-else-if="item.type === 'markdown'" class="el-icon-tickets"></i>
              <i v-else-if="item.type === 'pdf'" class="el-icon-document"></i>
            </el-tooltip>
          </el-col>
        </div>
      </el-row>
    </div>
    <div style="color: red">{{parseCountTime}}  当前所学次数：{{currentLearnedTime}}次</div>
    <div style="color: red">当前课程内容至少需要学习{{currentPlay.learnTime}}秒</div>
    <div>
      <video v-if="currentPlay.type === 'video'" :src="currentPlay.href" width="100%" controls autoplay/>
      <div v-else-if="currentPlay.type === 'markdown'" v-html="currentPlay.content"></div>
      <div v-else-if="currentPlay.type === 'pdf'"><pdf src="../assets/c-language.pdf"></pdf></div>
    </div>
  </div>
</template>

<script>
import {courseDetails,courseMarkdownList} from '../../constant'
import {changeLearnedCourse, changeLearnedTime} from '../../api'
import pdf from 'vue-pdf'
import marked from 'marked'
import Prism from 'prismjs'
import { getArticle } from '../../api'
marked.setOptions({
  highlight: (code) => Prism.highlight(code, Prism.languages.javascript)
})
export default {
  components: {
    pdf
  },
  data() {
    return {
      initData: [],
      parentKey: 0,
      childKey: 0,
      currentPlay: '',
      src: '',
      numPages: '',
      countTimeId: '',
      countTime: 0,  // 当前所学总时长
      learnedTimeId: '',
      videoMax: 20,
      markdownMax: 5,
      pdfMax: 10,
      currentCountTime: 0, //当前累计未监听到事件时长
      currentLearnedTime: 0  //当前所学次数
    }
  },
  created() {
    const {courseId, parentKey, childKey} = this.$route.query
    this.initData = courseDetails[courseId]
    this.parentKey = parentKey
    this.childKey = childKey
    this.currentPlay = this.childOperation[0]
    const learnedTime = localStorage.getItem('learnedTime')
    console.log('learnedTime = ',learnedTime)
    const userId = localStorage.getItem('userId')
    this.countTime = parseInt(learnedTime) || 0
    console.log(this.currentPlay,111111)
    this.learnedTimeId = setInterval(() => {
      changeLearnedTime({
        userId: userId,
        learnedTime: this.countTime
      })
      localStorage.setItem('learnedTime',this.countTime)
    }, 15 * 1000)
    this.startInterval()
  },
  destroyed() {
    clearInterval(this.countTimeId)
    clearInterval(this.learnedTimeId)
  },
  computed: {
    childData() {
      return this.initData && this.initData.find(item => item.key === this.parentKey).children
    },
    childOperation() {
      const child = this.childData && this.childData.find(item => item.key === this.childKey)
      return child && child.operations
    },
    parseCountTime() {
      const second = parseInt(this.countTime % 60)
      const minute = parseInt(this.countTime / 60 % 60)
      const hour = parseInt(this.countTime / 3600)
      return `您已经学习了${hour}小时${minute}分${second}秒`
    }
  },
  watch: {
    childKey(n, o) {
      this.currentPlay = this.childOperation[0]
    }
  },
  methods: {
    startInterval() {
      this.countTimeId = setInterval(() => {
        this.countTime += 1
        this.currentCountTime += 1
        switch(this.currentPlay.type) {
          case 'video':
            if(this.currentCountTime > this.videoMax) {
              this.alertWaning()
            }
            break
          case 'markdown':
            if(this.currentCountTime > this.markdownMax) {
              this.alertWaning()
            }
            break
          case 'pdf':
            if(this.currentCountTime > this.pdfMax) {
              this.alertWaning()
            }
            break
          default:
            break
        }
      }, 1000);
    },
    mouseMove() {
      this.currentCountTime = 0
    },
    alertWaning(content = '您是否正在学习？', title = '提示') {
      clearInterval(this.countTimeId)
      this.$alert(content, title, {
        confirmButtonText: '确定',
        callback: () => {
          this.currentCountTime = 0
          this.startInterval()
        }
      })
    },
    changeCurrentPlay(item) {
      this.currentLearnedTime = 0
      const {courseId} = this.$route.query
      this.currentPlay = item
      const learnedCourse = JSON.parse(localStorage.getItem('learnedCourse'))
      const userId = localStorage.getItem('userId')
      console.log('learnedCourse = ',learnedCourse)
      if(learnedCourse.length === 0) { // 第一次学习
        let learnedTimes = { }
        let learnedCategory = { }
        learnedCategory = [this.childKey]
        learnedTimes[this.currentPlay.key] = 1
        let detail = {
          learnedCategory: learnedCategory,
          learnedTimes: learnedTimes
        }
        setTimeout(() => {
          changeLearnedCourse({
            userId: userId,
            courseId: courseId,
            detail: JSON.stringify(detail)
          })
        },this.currentPlay.learnTime * 1000)
        
      } else { // 非第一次学习
        let newDetails = JSON.parse(learnedCourse.detail)
        // if(newDetails.learnedCategory[this.parentKey]) {
        //   if(!(newDetails.learnedCategory[this.parentKey].includes(this.childKey))) {
        //     newDetails.learnedCategory[this.parentKey].push(this.childKey)
        //   } else {
        //     newDetails.learnedCategory[this.parentKey] = [this.childKey]
        //   }
        // }
        // 更新课程学习次数
        if(newDetails.learnedTimes[this.currentPlay.key]) {
          this.currentLearnedTime = newDetails.learnedTimes[this.currentPlay.key]
          newDetails.learnedTimes[this.currentPlay.key] += 1
        } else {
          newDetails.learnedTimes[this.currentPlay.key] = 1
        }
        // 更新学习目录
        if(!newDetails.learnedCategory.includes(this.childKey))  newDetails.learnedCategory.push(this.childKey)
        learnedCourse.detail = JSON.stringify(newDetails)
        console.log('修改后的值为:', learnedCourse)
        setTimeout(() => {
          changeLearnedCourse(learnedCourse)
        },this.currentPlay.learnTime * 1000)
        localStorage.setItem('learnedCourse',JSON.stringify(learnedCourse))
      }
      if(this.currentPlay.type === 'markdown') {
        this.currentPlay.content = courseMarkdownList[this.currentPlay.id].content
        marked(this.currentPlay.content, (err, content) => {
          if (!err) {
            this.currentPlay.content = content
          }
        })
      } else if(this.currentPlay.type === 'pdf') {
        this.src = pdf.createLoadingTask("../assets/c-language.pdf")
        console.log(this.src)
      }
    }
  }
}
</script>

<style>

</style>
