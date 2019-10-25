<template>
  <section>
      <el-row>
        <Button type="primary" @click="model1=true,type=0,initFormValidate()">添加设备</Button>
        <Modal v-model="model1" title="请输入新设备属性" footer-hide>
            <!-- 自定义表单 -->
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="单位" prop="eunit">
                    <Input v-model="formValidate.eunit" placeholder="Enter your eunit"></Input>
                </FormItem>
                <FormItem label="型号" prop="etype">
                    <Input v-model="formValidate.etype" placeholder="Enter your etype"></Input>
                </FormItem>
<!-- 设备选项未知-->
                <FormItem label="设备类型" prop="eclass">
                    <Select v-model="formValidate.eclass" placeholder="Select your eclass">
                        <Option value="人脸识别相机">人脸识别相机</Option>
                        <Option value="微光相机">微光相机</Option>
                        <Option value="行为分析">行为分析</Option>
                        <Option value="安全帽检测">安全帽检测</Option>
                        <Option value="明火检测">明火检测</Option>
                    </Select>
                </FormItem>
                <FormItem label="用户名" prop="eusername">
                    <Input v-model="formValidate.eusername" placeholder="Enter your eusername"></Input>
                </FormItem>
                <FormItem label="IP" prop="eip">
                    <Input v-model="formValidate.eip" placeholder="Enter your eip"></Input>
                </FormItem>
                <FormItem label="端口号" prop="eport">
                    <Input v-model="formValidate.eport" placeholder="Enter your eport"></Input>
                </FormItem>
                <FormItem label="名称" prop="ename">
                    <Input v-model="formValidate.ename" placeholder="Enter your ename"></Input>
                </FormItem>     
                <FormItem label="RTMP" prop="ertmp">
                    <Input v-model="formValidate.ertmp" placeholder="Enter your ertmp"></Input>
                </FormItem>
                <FormItem label="RTSP" prop="ertsp">
                    <Input v-model="formValidate.ertsp" placeholder="Enter your ertmp"></Input>
                </FormItem>


                <FormItem label="密码" prop="epassword">
                    <Input v-model="formValidate.epassword" placeholder="Enter your epassword"></Input>
                </FormItem>
                <FormItem label="状态" prop="estate">
                    <Select v-model="formValidate.estate" placeholder="Select your estate">
                        <Option value="available">可用</Option>
                        <Option value="disable">禁用</Option>
                    </Select>
                </FormItem>
                <FormItem label="通信号" prop="eway">
                    <Input v-model="formValidate.eway" placeholder="Enter your eway"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left:8px">重置</Button>
                </FormItem>
            </Form>
        
        </Modal>
        <Button type="success" @click="model1=true,type=1,showDevice()" style="margin-left:10px;margin-right:10px;">修改设备</Button>
        <Button type="error" @click="deleteDevice()">删除设备</Button>
        <br>
        </el-row>
    <br>
    <Table border size="small" @on-selection-change="selectTable" :data="tableDatas" :columns="columns" ></Table>
  </section>
</template>
<script>
    import {deviceService} from '@/api/service'
    import axios from 'axios'
    import { baseInfo } from '@/config' // 项目变量配置
