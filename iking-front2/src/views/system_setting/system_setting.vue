<template>
    <Row>
        <Col span="11">
            <Card>
                <p slot="title" style="text-align:center">系统设置</p>
                <Table :show-header="false" :columns="columns" :data="data"></Table>
            </Card>
            <Modal v-model="model1" title="修改手机号" footer-hide>
                <Form :model="formItem1" :label-width="80">
                    <FormItem label="手机号">
    <!--未做-->          <Input v-model="formItem1.telphone" placeholder="请输入完整的原手机号"></Input>
                    </FormItem>
                    <FormItem label="新手机号">
                        <Input v-model="formItem1.newTelphone" placeholder="请输入手机号"></Input>
                    </FormItem>
                    <FormItem label="验证码">
                        <Row>
                            <Col span="18">
                                <Input placeholder="请输入验证码" ></Input>
                            </Col>
                            <Col spam="6">
                                <Button type="primary" @click="sendMsg()" :disabled="time !== '发送验证码'" style="margin-left: 7px;" >{{ time !== '发送验证码' ? time+'s' : time }}</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                    <Button type="primary" @click="handleTelAction(formItem1)">修&nbsp改</Button>
                    </FormItem>
                </Form>
            </Modal>
            <Modal v-model="model2" title="修改密码"  footer-hide>
                <Form :model="formItem2" :label-width="80">
                    <FormItem label="手机号">
                        <Input v-model="formItem2.telphone" placeholder="请输入手机号"></Input>
                    </FormItem>
                    <FormItem label="密码">
                        <Input v-model="formItem2.newPassword" placeholder="请输入密码"></Input>
                    </FormItem>
                    <FormItem label="确认密码">
    <!--未做-->         <Input  placeholder="请再次输入密码"></Input>
                    </FormItem>
                    <FormItem label="验证码">
                        <Row>
                            <Col span="18">
                                <Input  placeholder="请输入验证码" ></Input>
                            </Col>
                            <Col spam="6">
                                <Button type="primary" @click="sendMsg()" :disabled="time !== '发送验证码'" style="margin-left: 7px;" >{{ time !== '发送验证码' ? time+'s' : time }}</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                    <Button type="primary" @click="handlePasAction(formItem2)">修&nbsp改</Button>
                    </FormItem>
                </Form>
            </Modal>
        </Col>
    </Row>
</template>
<script>
//使用cookies要导入相应的组件，框架封装好的
import Cookies from 'js-cookie' 
import { setInterval, clearInterval } from 'timers'
import {userService} from '@/api/service'
    export default {
        data () {
            return {
                model1:false,
                model2:false,
                formItem1:{},
                formItem2:{},
                time: '发送验证码',
                columns: [
                    {
                        title: 'Item',
                        key: 'item',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.item)
                            ]);
                        }
                    },
                    {
                        title: 'Value',
                        key: 'value'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
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
                                }, '修改')
                            ]);
                        }
                    }
                ],
                data: [
                    {
                        item: '手机号',
                        value: '',
                    },
                    {
                        item: '密码',
                        value: '',
                    },
                ]
            }
        },
        methods: {
            show (index) {
                if(index === 0){
                    this.model1 = true;
                }else this.model2 = true;
            },
            remove (index) {
                this.data.splice(index, 1);
            },
            //现在使用的是cookies
            setParameter(){
                this.data[0].value = Cookies.get('username');//获得登录时设置的cookies
                this.data[1].value = Cookies.get('password');
            },
            sendMsg(){
                this.time = 60;
                let timeInter = setInterval(()=>{
                    this.time--
                    if(this.time === 0){
                        this.time = '发送验证码';
                        clearInterval(timeInter)
                    }
                }, 1000);

            },
            //修改电话
            async handleTelAction(val){
                let res = await userService.updateUserTEL(val);
                if(res.status === 'success'){
                    this.$Message.success('修改成功!');
                    Cookies.set('username',userName);
                    this.setParameter();
                }else this.$Message.error('修改失败!');
            },
            //修改密码
            async handlePasAction(val){
                console.log(this.formItem2)
                let res = await userService.updateUserPs(val);
                console.log(res)
                if(res.status === 'success'){
                    this.$Message.success('修改成功!');
                    Cookies.set('password',password);
                    this.setParameter();
                }else this.$Message.error('修改失败!');
            }
        },
        mounted(){
            this.setParameter()
        }

    }
</script>