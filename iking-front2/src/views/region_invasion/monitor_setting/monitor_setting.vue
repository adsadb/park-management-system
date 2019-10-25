<template>
    <section>
        <Row>
            <Col span="11">
                <Card>
                    <!-- <img id="image" style="-webkit-user-select: none;cursor: zoom-in;" src="http://192.168.0.106:10800/api/v1/getsnap?Channel=1" width="100%" height="100%"> -->
                    <canvas @mousedown="getMousePosition" id="canvas"  style="border:1px solid #c3c3c3;" width="600" height="340"></canvas>
                </Card>
            </Col>
            <Col span="11" offset="1">
                <Card dis-hover>
                    <p slot="title">预留监控设置</p>
                        <Row>
                            <Button @click="setReg(position)" type="info">检测区域设置</Button>
                            <Button type="success" style="margin-left:10px;margin-right:10px">全部</Button>
                            <Button type="warning" @click="clearLine()">清除</Button>
                        </Row>
                        <br>
                    <!-- <Table border :columns="columns7" :data="data6"></Table> -->
                    <Row>
                        <Col span="8">区域入侵</Col>
                        <Checkbox span="8">Checkbox</Checkbox>
                        <!-- <Col span="8">布防时间段2</Col> -->
                    </Row>
                    <Row>
                        <Col span="8">布防时间段1</Col>
                        <Col span="8">
                            <Checkbox >Checkbox</Checkbox>
                        </Col>
                        <Col span="8">
                            <TimePicker format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 168px"></TimePicker>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">布防时间段2</Col>
                        <Checkbox span="8">Checkbox</Checkbox>
                        <Col span="8">布防时间段2</Col>
                    </Row>
                </Card>
            </Col>
            <!-- <div>
                ceshi
            </div> -->
        </Row>
        <!-- <Row>
            <Card>
                <p slot="title">预留监控区域</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
            </Card>
        </Row> -->
    </section>
</template>
<script>
import axios from 'axios'
import { baseInfo } from '@/config' // 项目变量配置
import {regionService} from '@/api/service'
    export default {
        data(){
            return {
                position: [],
                data_position:{location:''},
                num:0,
            }
        },
        methods:{
            // show (index){
            //     this.$Modal.info({
            //         title: 'User Info',
            //         content: `Item：${this.data6[index].item}<br>Value：${this.data6[index].value}`
            //     })
            // }
            getChannelPicture(){
                axios.get(baseInfo.EasyNVR_url+'/api/v1/getsnap',{
                    params:{
                        Channel: 1,
                    }
                }).then((response)=>{
                    console.log(response)
                })
            },
            // addListener(){
            //     var canvas = document.getElementById("canvas");
            //     canvas.addEventListener("click",function(){
            //         var img = document.getElementById("canvas");
            //         var px=event.clientX;
            //         var py=event.clientY;
            //             console.log(px,py)
            //         var divx1 = img.offsetLeft;
            //         var divy1 = img.offsetTop;
            //         var divx2 = img.offsetLeft + img.offsetWidth;
            //         var divy2 = img.offsetTop + img.offsetHeight;
            //             console.log(divx1,divy1,divx2,divy2)
            //         if( px < divx1 || px > divx2 || py < divy1 || py > divy2){
            //             alert("请在图片内画图")
            //         }else{
            //             console.log(window.num)
            //             this.num++;
            //             window.position.push({
            //                 x:px,
            //                 y:py
            //             });
            //             this.drawImage(val);
            //         }
            //     });
            // },
            showPicture(){
                var canvas = document.getElementById("canvas");
                var imgObj = new Image();
                imgObj.src = baseInfo.EasyNVR_url + "/api/v1/getsnap?Channel=1";
                console.log(imgObj.src)
                //待图片加载完后，将其显示在canvas上
                imgObj.onload = function(){ //onload必须使用
                        var ctx = canvas.getContext('2d');
                        ctx.drawImage(this, 0, 0,600 ,340);
                }
            },
            //重绘画面
            clearLine(){
                this.position = [];
                this.num = 0;
                console.log(this.position)
                console.log(this.num)
                var canvas1 = document.getElementById("canvas");
                var cxt=canvas1.getContext("2d");  
                cxt.beginPath();
                cxt.clearRect(0,0,canvas1.width,canvas1.height); 
                this.showPicture();
            },
            getMousePosition:function(val){
            //     var img = document.getElementById("canvas");
            //     var px=event.clientX;
            //     var py=event.clientY;
            //         console.log(px,py)
            //     var divx1 = img.offsetLeft;
            //     var divy1 = img.offsetTop;
            //     var divx2 = img.offsetLeft + img.offsetWidth;
            //     var divy2 = img.offsetTop + img.offsetHeight;
            //         console.log(divx1,divy1,divx2,divy2)
            //     if( px < divx1 || px > divx2 || py < divy1 || py > divy2){
            //         alert("请在图片内画图")
            //     }else{
            //     }
            console.log(val)
                    this.num++;
                    this.position.push({
                        x:val.offsetX,
                        y:val.offsetY
                    });
                                    console.log(this.position)
                    this.drawImage(this.position);
            },
            drawImage(val){
                var canvas = document.getElementById("canvas");
                    var ctx=canvas.getContext("2d");
                    console.log(val)
                    if(this.num%4 == 1){
                        ctx.moveTo(val[this.num-1].x,val[this.num-1].y);
                    }else
                        if(this.num%4 == 0){
                                console.log('+++++')
                                ctx.lineTo(val[this.num-1].x,val[this.num-1].y)
                                ctx.lineTo(val[this.num-4].x,val[this.num-4].y);
                                ctx.strokeStyle="#DC143C";
                                ctx.stroke();
                            }
                    else{
                            ctx.lineTo(val[this.num-1].x,val[this.num-1].y)
                            ctx.strokeStyle="#DC143C";
                            ctx.stroke();
                    }
                            // for(var i=1;i<val.length;i++){
                        //     console.log(i%4 == 0)
                        //     if(i%4 == 0){
                        //         console.log('+++++')
                        //         ctx.lineTo(val[0].x,val[0].y);
                        //         ctx.strokeStyle="#DC143C";
                        //         ctx.stroke();
                        //         break;
                        //     }
                        //     ctx.lineTo(val[i].x,val[i].y)
                        //     ctx.strokeStyle="#DC143C";
                        //     ctx.stroke();
                        // }
            },
            async setReg(val){
                var data = JSON.stringify(val);
                console.log(data)
                this.data_position.location = data;
                console.log(this.data_position)
                let res = await regionService.setRegion(this.data_position);
                if(res.status === 'success'){
                    this.$Message.success('设置成功!');
                }else this.$Message.error('设置失败!');
            }           
        },
        mounted(){
            this.getChannelPicture();
            this.showPicture();
        }
    }
</script>
