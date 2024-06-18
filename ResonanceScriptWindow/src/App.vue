<template>
  <div>操作说明</div>
  <div> 1.先查询端口 <span style="color: red">怎么查看adb端口 看下面图 或者百度</span></div>
  <div> 2.连接安卓 <span style="color: red"> 注意端口 是否连接到正确的模拟器</span></div>
  <div>已测试通过模拟器<span style="color: red"> mumu模拟器  分辨率 1280 * 720 dpi 240 </span></div>
  <div> 3.选择跑商城市</div>
  <!--  <router-view></router-view>-->
  <el-button @click="stopTask">暂停运行</el-button>
  <div v-loading="loading">
    <div style="width: 500px;display: flex">
      <el-select
          v-model="form.abdItem"
          placeholder="选择"
      >
        <el-option
            @click="form.abdItem=item"
            v-for="item in form.abdList"
            :key="item.host"
            :label="item.host"
            :value="item.host"
        />
      </el-select>


      <el-button @click="queryAppHost">查询安卓端口</el-button>
      <el-button v-if="form.abdItem" @click="connectApp">连接安卓</el-button>
    </div>
    <div v-if="dev" style="width: 800px;display: flex">
      <el-input v-model="form.resourcePath"/>
      <el-button @click="loadResource">加载资源</el-button>
    </div>

    <div style="width: 300px;">
      <div>
        <span>开始城市</span>
        <el-select style="width: 300px;" v-model="form.city" placeholder="选择城市">
          <el-option @click="form.city=item.value" v-for="item in form.cityOptions"
                     :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </div>

      <div>
        <div>
          <span>砍价</span>
          <el-input-number min="0" max="20" v-model="form.city_cutPriceNum"/>
        </div>
        <div>
          <span>抬价</span>
          <el-input-number min="0" max="20" v-model="form.city_bidUpNum"/>
        </div>
      </div>
    </div>

    <div style="width: 300px">
      <div>
        <span>
        前往城市
       </span>
        <el-select
            style="width: 300px;"
            v-model="form.toCity"
            placeholder="选择城市"
        >
          <el-option
              @click="form.toCity=item.value"
              v-for="item in form.toCityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div>
        <div>
          <span>砍价</span>
          <el-input-number min="0" max="20" v-model="form.toCity_cutPriceNum"/>
        </div>
        <div>
          <span>抬价</span>
          <el-input-number min="0" max="20" v-model="form.toCity_bidUpNum"/>
        </div>
      </div>
      <div  >
        <span>使用采购书</span>
        <el-input-number min="0" max="20" v-model="form.payBookNum"/>
      </div>
    </div>

    <div style="width: 800px;display: flex">
      <el-input v-if="dev" v-model="form.taskId"/>
      <el-input v-if="dev" v-model="form.taskId2"/>
      <el-button   @click="startRun">开始跑商</el-button>
      <el-button v-if="dev" @click="runTask(form.taskId)">运行任务</el-button>
      <el-button v-if="dev" @click="currentLocation">运行任务22</el-button>
      <el-button v-if="dev" @click="toDiTu(form.taskId2)">运行任务33</el-button>
      <!--      <el-button @click="runTask2(taskId)">运行任务2</el-button>-->
    </div>
  </div>
<!--  <img src="./img/img.png"></img>-->

