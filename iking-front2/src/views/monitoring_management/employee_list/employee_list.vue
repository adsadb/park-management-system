<template>
  <section>
      <el-row>
        <div>
            <Button type="primary" @click="model1=true,type=0,initFormValidate()" style="margin-left:10px">新增员工
            </Button>
            <Button type="primary" @click="model1=true,type=1,showPerson()" style="margin-left:10px">修改
            </Button>
            <Button type="error" @click="deletePerson()" style="margin-left:10px">删除</Button>
            <Input v-model="value" style="width:auto;display:inline-table;margin-left:600px">
                <Select v-model="select" slot="prepend" style="width: 80px">
                    <Option value="day">Day</Option>
                    <Option value="month">Month</Option>
                </Select>
                <Button slot="append" icon="ios-search"></Button>
            </Input>
            <Button icon="md-download" :loading="exportLoading" @click="exportExcel" style="float:right">导出文件</Button>
        </div>

        <Modal v-model="model1" title="请输入员工信息" footer-hide>
            <!-- 自定义表单 -->
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="名字" prop="fusername">
                <Input v-model="formValidate.fusername" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="员工编号" prop="fpersonno">
                <Input v-model="formValidate.fpersonno" placeholder="Enter your number"></Input>
            </FormItem>                      
            <FormItem label="入职时间">
                <Row>
                    <Col span="11">
                        <FormItem prop="farmytime">
                            <!--这个控件想要获得时间需要使用@on-change来赋值,v-model获得不到该数据-->
                            <!--但是这样一来在修改操作的时候，不能通过v-model来让控件显示时间（未解决）-->
                            <DatePicker type="date" placeholder="Select date" @on-change="setTime"></DatePicker>
                        </FormItem>
                    </Col>                    
                </Row>
            </FormItem>
            <FormItem label="性别" prop="fgender">
                <RadioGroup v-model="formValidate.fgender">
                    <Radio label=0>男</Radio>
                    <Radio label=1>女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="照片" prop="fpicture">
                <Upload action="//picture"><!--action对应后台的url，这部分未做完-->
                    <Button icon="ios-cloud-upload-outline">Upload files</Button>
                </Upload>
            </FormItem>
             <FormItem label="职位" prop="fjob">
                <Input v-model="formValidate.fjob" placeholder="Enter your job"></Input>
            </FormItem>
            <FormItem label="联系电话" prop="fphone">
                <Input v-model="formValidate.fphone" placeholder="Enter your phone"></Input>
            </FormItem> 
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        
        </Modal>
        </el-row>
    <br>
    <div>
        <Table border size="small" @on-selection-change="selectTable" :data="tableDatas" :columns="columns"></Table>
    </div>
  </section>
