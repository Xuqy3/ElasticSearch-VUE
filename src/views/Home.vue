<template>
  <div class="content">
    <div class="content-main">
      <div class="content-main-top">
        <div class="content-main-top-starttime">
          <span>开始时间</span>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="content-main-top-endtime">
          <span>结束时间</span>
          <el-date-picker v-model="value2" type="date" placeholder="选择日期"></el-date-picker>
        </div> <span  class="content-main-top-type-title">场景</span>
        <div class="content-main-top-type">
          <el-select v-model="value" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="content-main-top-btn">
          <el-button type="primary" @click="search(value)">查询</el-button>
<!--          <el-button type="primary">新增</el-button>-->
        </div>
      </div>
      <div class="content-main-table">
        <el-table
                :data="tableData"
                style="width: 100%"
                :border="true"
        >
          <el-table-column
                  :index="indexMethod"
                  label="序号"
                  type="index"
                  width="180"
                  align="center">
          </el-table-column>
          <el-table-column
                  prop="scenarioName"
                  label="场景"
                  align="center">
          </el-table-column>
          <el-table-column
                  prop="count"
                  label="数量"
                  align="center"
                  >
            <template slot-scope="scope">
              <router-link v-bind:to="{name:'About',params:{scenarioCode:scope.row.scenarioCode}}">{{scope.row.count}}</router-link>
            </template>
<!--            <router-link :to="{name:'About',params: {scenarioName:this.tableData}}"></router-link>-->
          </el-table-column>
<!--          <el-table-column-->
<!--                  align="center"-->
<!--                  v-for="(item,index) in props"-->
<!--                  :key="index"-->
<!--                  :prop="item.prop"-->
<!--                  :label="item.label"-->
<!--                  :sortable="item.sortable"-->
<!--                  :width="item.width">-->
<!--          </el-table-column>-->
        </el-table>
      </div>
    </div>
    <div class="content-bottom">
      <div class="content-bottom-page">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next, jumper"
                :total="8">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: "",
        value1: "",
        value2: "",
        options: [
          {
            value: "10111011001",
            label: "移动用户集团直充",
          },
          {
            value: "11111014002",
            label: "欠费停机提醒",
          },
          {
            value: "11111014001",
            label: "流量阈值提醒",
          },
          {
            value: "10111010002",
            label: "4G用户可选包",
          },
          {
            value: "10111010001",
            label: "4G业务新装受理开通",
          },
          {
            value: "11111010004",
            label: "翼支付功能开通",
          },
          {
            value: "11111110001",
            label: "宽带产品新装",
          },
          {
            value: "11111011004",
            label: "集团11888充值",
          },
        ],
        tableData: [],
        props: [
          {
            align : "center",
            prop : "scenarioName",
            sortable : false,
            label : "场景",
            width:260
          },
          {
            align : "center",
            prop : "count",
            sortable : true,
            label : "订单数量"
          }

        ]
      }

    },
    watch:{
      tableData:{
        handler(val){
          this.tableData = val;
          console.log(val);
        },
        deep:true
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      show(){       //显示所有
        const _this=this
        _this.$axios.get("/query/findAll").then(res => {
          console.log(res.data)
          _this.tableData = res.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      search(scenarioCode){   //显示查询的数据
        this.$axios.get("/query/scenarios/",{
          params: {
            scenarioCode: scenarioCode,
          }}).then(res =>{
          this.tableData = []
          this.tableData = res.data
        })
        .catch(()=>{
          console.log(error)
        })
      },
      indexMethod(index) {
        index = index + 1;
        return index;
      },
    },
    created() {
      this.show()
    },
  };
</script>

<style lang="scss" scoped>
  .content {
    width: 100vw;
    background: white;
    .content-top {
      padding-top: 15px;
    }
    .content-main {
      .content-main-top {
        width: 1100px;
        display: flex;
        height: 56px;
        line-height: 56px;
        background: #e0e0e0;
        .content-main-top-starttime {
          margin: 0 10px 0 20px;
          span {
            margin-right: 10px;
          }
        }
        .content-main-top-endtime {
          margin: 0 10px;
          span {
            margin-right: 10px;
          }
        }
        .content-main-top-type-title{
          margin-right: 10px;
        }
        .content-main-top-type {
          margin: 0 10px;
        }
        .content-main-top-btn {
          margin: 0 10px;
        }
      }
      .content-main-table{
        width: 1100px;
        margin-top: 50px;
      }
    }
  }
  // ::v-deep .el-input--suffix .el-input__inner{
  //     padding-right: 0;
  // }
  ::v-deep .el-select {
    width: 100%;
  }
  ::v-deep .el-form-item__content {
    width: 260px;
  }
  .content-bottom{
    margin-top: 15px;
    width: 1100px;
    height: 40px;
    background: #e0e0e0;
    .content-bottom-page{
      float: left;
      margin-top: 5px;
    }
  }

</style>