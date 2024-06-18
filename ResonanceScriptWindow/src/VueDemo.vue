<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "name",
  // 数据属性
  data() {
    return {
      message: 'Hello Vue.js!',
      userInput: '',
      showInput: false,
      displayedInput: ''
    };
  },

  // 计算属性
  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('');
    }
  },

  // 侦听器
  watch: {
    userInput(newValue, oldValue) {
      console.log(`Input changed from "${oldValue}" to "${newValue}"`);
    }
  },

  // 方法
  methods: {
    displayInput() {
      this.displayedInput = this.userInput;
      this.showInput = true;
    }
  },

  // 生命周期钩子
  beforeCreate() {
    console.log('beforeCreate: 组件实例被创建，但属性还没有初始化');
  },
  created() {
    console.log('created: 属性已经被初始化，但DOM还未生成');
  },
  beforeMount() {
    console.log('beforeMount: 模板编译完成，但还未渲染到页面上');
  },
  mounted() {
    console.log('mounted: 组件已经挂载到DOM中，可以访问DOM元素');
  },
  beforeUpdate() {
    console.log('beforeUpdate: 数据变化导致的DOM更新前调用');
  },
  updated() {
    console.log('updated: DOM已完成更新');
  },
  beforeUnmount() {
    console.log('beforeUnmount: 组件卸载前调用');
  },
  unmounted() {
    console.log('unmounted: 组件已从DOM中卸载');
  }
};
</script>

<style scoped>
/* 在这里添加组件样式 */
</style>