</template>
<script>
//调用axios方法要把src中api/service导入
//路径中的@代表src 在webpack.base.conf.js中声明
import excel from '@/libs/excel'
import {personService} from '@/api/service'
export default {
    name: 'export-excel',
    data() {
        return {
            type:0,
            selection:'',
            select:'',
            value:'',
            exportLoading: false,
            tableDatas: [
                // {
                //     name: 'Tom',
                //     number: '001',
                //     gender: 'male',
                //     picture: '',
                //     post: '人事部门主管',
                //     entry_time: '2019-1-1',
                //     phone_number: '13772176733',
                // }      
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
                    title: "名字",
                    key: "fusername"
                },
                {
                    title: "员工编号",
                    key: "fpersonno"
                },
                {
                    title: "入职时间",
                    key: "farmytime"
                },
                {
                    title: "性别",
                    key: "fgender"
                },
                {
                    title: "照片",
                    key: "fpicture",
                    render: (h, params) => {
                                return h('div', [
                                    h('img', {
                                        style: {
                                            width: "80px",
                                            height:"80px",
                                            verticalAlign: "middle"
                                        },
                                        attrs: {
                                            src: params.row.fpicture
                                        }
                                    })
                                ]); 
                        }
                },
                {
                    title: "职位",
                    key: "fjob"
                },
                
                {
                    title: "联系电话",
                    key: "fphone"
                }            
        ],
        //true弹出模态框，false隐藏
        model1:false,
        //表单数据
        formValidate: {
                        fusername: '',
                        fpersonno: '',
                        fgender: '',
                        fpicture: 'picture',//测试数据，此处未完成
                        fjob: '',
                        farmytime: '',
                        fphone: ''
                    },
        ruleValidate: {
            fusername: [
                { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            ],
            fpersonno: [
                { required: true, message: 'number cannot be empty', trigger: 'blur' }               
            ],
            fgender: [
                { required: true, message: 'Please select gender', trigger: 'change' }
            ],
            fpicture: [
                { required: true, message: 'picture cannot be empty', trigger: 'change' }
            ],
            fjob: [
                { required: true,  message: 'job cannot be empty', trigger: 'change' },
            ],
            farmytime: [
                { required: true,  message: 'Please select the date', trigger: 'change' }
            ],
            fphone: [
                { required: true, message: 'Phone cannot be empty', trigger: 'change' }
            ]
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
        //模态框中按钮的处理方法
        async handleSubmit(name) {
            let res;        
            console.log(this.formValidate)
            if(this.type===0){
                res = await personService.addPerson(this.formValidate);//添加员工
                console.log(this.formValidate)
            }
            else{
                res = await personService.updatePerson(this.formValidate);//修改员工
            }
            if(res.status === 'success'){
                this.$Message.success(this.type===0?'添加成功!':'修改成功!');
                this.tableDatas=[];
                this.showList();//成功后刷新
            }
            else this.$Message.error(this.type===0?'添加失败!':'修改失败!');
        },
        //重置按钮触发事件
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        //初始化form表单数据
        initFormValidate(){
            this.formValidate = {
                            fusername: '',
                            fpersonno: '',
                            fgender: '',
                            fpicture: 'picture',
                            fjob: '',
                            farmytime: '',
                            fphone: ''
                        }
        },
        //将tableDatas中的数据导出为EXCEL
        exportExcel () {
            if (this.tableDatas.length) {
                this.exportLoading = true
                const params = {
                    title: ['姓名','编号','性别','照片','职位','入职时间','联系电话'],
                    key: ['fusername',
                        'fpersonno',
                        'fgender',
                        'fpicture',
                        'fjob',
                        'farmytime',
                        'fphone'],
                    data: this.tableDatas,
                    autoWidth: true,
                    filename: '员工列表'
                    }
                excel.export_array_to_excel(params)
                this.exportLoading = false
            } else {
                this.$Message.info('表格数据不能为空！')
                }
        },
        //将表中选中的几条数据加入selection中
        selectTable(val){
            this.selection = val;
            console.log(this.selection)
        },
        //将参数e的值赋给表格中farmtime
        setTime(e){
                this.formValidate.farmytime = e;
            },
         //显示员工列表
        async showList(){
            let res = await personService.findAllPerson();
             console.log(res);
					if (res.data !== null) {
                        //将axios访问成功返回的数据遍历
						for (var i = 0; i < res.data.length; i++) {
                            this.tableDatas.push({	
                                fid:res.data[i].fid,						
                                fusername: res.data[i].fusername,
                                fgender: res.data[i].fgender,
                                fpicture: res.data[i].fpicture,
                                fjob: res.data[i].fjob,
                                farmytime: res.data[i].farmytime,
                                fphone: res.data[i].fphone,
                                fpersonno: res.data[i].fpersonno                        
                            });
                        }
					}
        },
        //修改MODAL显示选中数据
        showPerson(){
            this.formValidate = this.selection[0];
        },
        // //增加员工
        // async addPerson(){
        //     let res = await personService.addPerson(this.formValidate);
        //     if(res.status === 'success'){
        //         this.$Message.success("添加成功！")
        //     }
        //     else
        //         this.$Message.error("添加失败！")
        // },
        // //修改员工
        // async updatePerson() {
        //     let res = await personService.updatePerson(this.formValidate);
        // },
        //删除员工
        async deletePerson(){
            let select = this.selection;
            console.log(select[0].id)
            for (var i = 0; i < select.length; i++){//循环删除（这一步后台实现最好，reback方便，前台只传参数）
                let res = await personService.deletePerson(select[i].fid);
                console.log(select[i].fid)
                if(res.status === 'success'){
                    this.$Message.success('删除成功!');
                    this.tableDatas=[];
                    this.showList();
                    }
                    else this.$Message.error('删除失败!');
            }
        },
        },
    mounted(){
        this.showList();
    }
};
</script>