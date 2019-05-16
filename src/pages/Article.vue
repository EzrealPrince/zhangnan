<template>
  <div>
    <div class="article">
      <div v-html="content">zzz</div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import Prism from 'prismjs'
//import Comment from './Comment'
import { getArticle } from '../api'
marked.setOptions({
  highlight: (code) => Prism.highlight(code, Prism.languages.javascript)
})
export default {
  data() {
    return {
      content: ""
    }
  },
  created() {
    this.getArticleDetails()
  },
  methods: {
    getArticleDetails() {
      getArticle({article_id: this.$route.query.article_id}).then(res => {
        marked(res.article.article_content, (err, content) => {
          if (!err) {
            res.article.article_content = content
          }
        })
        this.content = res.article.article_content
        console.log(this.content)
      })
    }
  }
  // components: {
  //   Comment
  // }
}
</script>

<style>
  .article {
    margin: 2rem 1rem;
    display: flex;
  }

  .article pre {
    padding: 1rem;
    font: 14px Consolas, "Liberation Mono", Menlo, Courier, monospace;
    background-color: #f7f7f7;
    white-space: pre-wrap;
    overflow: auto;
    max-width: 800px;
  }

  .article code {
    font: inherit;
  }

  .article table {
    border-collapse: collapse;
    margin-bottom:1rem;
  }

  .article td, .article th {
    border: 1px solid #ddd;
    padding: .3rem .6rem;
  }

  .article tbody tr:nth-child(2n+1) {
    background-color: #f7f7f7;
  }

  .article a {
    color: #4078c0;
    transition: all .4s;
  }

  .article a:hover {
    color: #80b2ff;
  }

  .article img, .article code {
    max-width: 100%;
  }

  .article h1, .article h2 {
    border-bottom: 1px solid #d2d2d2;
    margin: 1rem 0;
  }

  .article ul {
    padding-left: 2rem;
  }

  .article li {
    list-style: disc;
  }

  .article p, .article li {
    margin-bottom: 1rem;
    color: rgba(0, 0, 0, .8);
  }

  .article blockquote {
    padding: 0 1.5rem;
    margin: 0;
    color: #777;
    border-left: 4px solid #ddd;
  }

  @media screen and (max-width: 768px) {
    .article {
      padding: 1rem;
      margin: 0;
      font-size: 1.4rem;
    }

    .article h1 {
      font-size: 2.4rem;
    }

    .article h2 {
      font-size: 2.2rem;
    }

    .article h3 {
      font-size: 2rem;
    }

    .article pre {
      font-size: 1.2rem;
    }
  }
</style>
