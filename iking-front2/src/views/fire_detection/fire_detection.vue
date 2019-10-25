<template>
    <div>
        <div>
            <span  style="font-size:20px">监控画面</span>
            <Button type="primary" icon="md-crop" style="float:right">截图</Button>
        </div>
        <div class="ivu-divider ivu-divider-horizontal ivu-divider-default"><!----></div>
        <div>
            <audio id="myAuto" src="/xjtu/static/audio/attention_fire.mp3" controls v-show="false"></audio>
            <Row :gutter="20">
                <Col span="17">
                    <iframe :src=url width="984px" height="553px" frameborder="no" scrolling="no" framespacing="0" allowfullscreen allow="autoplay"></iframe>        
                </Col>
                <Col span="7">
                    <div style="position:absolute; height:553px; overflow:auto;width:100%">
                        <Card v-for="(item,index) in data" :key="index" dis-hover class="card"> 
                                <Row :gutter="5">
                                <img class="large-img" width="100%" height="50%" :src=item.Img> 
                                <div class="p-box"><Icon type="md-alarm" /><p style="display:inline">时间:{{item.RecordTime}}</p></div>                      
                                <div class="p-box"><Icon type="md-camera"/><p style="display:inline">摄像:{{item.CameraID}}</p></div>
                                <div class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:明火</p></div>    
                                </Row>
                            </Card>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
    
</template>
<script>
import {deviceService} from '@/api/service'
import { baseInfo } from '@/config' // 项目变量配置
export default {
    data() {
        return {
            data:[],
            url: '',
            urlList:[],
            websocket: null,
            message:'',
        }
    },
    methods:{
        //获得类型对应的通道号
        async getUrl(eclass){
            var data = [];
            data.eclass = eclass;
            console.log(data)
            let res = await deviceService.selectChannel(data);
            this.urlList = res.data
            console.log(this.urlList[0])
            this.url = this.EasyNVR_url + '/play.html?channel='+ this.urlList[0]+'&iframe=yes&aspect=640x360';
        },
        initWebSocket(){
            //连接错误
            this.websocket.onerror = this.setErrorMessage
        
            // //连接成功
            this.websocket.onopen = this.setOnopenMessage
        
            //收到消息的回调
            this.websocket.onmessage = this.setOnmessageMessage
        
            //连接关闭的回调
            this.websocket.onclose = this.setOncloseMessage
        
            //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            window.onbeforeunload = this.onbeforeunload
        },
        setErrorMessage() {
            this.message = "WebSocket连接发生错误" + '   状态码：' + this.websocket.readyState;
        },
        setOnopenMessage() {
            this.message = "WebSocket连接成功" + '   状态码：' + this.websocket.readyState;
            // alert(this.message)
        },
        setOnmessageMessage(event) {
            // this.data = event.data;
            console.log(JSON.parse(event.data))
            var array = JSON.parse(event.data);
            if(array.AlertType == 4){
                this.data.push(array);
                var myAuto = document.getElementById('myAuto');
		            myAuto.play();
            }     
        },
        setOncloseMessage() {
            this.message = "WebSocket连接关闭" + '   状态码：' + this.websocket.readyState;
        },
        onbeforeunload() {
            this.closeWebSocket();
        },
    
        //websocket发送消息
        send() {
            this.websocket.send(this.text)
            this.text = ''
        },
        closeWebSocket() {
            this.websocket.close()
        }
    },
    mounted(){
        if (!!window.WebSocket && window.WebSocket.prototype.send) {
                this.websocket = new WebSocket(this.websocket_url)
                this.initWebSocket()
            }else{
                alert("您的浏览器不支持Websocket通信协议，请使用Chrome或者Firefox浏览器！")
        };
    },
    created(){
        this.getUrl('明火检测');
    }
}
</script>
<style>
    .card{
        margin-top: 12px;
    }
    .img{
        width: 220px;
        height: 180px;
    }
    .p-box{
        margin-bottom: 8px;
    }
</style>