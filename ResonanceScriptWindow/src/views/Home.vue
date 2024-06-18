<template>
  abdList{{abdList}}
  <div>
    <div>
      <el-button>查询abd连接</el-button>
    </div>
    <div>
      <el-input></el-input>
      <el-button>连接</el-button>
    </div>
    <div>
      <el-input></el-input>
      <el-button>加载资源</el-button>
    </div>
    <div>
      <el-input></el-input>
      <el-button>运行任务</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "name",
  // 数据属性
  data() {
    return {
    abdList:""

    };
  },

  // 计算属性
  computed: {

  },

  // 侦听器
  watch: {

  },

  // 方法
  methods: {

  },


  async created() {
    axios.post("http://127.0.0.1:28011/queryAppHost", {responseType: 'blob', params: this.search})
        .then(response => {
          // 创建Blob对象
          console.log(response)

        })

  },

};
</script>

<style scoped>
/* 在这里添加组件样式 */
</style>
