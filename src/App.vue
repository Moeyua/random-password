<template>
  <div id="app">
    <el-form label-width="100px">

      <el-form-item label-width="0">
        <el-input v-model="password" id="password" size="large" disabled>
          <div slot="suffix" style="background-color:#FFF;height: 38px;margin-top:1px">
          <el-button icon="el-icon-refresh" circle  class="refresh-button"
          :class="{'rotate360':showAnimate}" @click="play"
          ></el-button>
          </div>
          <el-button slot="append" @click="copyToClip(password)">复制</el-button>
        </el-input>
      </el-form-item>

      <el-form-item label="密码长度：">
        <el-slider v-model="length" @input="generate"></el-slider>
      </el-form-item>

      <el-form-item label="可用字符：">
        <el-checkbox-group v-model="symbolType" @change="generate">
          <el-checkbox label="upper">ABC</el-checkbox>
          <el-checkbox label="lower">abc</el-checkbox>
          <el-checkbox label="number">123</el-checkbox>
          <el-checkbox label="symbol">#$*</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { randomStr, getDate, getObjectIsEmpty } from "cfg/utils.js";
import db from "cfg/indexedDB.js";

export default {
  name: "App",
  components: {
  },
  data() {
    return {
      // TODO 修改 config 的数据类型
      password: "",
      length: 15,
      symbolType: ["lower","upper","number"],
      showAnimate: false,
      config: {},
      characters: {}
    };
  },
  async mounted() {
    await db.getDb()
    await db.read('config').then(data => {
      this.handleData('unzip', data);
      this.generate();
    });

  },
  methods: {
    getPool() {
      let symbolType = this.symbolType;
      let pool = [];
      for (const symbol of symbolType) {
        pool = pool.concat(this.characters[symbol])
      }
      return pool;
    },
    generate() {
      if (getObjectIsEmpty(this.characters) || getObjectIsEmpty(this.config)) {
        return;
      } else {
        this.password = randomStr(this.getPool(), this.length);
      }
    },
    async copyToClip(content) {
      let _this = this;
      navigator.clipboard.writeText(content).then(function() {
        _this.$notify({
          title: '成功',
          message: '复制成功',
          type: 'success'
        })
      }, function () {
        _this.$notify.error({
          title: '失败',
          message: '复制失败',
        })
      })
      await db.add('passwords', {value: this.password, date: getDate()}).catch(e => {
        console.log('插入数据库时发生错误:', e);
      });
    },

    /**
     * 处理数据，type 的值为 'zip' 或者 'unzip'
     * @param {Object} data
     * @param {String} type
     */
    handleData(type, data) {
      // TODO 区分 zip 和 unzip
      console.log(data);
      for (const item of data) {
        this[item.id] = item
      }
    },
    play() {
      this.showAnimate = true;
      this.generate();
      setTimeout(()=>{
        this.reset()
      }, 500 )    
    },
    reset() {
      this.showAnimate = false
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 60%;
  margin-left: 20%;
  margin-top: 20%;
}
#password {
  margin-left: 10px;
  
}
.el-input.is-disabled .el-input__inner {
  background-color: #fff;
  color: #000;
}
.el-input.is-disabled .el-input__inner {
  cursor: text;
}
.el-input-group__append, .el-input-group__prepend {
  background-color: rgb(64, 158, 255);
  color: #fff;
}
.refresh-button {
  font-size: 20px;
  border: none;
  background-color:rgba(255,255,255,0);
}
@keyframes rotate360 {
  100% {
    transform: rotate(360deg);
  }
}
.rotate360 {
    animation: rotate360 .5s ease-out 0s;
}
</style>
