import './Category.scss'
export default {
  methods: {
    clickOptions(eventName) {
      this.$emit(eventName)
    }
  },
  data() {
    return {
      categoryList: [
        {
          label: 'Back-End',
          total: 7,
          children: [
            {
              label: 'Node.js',
              total: 6
            }, {
              label: 'Python',
              total: 1
            }
          ]
        }, {
          label: 'Front-End',
          total: 10,
          children: [
            {
              label: 'JavaScript',
              total: 9,
              children: [
                {
                  label: 'JavaScript-Core',
                  total: 5,
                }, {
                  label: 'JavaScript-Design',
                  total: 2,
                }, {
                  label: 'JavaScript-Library&Framework',
                  total: 1,
                }, {
                  label: 'Ohters',
                  total: 1,
                }
              ]
            }
          ]
        }, {
          label: 'Others',
          total: 1,
        }
      ]  
    } 
  },
  render() {
    function createCategory(list) {
      const child = list.map(item => {
        let result
        item.children && (result = createCategory(item.children))
        return  (<li className="category-list-item">
          <a>{item.label}</a>
          <span>({item.total})</span>
          <ul className="category-list-child" style={{marginLeft: '10px'}}>{result}</ul>
        </li>)
      })
      return (<ul className="category-list">
          {child}
        </ul>
      )
    }
    const categoryNode = createCategory(this.categoryList)
    return (
      <div class="category">
        {categoryNode}
      </div>
    )
  }
}
