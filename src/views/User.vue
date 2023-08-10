<template>
  <div class="manage">
          <!-- :visible.sync="dialogVisible" -->
    <el-dialog
      title="提示"
      v-model:visible="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <!-- 用户表单信息 -->
      <el-form :inline="true" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" value-format="yyyy-MM-DD"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd">+ 新增</el-button>
      <!-- form的搜索区域  -->
      <el-form :inline="true" :model="userForm">
        <el-form-item  prop="addr">
          <el-input placeholder="请输入地址" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table
        stripe
        height="90%"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
          <template v-slot="scope">
            <span>{{scope.row.sex==1?'男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="addr"
          label="地址">
          <template v-slot="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
       <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "sexLabel",
        label: "性别",
      },
      {
        prop: "birth",
        label: "出生日期",
        width: 200,
      },
      {
        prop: "addr",
        label: "地址",
        width: 320,
      },

<script>
import { getUser, adduser, edituser, deluser } from '@/api'
export default {

  data () {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      rules: {
        name: [
             { required: true, message: '请输入姓名' }
        ],
        age: [
             { required: true, message: '请输入年龄' }
        ],
        sex: [
             { required: true, message: '请选择性别' }
        ],
        birth: [
             { required: true, message: '请选择出生日期' }
        ],
        addr: [
             { required: true, message: '请填写地址' }
        ]
      },
      tableData: [],
      modalType: 0, // 0:新增的弹窗，1:表示编辑
      total: 0,
      pageData: {
        page: 1,
        limit: 10
      },
      userForm: {
        name: ''
      }
    }
  },
  methods: {

        // 提交用户表单
        submit () {
          this.$refs.form.validate((valid) => {
            // console.log(valid, 'vaild')
            if (valid) {
              if (this.modalType === 0) {
                adduser(this.form).then(() => {
                  // 重新获取列表的接口
                  this.getList()
                })
              } else {
                edituser(this.form).then(() => {
                  this.getList()
                })
              }
              console.log(this.form, 'form')
              this.$refs.form.resetFields()
              // 关闭弹窗
              this.dialogVisible = false
            }
          })
        },
        handleClose () {
         this.$refs.form.resetFields()
         this.dialogVisible = false
        },
        cancel () {
          this.handleClose()
        },
        handleEdit (row) {
          this.modalType = 1
          this.dialogVisible = true

          this.form = JSON.parse(JSON.stringify(row))
        },
        handleDelete (row) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deluser({ id: row.id }).then(() => {
              this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 重新获取列表的接口
              this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
        },
        // 获取页面数据
        getList () {
          getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
          console.log(data)
          this.tableData = data.list
          this.total = data.count || 0
        })
        },
        handleAdd () {
          this.modalType = 0
          this.dialogVisible = true
        },
        // 选择页码的数字
        handlePage (val) {
          console.log(val, 'val')
          this.pageData.page = val
          this.getList()
        },
        // 列表的查询
        onSubmit () {
          this.getList()
        }
      },
      mounted () {
        this.getList()
      }
}
</script>

<style lang="less" scoped>
  .manage{
    height: 90%;
    .manage-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .common-table{
      position: relative;
      height: calc(100% - 62px);
      .pager{
        position: absolute;
        bottom: 0;
        right: 20px;
      }
    }
  }
</style>
