<template>
<!-- https://github.com/herozhou/vue-order-calendar -->
  <div id="calendar" v-loading="dataListLoading">
    <!-- 年份 月份 -->
    <div class="month">
       <!--  <ul>
            点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写)
            <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
            <li class="year-month" @click="pickYear(currentYear,currentMonth)">
                <span class="choose-year">{{ currentYear }}</span>
                <span class="choose-month">{{ currentMonth }}月</span>
            </li>
            <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
        </ul>
 -->
        <i class="el-icon-arrow-left pointer" @click="pickPre(currentYear,currentMonth)"></i>
        <el-date-picker
          v-model="defaultDate"
          type="month"
          :clearable=false
          :editable=false
          @change="initData"
          placeholder="选择月份">
        </el-date-picker>
        <i class="el-icon-arrow-right pointer" @click="pickNext(currentYear,currentMonth)"></i>

    </div>
    <!-- 星期 -->
    <ul class="weekdays">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
        <li>日</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
        <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
        <li  v-for="(dayobject,index) in days" :key="index" @click="choseDay(dayobject)">
            <!--本月-->
            <!--如果不是本月  改变类名加灰色-->

            <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>

            <!--如果是本月  还需要判断是不是这一天-->
            <span v-else>
          <!--今天  同年同月同日-->
                <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }}</span>
                <span v-else>{{ dayobject.day.getDate() }}</span>
            </span>
				<br>
            <div class="box-count" v-if="dayobject.count>0">{{dayobject.count}}只</div>

        </li>
    </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      dataListLoading: false,
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      defaultDate: ""
    };
  },
  created: function() {
    // 在vue初始化时调用
    this.initData(null);
  },
  methods: {
    // 初始化日期数据
    initData: function(cur) {
      var leftcount = 0; // 存放剩余数量
      var date;

      if (cur) {
        date = new Date(cur);
      } else {
        var now = new Date();
        var d = new Date(
          this.formatDate(now.getFullYear(), now.getMonth()+1, 1)
        );
        d.setDate(35);
        date = new Date(this.formatDate(d.getFullYear(), d.getMonth(), 1));
      }
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      this.currentWeek = date.getDay(); // 1...6,0
      if (this.currentWeek == 0) {
        this.currentWeek = 7;
      }
      var str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      );
      this.defaultDate = str;
      this.days.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个
      // 初始化本周
      for (var i = this.currentWeek - 1; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject = {}; // 用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day = d;
        this.days.push(dayobject); // 将日期放入data 中的days数组 供页面渲染使用
      }

      // 其他周
      for (var i = 1; i <= 42 - this.currentWeek; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject = {};
        dayobject.day = d;

        this.days.push(dayobject);
      }

      this.getCalendar();
    },
    // 获取箱数日历
    getCalendar: function() {
      // 请求后台返回的数据
      var list = {1: 0,
                  2: 15,
                  3: 0,
                  4: 0,
                  5: 0,
                  6: 0,
                  7: 0,
                  8: 1,
                  9: 0,
                  10: 0,
                  11: 0,
                  12: 0,
                  13: 0,
                  14: 0,
                  15: 0,
                  16: 0,
                  17: 0,
                  18: 0,
                  19: 0,
                  20: 0,
                  21: 0,
                  22: 0,
                  23: 0,
                  24: 0,
                  25: 0,
                  26: 0,
                  27: 0,
                  28: 0,
                  29: 0,
                  30: 0,
                  31: 0}
      var startIndex = 0;
      this.days.forEach((item, index) => {
        var i = item.day.getDate();
        if (i == 1 && index < 7) {
          startIndex = index;
        }
      });
      for (var key in list) {
        this.days[startIndex + Number(key) - 1].count = list[key];
      }
    },
    // 选择日期进入列表页
    choseDay: function(dayobject) {
      var day = JSON.stringify(dayobject.day);
      this.menuActiveName = "";
      this.$router.push({
        name: "modules-time-containerOutput.html",
        //   name: 'modules-time/procurement/buy.html',
        query: { date: day }
      });
    },

    pickPre: function(year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickNext: function(year, month) {
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickYear: function(year, month) {
      alert(year + "," + month);
    },

    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function(year, month, day) {
      var y = year;
      var m = month;
      if (m < 10) m = "0" + m;
      var d = day;
      if (d < 10) d = "0" + d;
      return y + "-" + m + "-" + d;
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

ul {
  list-style-type: none;
}

body {
  font-family: Verdana, sans-serif;
  background: #e8f0f3;
}
#calendar {
  width: 90%;
  margin: 0 auto;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.el-icon-arrow-left.pointer,.el-icon-arrow-right.pointer{
  cursor: pointer;
}
.month {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.month .el-date-editor.el-input {
  cursor: pointer;
}
.month .el-input__inner {
  border: none;
  text-align: center;
  cursor: pointer;
}
.month .el-input__icon {
  display: none;
}

.year-month {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.year-month:hover {
  background: rgba(150, 2, 12, 0.1);
}

.choose-year {
  padding-left: 20px;
  padding-right: 20px;
}

.choose-month {
  text-align: center;
  font-size: 1.5rem;
}

.arrow {
  padding: 30px;
}

.arrow:hover {
  background: rgba(100, 2, 12, 0.1);
}

.month ul li {
  color: white;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.weekdays {
  margin: 0;
  padding: 10px 0;
  background-color: #999;
  display: flex;
  flex-wrap: wrap;
  color: #ffffff;
  justify-content: space-around;
}

.weekdays li {
  display: inline-block;
  width: 13.6%;
  text-align: center;
}

.days {
  padding: 0;
  background: #ffffff;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.days li {
  list-style-type: none;
  display: inline-block;
  width: 14.2%;
  height: 100px;
  /*text-align: center;*/
  padding: 15px;
  font-size: 1rem;
  color: #666;
  border-right: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
}

.days li .active {
  padding: 6px 10px;
  border-radius: 50%;
  background: #00b8ec;
  color: #fff;
}

.days li .other-month {
  padding: 5px;
  color: #ccc;
}

.days li:hover {
  background: #81e8de;
}
.box-count {
  text-align: center;
  line-height: 60px;
  height: 60px;
  font-size: 1.1rem;
  color: #333;
}
</style>

