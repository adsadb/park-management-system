
<template>
    <div style="padding: 20px;
                margin:0 auto;
                text-align: center;
                border: 60px;
                width: 600px;
                height: max-content;">
        <Card :bordered="false">
            <p slot="title">注册</p>

            <!-- <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p> -->
            <Form :model="formItem" :label-width="80">
                <FormItem label="手机号">
                    <Input v-model="formItem.telphone" placeholder="请输入手机号"></Input>
                </FormItem>
                <FormItem label="密码">
                    <Input v-model="formItem.upassword" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="确认密码">
            <!--未做-->        <Input  placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="验证码">
                    <Row>
                        <Col span="18">
                            <Input v-model="formItem.otpCode" placeholder="请输入验证码" ></Input>
                        </Col>
                        <Col spam="6">
                            <Button type="primary" @click="sendMsg()" :disabled="time !== '发送验证码'" style="margin-left: 7px;" >{{ time !== '发送验证码' ? time+'s' : time }}</Button>
                        </Col>
                    </Row>
                </FormItem>

                
                <Button type="primary" @click="submit(formItem)">确定</Button>
            </Form>
        </Card>
    </div>  
</template>
<script>
import {userService} from '@/api/service'
import { setInterval, clearInterval } from 'timers';
    export default {
        data () {
            return {
                formItem: {
                    phone: '',
                    password:'',
                    repassword:'',
                    verify:'',
                },
                 time: '发送验证码'
            }
        },
        methods: {
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
            gohome(){
                this.$router.replace('/home')
            },
            submit(val){
                let res = userService.addUser(val);
                if(res.status === 'success'){
                    this.$Message.success('添加成功!');
                    this.$router.replace('/login')
                }
                else
                this.$Message.error('添加失败!');
            }
        }
    }
</script>


