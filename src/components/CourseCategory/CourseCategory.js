import './CourseCategory.scss'
import { categoryList } from '../../constant/index'
export default {
  methods: {
    choose(item) {
      // console.log(item,1111111111)
      this.children = item.children
    }
  },
  data() {
    return {
      children: []
    }
  },
  render() {
    // console.log(categoryList,1111)
    const category = [categoryList.slice(0,6),categoryList.slice(6,12),categoryList.slice(12)]
    const categoryNode = category.map(row => (
      <el-row>
        {row.map(item => (
          <el-col style={{cursor: ''}} span={4}><div onClick={() => this.choose(item)}>{item.name}</div></el-col>
        ))}
      </el-row>
    ))
    const categoryChildrenNode = (
      <div>
          {this.children && this.children.map(item => (
            <div>{item.name}</div>
          ))}
      </div>
    )
    return (
      <div class="category">
        {categoryNode}
        {categoryChildrenNode}
      </div>
    )
  }
}
