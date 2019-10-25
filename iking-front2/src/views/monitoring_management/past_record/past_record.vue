<template>
  <section>
        <el-row>
            <div>时间：
                <DatePicker type="daterange" :options="options2" placement="bottom-start" placeholder="Select date" style="width: 200px;margin-right:20px"></DatePicker>
                <RadioGroup v-model="person">
                    <Radio label="员工">
                        <span>员工</span>
                    </Radio>
                    <Radio label="陌生人">
                        <span>陌生人</span>
                    </Radio>
                </RadioGroup>
                <Button icon="md-download" :loading="exportLoading" @click="exportExcel" style="float:right">导出文件</Button>
            </div>
        </el-row>
    <br>
    <div>
        <Table
        border 
        size="small"
        :data="tableDatas"
        :columns="columns"
        ></Table>
    </div>
  </section>
</template>
<script>
import excel from '@/libs/excel'
export default {
    name: 'export-excel',
    data() {
        return {
            person: '员工',
            exportLoading: false,
            tableDatas: [
                {
                    name: 'Tim',
                    snapshot: '',
                    recognition: '',
                    location: '仓库北门',
                    time: '2019-1-1',
                    user_type: '员工',
                },
                {
                    name: 'Tim',
                    snapshot: '',
                    recognition: '',
                    location: '仓库北门',
                    time: '2019-1-1',
                    user_type: '员工',
                },
                {
                    name: 'Tim',
                    snapshot: '',
                    recognition: '',
                    location: '仓库北门',
                    time: '2019-1-1',
                    user_type: '员工',
                },
                {
                    name: 'Tim',
                    snapshot: '',
                    recognition: '',
                    location: '仓库北门',
                    time: '2019-1-1',
                    user_type: '员工',
                },
                {
                    name: 'Tim',
                    snapshot: '',
                    recognition: '',
                    location: '仓库北门',
                    time: '2019-1-1',
                    user_type: '员工',
                },
                {
                    name: 'Tim',
                    snapshot: '',
                    recognition: '',
                    location: '仓库北门',
                    time: '2019-1-1',
                    user_type: '员工',
                },
                {
                    name: 'Tim',
                    snapshot: '',
                    recognition: '',
                    location: '仓库北门',
                    time: '2019-1-1',
                    user_type: '员工',
                },
                {
                    name: 'Tim',
                    snapshot: '',
                    recognition: '',
                    location: '仓库北门',
                    time: '2019-1-1',
                    user_type: '员工',
                },
                {
                    name: 'Tim',
                    snapshot: '',
                    recognition: '',
                    location: '仓库北门',
                    time: '2019-1-1',
                    user_type: '员工',
                },
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
                    key: "name"
                },
                {
                    title: "抓拍图片",
                    key: "snapshot",
                    render: (h, params) => {
                                return h('div', [
                                    h('img', {
                                        style: {
                                            width: "30px",
                                            verticalAlign: "middle"
                                        },
                                        attrs: {
                                            src: params.row.snapshot
                                        }
                                    })
                                ]); 
                        }
                },
                {
                    title: "识别图片",
                    key: "recognition",
                    render: (h, params) => {
                                return h('div', [
                                    h('img', {
                                        style: {
                                            width: "30px",
                                            verticalAlign: "middle"
                                        },
                                        attrs: {
                                            src: params.row.recognition
                                        }
                                    })
                                ]); 
                        }
                },
                {
                    title: "地点",
                    key: "location"
                },
                {
                    title: "时间",
                    key: "time",
                    sortable: true
                },
                {
                    title: "用户类型",
                    key: "user_type"
                },
                {
                    title: "操作",
                    key: "action",
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
                            name: '',
                            snapshot: '',
                            recognition: '',
                            location: '',
                            time: [],
                            user_type: '',
                        },
            ruleValidate: {
                name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                ],
                city: [
                    { required: true, message: 'Please select the city', trigger: 'change' }
                ],
                gender: [
                    { required: true, message: 'Please select gender', trigger: 'change' }
                ],
                interest: [
                    { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                    { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                ],
                date: [
                    { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                ],
                time: [
                    { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                    { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
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

        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        exportExcel () {
            if (this.tableDatas.length) {
                this.exportLoading = true
                const params = {
                    title: ['姓名','抓拍图片','识别图片','地点','时间','用户类型','操作'],
                    key: ['name','snapshot','recognition','location','time','user_type','action'],
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
         show (index) {
                this.$Modal.info({
                    title: '详情',
                    content: 
                    `姓名：${this.tableDatas[index].name}<br>
                    抓拍图片: ${this.tableDatas[index].snapshot}<br>
                    识别图片：${this.tableDatas[index].recognition}<br>
                    地点：${this.tableDatas[index].location}<br>
                    时间：${this.tableDatas[index].time}<br>
                    用户类型：${this.tableDatas[index].user_type}
                    `
                })
        },

        remove (index) {
            this.tableDatas.splice(index, 1);
        },
    }
}
</script>