</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  components: {}
  ,
  // 数据属性
  data() {
    return {
      loading: false,
      dev: false,
      form: {
        payBookNum: 0,
        city_cutPriceNum: 0,
        city_bidUpNum: 0,
        toCity_cutPriceNum: 0,
        toCity_bidUpNum: 0,
        city: null,
        toCity: null,
        resourcePath: "D:\\dev\\leisuonashi\\maaApi\\resource",
        abdList: [],
        abdItem: null,
        taskId: "初始化点击",
        taskId2: "初始化点击",
        loading: false,
        cityOptions: [
          {
            label: "修格里城",
            value: "修格里城"
          }, {
            label: "铁盟哨站",
            value: "铁盟哨站",
          }, {
            label: "七号自由港",
            value: "七号自由港"
          }, {
            label: "澄明数据中心",
            value: "澄明数据中心"
          }, {
            label: "阿妮塔战备工厂",
            value: "阿妮塔战备工厂"
          }, {
            label: "阿妮塔能源研究所",
            value: "阿妮塔能源研究所"
          }, {
            label: "荒原站",
            value: "荒原站"
          }, {
            label: "曼德矿场",
            value: "曼德矿场"
          }, {
            label: "淘金乐园",
            value: "淘金乐园"
          }, {
            label: "阿妮塔发射中心",
            value: "阿妮塔发射中心"
          }
        ],
        toCityOptions: [
          {
            label: "修格里城",
            value: "修格里城"
          }, {
            label: "铁盟哨站",
            value: "铁盟哨站",
          }, {
            label: "七号自由港",
            value: "七号自由港"
          }, {
            label: "澄明数据中心",
            value: "澄明数据中心"
          }, {
            label: "阿妮塔战备工厂",
            value: "阿妮塔战备工厂"
          }, {
            label: "阿妮塔能源研究所",
            value: "阿妮塔能源研究所"
          }, {
            label: "荒原站",
            value: "荒原站"
          }, {
            label: "曼德矿场",
            value: "曼德矿场"
          }, {
            label: "淘金乐园",
            value: "淘金乐园"
          }, {
            label: "阿妮塔发射中心",
            value: "阿妮塔发射中心"
          }
        ]
      }
    };
  },
  async created() {
    try {
      let form = JSON.parse(localStorage.getItem('form'));
      if (form) {
        this.form = form;
      }
    } catch (e) {
      console.log(e)
    }
    await this.stopTask()
    this.loading = false

  },
  watch: {
    form: {
      deep: true, // 开启深度监听，用于监听对象或数组内部的变化
      handler(newValue, oldValue) {
        localStorage.setItem('form', JSON.stringify(newValue));
      },
    },
  },
  methods: {

    async currentLocation() {
      //当前位置
      let location = null
      if (!location) {
        let flag = await this.runTask("当前_地图");
        if (flag) {
          location = '当前_地图';
        }
      }

      if (!location) {
        let flag = await this.runTask("当前_进入站点");
        if (flag) {
          location = '当前_进入站点';
        }
      }

      if (!location) {
        let flag = await this.runTask("当前_进入站点")
        if (flag) {
          location = '当前_进入站点';
        }
      }

      if (!location) {
        let flag = await this.runTask("当前_交易所")
        if (flag) {
          location = '当前_交易所';
        }
      }


      if (!location) {
        let flag = await this.runTask("当前_铁盟哨站")
        if (flag) {
          location = '当前_铁盟哨站';
        }
      }

      if (!location) {
        let flag = await this.runTask("当前_修格里城")
        if (flag) {
          location = '当前_修格里城';
        }
      }

      if (!location) {
        let flag = await this.runTask("当前_荒原站")
        if (flag) {
          location = '当前_荒原站';
        }
      }

      if (!location) {
        let flag = await this.runTask("当前_曼德矿场")
        if (flag) {
          location = '当前_曼德矿场';
        }
      }

      if (!location) {
        let flag = await this.runTask("当前_淘金乐园")
        if (flag) {
          location = '当前_淘金乐园';
        }
      }

      if (!location) {
        let flag = await this.runTask("当前_澄明数据中心")
        if (flag) {
          location = '当前_澄明数据中心';
        }
      }

      if (!location) {
        let flag = await this.runTask("当前_七号自由港")
        if (flag) {
          location = '当前_七号自由港';
        }
      }

      if (!location) {
        let flag = await this.runTask("当前_阿妮塔战备工厂")
        if (flag) {
          location = '当前_阿妮塔战备工厂';
        }
      }

      if (!location) {
        let flag = await this.runTask("当前_阿妮塔能源研究所")
        if (flag) {
          location = '当前_阿妮塔能源研究所';
        }
      }

      if (!location) {
        let flag = await this.runTask("当前_阿妮塔发射中心")
        if (flag) {
          location = '当前_阿妮塔发射中心';
        }
      }

      if (location) {
        this.$message.success('当前位置:' + location)
      }
      return location;
    },

    queryAppHost() {
      this.loading = true;
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:5000/queryAppHost',
        headers: {}
      };

      axios.request(config)
          .then((response) => {
            this.form.abdList = JSON.parse(JSON.stringify(response.data));
            this.loading = false;

          })
          .catch((error) => {
            console.log(error);
            this.loading = false;

          });

    },

    loadResource() {
      this.loading = true;

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:5000/loadResource',
        headers: {},
        data: {
          resourcePath: this.form.resourcePath
        }
      };

      axios.request(config)
          .then((response) => {

            this.loading = false;

          })
          .catch((error) => {
            console.log(error);
            this.loading = false;

          });

    },

    connectApp() {
      this.loading = true;

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:5000/connectApp',
        headers: {},
        data: {
          adbPath: this.form.abdItem.adbPath, // 替换为您的实际API密钥
          adbIpHost: this.form.abdItem.host // 替换为您的实际API密钥
          // 您可以在这里添加更多的请求参数
        }
      };
      axios.request(config)
          .then((response) => {
            this.loading = false;

            console.log(response.data)
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;

          });

    },

    async runTask(taskId) {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:5000/runTask',
        headers: {},
        data: {
          taskId: taskId
        }
      };
      try {

        let response = await axios.request(config);
        if ('None' == response.data.toString()) {
          this.$message.error(taskId + ":操作失败")
          return false
        } else {

          this.$message.success(taskId + ":操作成功")
          return response
        }
      } catch (error) {
        // this.loading = false;
        console.log(error);
      }

    },

    async stopTask() {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:5000/stopTask',
        headers: {}
      };
      try {

        let response = await axios.request(config);
        if ('None' == response.data.toString()) {
          // this.$message.error(taskId + ":操作失败")
          return false
        } else {

          return response
        }
      } catch (error) {
        // this.loading = false;
        console.log(error);
      }

      this.loading =false;
    },

    async runTask2(taskId, num) {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:5000/runTask2',
        headers: {},
        data: {
          taskId: taskId
        }
      };
      try {

        let response = await axios.request(config);
        if ("砍价" === toCityList[i]) {
          if (this.form.city_cutPriceNum === 0) {
            return
          }
          let response = await this.runTask("幅度");
          let num = response.data.all[0].text.replaceAll('%', '');
          while (num < this.form.city_cutPriceNum) {
            await this.runTask(taskId)
            let response = await this.runTask("幅度");
            num = response.data.all[0].text.replaceAll('%', '');
          }
        }
        if ('None' == response.data.toString()) {
          this.$message.error(taskId + ":操作失败")
          return false
        } else {
          this.$message.success(taskId + ":操作成功")
          return true
        }
      } catch (error) {
        // this.loading = false;
        console.log(error);
      }

    },

    startRun() {

      this.startCity(null)
    },

    async startCity(count) {


      if (count) {
        this.$message.success('运行第:' + count + "轮")
        count++
      }

      if (!this.form.city || !this.form.toCity) {
        this.$message.error("跑商城市未配置")

        return
      }

      if (this.form.city === this.form.toCity) {
        this.$message.error("跑商城市不能相同")
        return
      }
      this.loading = true
      let location = await this.currentLocation();
      while (!location){
         location = await this.currentLocation();
      }
      if (location) {
        this.$message.success('当前位置:' + location)
      } else {
        this.$message.error('将运行页面跳转到地图')
        return
      }
      if (!count) {
        //前往地图页面
        await this.toDiTu(location);
        count = 1
      }


      await this.runCity(this.form.toCity, 'toCity')
      await this.runCity(this.form.city, 'city')
      await this.startCity(count)
      this.loading = false

    },
    async toDiTu(location) {
      location = await this.currentLocation();
      //当前位置
      if (location === "当前_进入站点") {
        await this.runTask("启程")
      } else if (location === "当前_进入站点") {
        await this.runTask("当前_进入站点")
        await this.runTask("进入站点")
        await this.runTask("启程")

      } else if (location === "当前_交易所") {
        await this.runTask("返回车站")
        await this.runTask("启程")
      } else if (location === "当前_地图") {
        //不处理
      }
      await this.runTask("返回车站")
      await this.runTask("访问城市")
      //查询当前地点
      let currentLocation = await this.currentLocation();
      if (currentLocation.toString().split("_")[1] === this.form.toCity) {
        let city = this.form.city;
        this.form.city = this.form.toCity
        this.form.toCity = city
      }

      await this.runTask("返回车站")
      await this.runTask("启程")
      // if (currentLocation === "当前_铁盟哨站") {
      //   //当前铁盟哨站
      //   let city = this.form.city;
      //   this.form.city ='铁盟哨站'
      //   this.form.toCity = city
      //
      // } else if (currentLocation === "当前_修格里城") {
      //
      // } else if (currentLocation === "当前_荒原站") {
      //
      // } else if (currentLocation === "当前_曼德矿场") {
      //
      // } else if (currentLocation === "当前_淘金乐园") {
      //
      // } else if (currentLocation === "当前_澄明数据中心") {
      //
      // } else if (currentLocation === "当前_七号自由港") {
      //
      // } else if (currentLocation === "当前_阿妮塔战备工厂") {
      //
      // } else if (currentLocation === "当前_阿妮塔能源研究所") {
      //
      // } else if (currentLocation === "当前_阿妮塔发射中心") {
      //
      // }
    },

    async runCity(to_city, cityType) {
      let init = ['左上滑动', '左上滑动', '左上滑动', '左上滑动', '初始化点击', '初始化点击', '初始化点击'];
      for (let k = 0; k < init.length; k++) {
        await this.runTask(init[k])
      }

      let toCityList = []
      if (to_city === '曼德矿场') {
        toCityList = ['右上滑动', '右上滑动', '右上滑动', '右上滑动', '地点_曼德矿场', '前往目的地']
      } else if (to_city === '淘金乐园') {
        toCityList = ['右下滑动', '右下滑动', '右下滑动', '右下滑动', '上滑动', '地点_淘金乐园', '前往目的地']
      } else if (to_city === '荒原站') {
        toCityList = ['右上滑动', '右上滑动', '右上滑动', '右上滑动', '地点_荒原站', '前往目的地']
      } else if (to_city === '铁盟哨站') {
        toCityList = ['右上滑动', '右上滑动', '右上滑动', '右上滑动', '地点_铁盟哨站', '前往目的地']
      } else if (to_city === '修格里城') {
        toCityList = ['右上滑动', '右上滑动', '右上滑动', '右上滑动', '左滑动', '左滑动', '地点_修格里城', '前往目的地']
      } else if (to_city === '澄明数据中心') {
        toCityList = ['左上滑动', '左上滑动', '左上滑动', '左上滑动', '地点_澄明数据中心', '前往目的地']
      } else if (to_city === '七号自由港') {
        toCityList = ['左上滑动', '左上滑动', '左上滑动', '左上滑动', '地点_七号自由港', '前往目的地']
      } else if (to_city === '阿妮塔战备工厂') {
        toCityList = ['左上滑动', '左上滑动', '左上滑动', '左上滑动', '地点_阿妮塔战备工厂', '前往目的地']
      } else if (to_city === '阿妮塔发射中心') {
        toCityList = ['左上滑动', '左上滑动', '左上滑动', '左上滑动', '下滑动', '下滑动', '地点_阿妮塔发射中心', '前往目的地']
      } else if (to_city === '阿妮塔能源研究所') {
        toCityList = ['左上滑动', '左上滑动', '左上滑动', '左上滑动', '下滑动', '下滑动', '地点_阿妮塔能源研究所', '前往目的地']
      }

      for (let k = 0; k < toCityList.length; k++) {
        await this.runTask(toCityList[k])
      }
      let to_进站 = ['进入站点', '访问城市', '右上滑动', '右上滑动', '交易所']

      for (let k = 0; k < to_进站.length; k++) {
        await this.runTask(to_进站[k])
      }

      let cutPriceNum = 0;
      let bidUpNum = 0;
      if (cityType === 'toCity') {
        cutPriceNum = this.form.toCity_cutPriceNum
        bidUpNum = this.form.toCity_bidUpNum
      } else if (cityType === 'city') {
        cutPriceNum = this.form.city_cutPriceNum
        bidUpNum = this.form.city_bidUpNum
      }

      let to_卖出 = ['我要卖', '砍价', '全部卖出', '卖出', '卖出', '点击空白']

      for (let k = 0; k < to_卖出.length; k++) {
        if ("砍价" === to_卖出[k]) {
          await this.tiJiaGe(cutPriceNum, to_卖出[k]);
        } else {
          await this.runTask(to_卖出[k])
        }
      }

      let to_买出 = ['我要买', '进货采购书', '抬价', '全部买入', '买入', '买入', '点击空白']

      for (let k = 0; k < to_买出.length; k++) {
        if ("抬价" === to_买出[k]) {
          await this.tiJiaGe(bidUpNum, to_买出[k]);
        } else if ("进货采购书" === to_买出[k]) {
          await this.jinhuogoumaishu();
        } else {
          await this.runTask(to_买出[k])
        }
      }

      let to_返回地图 = ['返回车站', '启程']

      for (let k = 0; k < to_返回地图.length; k++) {
        await this.runTask(to_返回地图[k])
      }

      return true
    },

    async tiJiaGe(num, taskId) {

      if (num === 0) {
        return
      }
      let currentNum = 0
      while (num > currentNum && num !== Number.parseInt(currentNum)) {
        await this.runTask(taskId)
        let response = await this.runTask("幅度");
        currentNum = response.data.all[0].text.replaceAll('%', '');
      }
    },
    async jinhuogoumaishu() {
      if (this.form.payBookNum !== 0) {
        let clickList = ['使用道具', '进货采购书', '进货采购书_确认','进货采购书_确认'];

        for (let j = 0; j < this.form.payBookNum; j++) {

          for (let k = 0; k < clickList.length; k++) {

            await this.runTask(clickList[k])
          }

        }
      }

    }
  }
}


</script>
<style>
div * {

}
</style>
