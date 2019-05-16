
<template>
  <!-- 页面头部 -->
    <header>
        <nav>
            <!-- logo部分 -->
            <div  class="logo" >
                <img  src="../assets/images/logo.png" alt="" />
            </div>

            <!-- 导航栏部分 -->
            <div class="navbar">
             <ul>
                <li><a href="#">首页</a></li>
                <li><a href="#" @click="test">课程</a></li>
                <li><a href="#">课程资料</a></li>
             </ul>
            </div>
            <!-- 搜索框部分 -->
            <div class="search">
                <input type="text" placeholder="请输入关键字" > <!-- 占位符  可显示灰色 -->
                <input type="submit" value=""  />
            </div>
             <!-- 个人中心部分  -->
             <div class="person">
                 <a href="#"><img src="../assets/images/tou.png" alt="">彭于晏</a>
            </div>
        </nav>
    </header>    
    <!-- 页面头部 结束-->  
</template>

<script type="text/babel">
export default {
  data () {
    return {

    }
  },
  methods: {
      test() {
          this.$router.push({
              path: 'about'
          })
      }
  }
}
</script>

<style scoped>
*{
            margin: 0;
            padding: 0;
        }
        ul{
            list-style: none;
        }
        .clearfix:before , .clearfix:after{
            content:" ";
            display:table;
        }
        .clearfix:after{
            clear: both;
        }
        a{
            text-decoration: none;
            color:#050505;
        }
        body{
            background-color:  #f3f5f7;
        }
        input{
            border:0;  /* 所有input没有边框 可修改边框大小 */
            box-sizing: border-box;/* 文本框的margin 和 padding 计算进width中 */
        }
        .container{  /* 版心宽度相等  且居中对齐 */
            width: 1080px;
            margin: 0 auto;
            background-color: #fff;
        }
        /* css初始化完成 */
        /* 页面头部 */
        header{
            height: 100px;
            /* background-color: #666; */
            overflow: hidden; /* 防止嵌套盒子合并 */
        }
        nav{
            height: 42px;
            width: 1200px;
            margin: 26px auto; /* 内盒子上下 左右居中 */
             
        } 
        .logo{
            width: 175px;
            height: 42px;
            float: left;
        }
        /* 导航栏部分 */
        .navbar{
            line-height: 42px;
            float: left;       
            /* background-color: #eee; */
        }
        .navbar li{
            float: left;
        }
        .navbar li a{
            display: block;
            padding: 0 8px; /* 链接字数不同 空格用padding */
            margin-left:8px; 
        }
        .navbar li a:hover{
            border-bottom: 2px solid #00a4ff;  /* 鼠标滑过有底边框 */
        }
        
      
       /* 搜索框部分 */
       .search{
            width: 240px;
            height: 38px;
            border: 1px solid #00a4ff;
            float: left;
            margin-left: 70px;
             margin-right: 30px; 
        }
       .search  input[type=text]{ /* 属性选择器 选择 type=text的文本框 */
            width: 188px;
            height: 38px;
            background-color: #eee;
            padding-left: 10px;
            float: left;
        }
        .search  input[type=submit]{
            width: 50px;
            height: 38px;
            background-color:#00a4ff;
            float: left; /* input行内块元素  有空隙 */ 
            background:#00a4ff url('../assets/images/search.png')  no-repeat center; 
        }
       /* 搜索框部分结束 */ 
        /* 个人中心部分 */
       .person{
           width: 100px;
           margin:0 15px 0 20px;;
           float: left;
           line-height: 42px;
       }
       .person img{
          margin: 0 6px;
       }
       /* 个人中心部分结束 */
</style>
