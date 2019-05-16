<template>
<div class="app-catainer">
  <a-header class="header"/>
  <course-category />
  <course-card v-for="(item,index) of courseList" :key="index" :init-data="item" />
  <div class="list-wrapper">
    <ul class="list-container" id="list-ul">
      <li v-for="(item, index) in items" :key="index">
        <a @click.prevent="getArticleDetails(item.article_id)">      
          <p class="list-title">{{item.article_title}}</p>
          <p class="list-updated">{{item.article_create_time}}</p>
          <p class="list-abstract">{{item.article_summary}}</p>
        </a>
      </li>
    </ul>
  </div>
  <a-footer class="footer"/>
</div>
</template>

<script>
import { getHomeList } from '../api'
import request from '../utils/request'
import AHeader from '../components/AHeader'
import CourseCategory from '../components/CourseCategory/CourseCategory'
import CourseCard from '../components/CourseCard/CourseCard'
import AFooter from '../components/AFooter'
import {courseList} from '../constant/index'
export default {
  components: {
    CourseCategory,
    AHeader,
    AFooter,
    CourseCard
  },
  data() {
    return {
      items: [],
      courseList: courseList
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    getArticleList() {
      getHomeList({articleTag: ''})
      .then(res => {
        this.items = res.article_list
        console.log(this.items)
      }) 
    },
    getArticleDetails(id) {
      this.$router.push({
        path: 'article',
        query: {
          article_id: id
        }
      })
    }
  }
}
</script>

<style>
.list-container li {
  border-bottom: 1px solid #eee;
}

.list-title {
  font-size: 2.6rem;
  font-weight: 400;
  color: #404040;
  margin-top: 0;
}

.list-abstract {
  font-size: 1.6rem;
  color: #919191;
  font-weight: 300;
}

.list-updated {
  font-family: "Comic Sans MS", curslve, sans-serif;
  font-size: 1.8rem;
  color: #8b8b8b;
  padding: 5px 0;
}

.list-container li a {
  padding: 1rem 1.5rem;
  display: block;
  transition: all .3s;
  margin:0;
}

.list-container li a:hover {
  background-color: Rgba(0, 0, 0, .02);
}

@media screen and (max-width: 768px) {
  .list-title {
    font-size: 2.2rem;
  }

  .list-updated {
    font-size: 1.6rem;
  }
}
.footer {
  order: 3;
  display: flex;
  height: 10rem;
}

</style>
