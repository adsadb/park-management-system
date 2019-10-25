<template>
  <section>
      <el-row>
        <div>时间：
            <DatePicker type="daterange" placement="bottom-start" placeholder="Select date" style="width: 200px"></DatePicker>
            <Button type="primary" @click="model1=true" style="margin-left:10px">请假备注
            </Button>
            <Input v-model="value" style="width:auto;display:inline-table;margin-left:450px">
                <Select v-model="select" slot="prepend" style="width: 80px">
                    <Option value="day">Day</Option>
                    <Option value="month">Month</Option>
                </Select>
                <Button slot="append" icon="ios-search"></Button>
            </Input>
            <Button icon="md-download" :loading="exportLoading" @click="exportExcel" style="float:right">导出文件</Button>
        </div>       

        <Modal v-model="model1" title="请假备注" @on-ok="ok" @on-cancel="cancel" footer-hide>
            <!-- 自定义表单 -->
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="员工ID" prop="id">
                    <Input v-model="formValidate.cid" placeholder="Enter your id"></Input>
                </FormItem>
                <FormItem label="请假原因" prop="type">
                    <Select v-model="formValidate.leaveInfo" clearable style="width:200px">
                        <Option value="病假">病假</Option>
                        <Option value="month">Month</Option>
                    </Select>                    
                </FormItem>
                <FormItem label="请假时间" prop="date">
                    <DatePicker @on-change="setStartTime" format="yyyy-MM-dd" type="date" placement="bottom-start" placeholder="Select start date" style="width: 200px"></DatePicker>-
                    <DatePicker @on-change="setEndTime" format="yyyy-MM-dd" type="date" placement="bottom-start" placeholder="Select end date" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        
        </Modal>
        </el-row>
    <br>
    <div>
        <Table border size="small" :data="tableDatas" :columns="columns"></Table>
    </div>
  </section>
</template>
<script>
import excel from '@/libs/excel'
import {checkService} from '@/api/service'
export default {
    name: 'export-excel',
    data() {
        return {
            select:'',
            value:'',
            options:[],
            exportLoading: false,
            tableDatas: [
                // {
                //     name:'Tom',
                //     department:'人事主管',
                //     attendance_days: '5',
                //     late_times: '6',
                //     leave_days: '7',
                //     absenteeism_days: '8',
                // },                
            ],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: "姓名",
                    key: "name",
                },
                {
                    title: "部门",
                    key: "deptno",
                },
                {
                    title: "出勤天数",
                    key: "onduty",
                    sortable: true
                },
                {
                    title: "迟到次数",
                    key: "dealy",
                    sortable: true
                },
                {
                    title: "请假天数",
                    key: "leave",
                    sortable: true
                },
                {
                    title: "旷工天数",
                    key: "neglect",
                    sortable: true
                },
                {
                    title: "请假旷工详情",
                    key: "detail",
                    render: (h, params) => {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.show(params.index)
                                            }
                                        }
                                    }, 'View'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index)
                                            }
                                        }
                                    }, 'Delete')
                                ]);
                            }
                }
                
            ],
            model1:false,

            formValidate: {
                            cid:'',
                            leaveStart:'',
                            LeaveEnd:'',//注意此处后台数据类型名开头是大写L
                            leaveInfo:''
                        },
            ruleValidate: {
                cid: [
                    { required: true, message: 'The id cannot be empty', trigger: 'blur' }
                ],               
                leaveInfo: [
                    { required: true, message: 'The leaveInfo cannot be empty', trigger: 'blur' }
                ],
                leaveStart: [
                    { required: true, message: 'The leaveStart cannot be empty', trigger: 'blur' }
                ],
                LeaveEnd: [
                    { required: true, message: 'The LeaveEnd cannot be empty', trigger: 'blur' }
                ],              
            }

        };
    },
    methods: {
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
            ok () {
                    this.$Message.info('Clicked ok');
            },
            cancel () {
                    this.$Message.info('Clicked cancel');
            },
            //添加员工
            async handleSubmit (name) {
                    console.log(this.formValidate)
                    let res = await checkService.addLeaveInfo(this.formValidate);
                    if(res.status === 'success'){
                        this.$Message.success('添加成功!');
                    }
                    else this.$Message.error('添加失败!');
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            exportExcel () {
                if (this.tableDatas.length) {
                    this.exportLoading = true
                    const params = {
                        title: ['姓名','部门','出勤天数','迟到次数','请假天数','旷工天数','请假旷工详情'],
                        key: ['name','department','attendance_days','late_times','leave_days','absenteeism_days','detail'],
                        data: this.tableDatas,
                        autoWidth: true,
                        filename: '分类列表'
                        }
                    excel.export_array_to_excel(params)
                    this.exportLoading = false
                } else {
                    this.$Message.info('表格数据不能为空！')
                    }
            },
            //显示详情
            show (index) {
                    this.$Modal.info({
                        title: '详情',
                        content: 
                        `姓名：${this.tableDatas[index].name}<br>
                        部门：${this.tableDatas[index].department}<br>
                        出勤天数：${this.tableDatas[index].attendance_days}<br>
                        迟到次数：${this.tableDatas[index].late_times}<br>
                        请假天数：${this.tableDatas[index].leave_days}<br>
                        旷工天数：${this.tableDatas[index].absenteeism_days}
                        `
                    })
            },
            remove (index) {
                this.tableDatas.splice(index, 1);
            },
            //设置开始时间
            setStartTime(e){
                this.formValidate.leaveStart = e;
            },
            //设置结束时间
            setEndTime(e){
                this.formValidate.LeaveEnd = e;
            },
            //显示数据列表
            async showList(){
                let res = await checkService.findAllCheck();
                console.log(res);
					if (res.data !== null) {
						for (var i = 0; i < res.data.length; i++) {
                            this.tableDatas.push({							
                                name: res.data[i].name,
                                onduty: res.data[i].onduty,
                                dealy: res.data[i].dealy,
                                leave: res.data[i].leave,
                                neglect: res.data[i].neglect,
                                deptno: res.data[i].deptno,                       
                            });
                        }
					}
            },
            //添加请假条（与后台间传输数据有问题，功能尚未实现）
            async addLeaveInfo(){
                console.log(this.formValidate)
                let res = await checkService.addLeaveInfo(this.formValidate);
            }
    },
    mounted() {
        this.showList();
    },
};
</script>