export default {
    data() {
        return {
            type:0,
            row:'',
            status:'',
            selection:'',
            tableDatas: [
                // {
                //     name: '大门',
                //     device_type: '营门',
                //     style: '监控',
                //     ip: '112.37.3.27',
                //     port:'8000',
                //     model_num:'HK',
                //     create_time:'2019.1.1',
                //     status:'使用中'
                // }                              
            ],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
					key:"id"
                },
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: "名称",
                    key: "ename",
                    sortable: true
                },
                {
                    title: "类别",
                    key: "etype",
                    sortable: true
                },
                {
                    title: "IP",
                    key: "eip",
                    sortable: true
                },
                {
                    title: "设备类型",
                    key: "eclass",
                    sortable: true
                },
                {
                    title: "rtsp",
                    key: "ertsp",
                    sortable: true
                },
                {
                    title: "rtmp",
                    key: "ertmp",
                    sortable: true
                },
                {
                    title: "通道号",
                    key: "eway",
                    sortable: true
                },
                {
                    title: "创建时间",
                    key: "ecreate",
                    sortable: true
                },
                {
                    title: "状态",
                    key: "estate",
                    sortable: true
                }
            ],
            //ture弹出模态框，false模态框隐藏
            model1:false,

            formValidate: {
                            eunit: '',
                            etype: '',
                            eclass: [],
                            eusername: '',
                            eip:'',
                            eport:'',
                            ertsp:'',
                            ename:'',
                            ertmp:'',
                            epassword:'',
                            estate: [],
                            eway: ''
                        },
                        //表单数据的约束条件，required是否必须
                        ruleValidate: {
                            eunit: [
                                { required: true, message: 'Please enter the eunit', trigger: 'blur' }
                            ],
                            ename: [
                                { required: true, message: 'Please enter the ename', trigger: 'blur' }
                            ],
                            etype: [
                                { required: true, message: 'Please select the etype', trigger: 'blur' }                            
                            ],
                            eclass: [
                                { required: true, message: 'Please enter the eclass', trigger: 'blur' }
                            ],
                            eway: [
                                { required: true, message: 'Please enter the eway', trigger: 'blur' }
                            ],
                            eip: [
                                { required: true, message: 'Please enter the eip', trigger: 'blur' }
                            ],
                            eport: [
                                { required: true, message: 'Please enter the eport', trigger: 'blur' }
                            ],
                            estate: [
                                { required: true, message: 'Please select the estate', trigger: 'blur' }
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
        handleReset (name) {
                this.$refs[name].resetFields();
            },           
        //表格中选中的数据赋值
        selectTable(val){
            this.selection = val;
            console.log(this.selection)
        },
        //初始化表单数据
        initFormValidate(){
            this.formValidate = {
                            eunit: '',
                            etype: '',
                            eclass: [],
                            eusername: '',
                            eip:'',
                            eport:'',
                            ertsp:'',
                            ename:'',
                            ertmp:'',
                            epassword:'',
                            estate: [],
                            eway: ''
                        }
        },
        //修改数据中的显示数据
        showDevice(){
            this.formValidate = this.selection[0];
        },
        //提交表单（添加/修改）
        async handleSubmit (name) {   
            let res;        
            console.log(this.formValidate)
            if(this.type===0){
                res = await deviceService.addDevice(this.formValidate);//添加设备
                console.log(this.type)
            }
            else{
                res = await deviceService.updateDevice(this.formValidate);//修改设备
            }
            if(res.status === 'success'){
                this.$Message.success(this.type===0?'添加成功!':'修改成功!');
                this.tableDatas=[];
                this.showList();
                this.configrtmp(this.formValidate)
                this.model1 = false;
            }
            else this.$Message.error(this.type===0?'添加失败!':'修改失败!');
        },
        //显示设备列表
        async showList(){
            let res = await deviceService.findAllDevice();
             console.log(res.data);
					if (res.data !== null) {
						// for (var i = 0; i < res.data.length; i++) {
                        //     this.tableDatas.push({	
                        //         ename: res.data[i].ename,
                        //         etype: res.data[i].etype,
                        //         eclass: res.data[i].eclass,
                        //         eip: res.data[i].eip,
                        //         eport: res.data[i].eport,
                        //         ertsp: res.data[i].ertsp,
                        //         ecreate: res.data[i].ecreate,
                        //         estate: res.data[i].estate,
                        //         eunit: res.data[i].eunit,
                        //         ertmp: res.data[i].ertmp,
                        //         //未显示的数据项（修改时显示）
                        //         eid: res.data[i].eid,						
                        //         eusername: res.data[i].eusername,
                        //         epassword: res.data[i].epassword,
                        //         eway: res.data[i].eway
                        //     });
                        // }
                        for (var i = 0; i < res.data.length; i++) {
                            var _status = '';
                            for(var j = 0;j < this.status.length;j++){
                                if(res.data[i].eway == this.status[j].Channel)
                                    _status = this.status[j].Online==0?'离线':'在线'  
                            }        
                            this.tableDatas.push({	
                                ename: res.data[i].ename,
                                etype: res.data[i].etype,
                                eclass: res.data[i].eclass,
                                eip: res.data[i].eip,
                                eport: res.data[i].eport,
                                ertsp: res.data[i].ertsp,
                                ecreate: res.data[i].ecreate,
                                estate: _status,
                                eunit: res.data[i].eunit,
                                ertmp: res.data[i].ertmp,
                                //未显示的数据项（修改时显示）
                                eid: res.data[i].eid,						
                                eusername: res.data[i].eusername,
                                epassword: res.data[i].epassword,
                                eway: res.data[i].eway
                            });
                        }
					}
        },
        //删除选中的设备
        async deleteDevice(){
            let res
            let select = this.selection;
            for (var i = 0; i < select.length; i++){
                console.log(select[i].eid)
                res = await deviceService.deleteDevice(select[i].eid);
            }
            if(res.status === 'success'){
                this.$Message.success('删除成功!');
                this.tableDatas=[];
                this.showList();
            }
            else this.$Message.error('删除失败!');
        },
        //调用axios将设备rtmp地址配置在EasyNVR中
        configrtmp(val){
            console.log(val)
            axios.get(this.EasyNVR_url + '/api/v1/setchannelconfig',{
                params:{
                    Channel: val.eway,
                    Enable: 1,
                    OnDemand: 1,
                    Name: val.eunit,
                    Protocol: 'rtsp',
                    Rtsp: val.ertsp,
                    Audio: '0',
                    Record: '0',
                    Transport: 'TCP'
                }
            }).then((response)=>{
                console.log(response)
            })
        },     
        // test(){
        //     axios.get(this.EasyNVR_url + '/api/v1/getchannels').then((response)=>{
        //         console.log(response.data.EasyDarwin.Body.Channels)
        //         this.status = response.data.EasyDarwin.Body.Channels;
        //         for (var i = 0; i < res.data.length; i++) {
        //             var _status = '';
        //             for(var j = 0;j < this.status.length;j++){
        //                 if(res.data[i].eway == this.status[j].Channel)
        //                     _status = this.status[j].Online==0?'离线':'在线'  
        //             }        
        //             this.tableDatas.push({	
        //                 ename: res.data[i].ename,
        //                 etype: res.data[i].etype,
        //                 eclass: res.data[i].eclass,
        //                 eip: res.data[i].eip,
        //                 eport: res.data[i].eport,
        //                 ertsp: res.data[i].ertsp,
        //                 ecreate: res.data[i].ecreate,
        //                 estate: _status,
        //                 eunit: res.data[i].eunit,
        //                 ertmp: res.data[i].ertmp,
        //                 //未显示的数据项（修改时显示）
        //                 eid: res.data[i].eid,						
        //                 eusername: res.data[i].eusername,
        //                 epassword: res.data[i].epassword,
        //                 eway: res.data[i].eway
        //             });
        //         }
        //     })
        // },

        //调用easynvr的接口获得当前所有通道号的状态
        getCannelStatus(){
            axios.get(this.EasyNVR_url + '/api/v1/getchannels').then((response)=>{
                console.log(response.data.EasyDarwin.Body.Channels)
                this.status = response.data.EasyDarwin.Body.Channels;
            })
        },
    },
    mounted(){
        this.showList();
        this.getCannelStatus();
        // this.test();
        // this.getConfigJson();
    }
    
};
</script>