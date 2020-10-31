<template>
  <div class="about" align="center">
    <el-table
            :data="tableData"
            border
            style="width: 80%">
      <el-table-column
              type="index"
              :index="indexMethod"
              prop="index"
              label="序号"
              width="80"
              align="center">
      </el-table-column>
      <el-table-column
              prop="servNo"
              label="业务号码"
              align="center">
      </el-table-column>
      <el-table-column
              prop="orderId"
              label="订单号"
              align="center">
      </el-table-column>
      <el-table-column
              prop="traceId"
              label="交易号"
              align="center">
      </el-table-column>
      <el-table-column
              prop="timestamp"
              label="交易时间"
              align="center">
      </el-table-column>
      <el-table-column
              prop="total_time"
              label="订单耗时"
              align="center">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
              :current-page="currentPage"
              background
              layout="prev, pager, next"
              :total="1000"
              :page-size="20"
              @current-change="handleCurrentChange"
              >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
      }
    },
    methods:{
      indexMethod(index) {
        index = index + 1;
        return index;
      },
      show(){
        const scenarioCode = this.$route.params.scenarioCode
        console.log(scenarioCode)
        this.$axios.get("/query/findByScenario/",{
          params: {
            scenarioCode: scenarioCode,
            page:0
          }}).then(res =>{
            console.log(res.data.records)
            this.tableData = res.data.rows
        })
      },
      PageAxios(page){
        const scenarioCode = this.$route.params.scenarioCode
        this.$axios.get("/query/findByScenario/",{
          params: {
            scenarioCode: scenarioCode,
            page:page-1
          }}).then(res =>{
          console.log(res.data.records)
          this.tableData = res.data.rows
        })
      },
      handleCurrentChange: function (currentPage) {
        this.PageAxios(currentPage)
      }
    },
    created() {
      // this.show()
      this.PageAxios(1)
    }
  }
</script>
