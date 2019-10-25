<template>
    <div>
        <div>
            <span  style="font-size:20px">监控画面</span>
            <Button type="primary" style="float:right">保存</Button>
        </div>
        <div class="ivu-divider ivu-divider-horizontal ivu-divider-default"><!----></div>
        <!-- <Row>
        <Col span="11"> -->
            <!-- <audio controls v-show="false">
                <source id="myAuto" src="" type="audio/mp3">
            </audio> -->
            <Card dis-hover>
                <Row :gutter="20">
                    <Col span="17">
                        <iframe id="iframe" :src=url  width="984px" height="553px" frameborder="no" scrolling="no" framespacing="0" allowfullscreen allow="autoplay"></iframe>
                    </Col>
                    <Col span="7">
                        <div style="position:absolute; height:553px; overflow:auto;width:100%">
                            <Card v-for="(item,index) in data" :key="index" dis-hover class="card"> 
                                <img class="large-img" width="100%" height="50%" :src=item.Img>
                                <div class="p-box"><Icon type="md-alarm" /><p style="display:inline">时间:{{item.RecordTime}}</p></div>                      
                                <div class="p-box"><Icon type="md-camera"/><p style="display:inline">摄像:{{item.CameraID}}</p></div>
                                <div class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:摔倒</p></div>   
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Card>
        <!-- </Col>
    </Row> -->
    </div>
</template>
<script>
import {deviceService} from '@/api/service'
import { baseInfo } from '@/config' // 项目变量配置
export default {
    data(){
        return{
            websocket: null,
            data:[],
            compareImage:[],
            message:'',
            url: '',
            urlList:[]
        }
    },
    mounted() {
        // if('socket' in window){
        //     this.socket = new WebSocket(this.url)
        //     this.initWebSocket()
        // }else{
        //     alert('当前浏览器不支持WebSocket！')
        // }
            if (!!window.WebSocket && window.WebSocket.prototype.send) {
                this.websocket = new WebSocket(this.websocket_url)
                this.initWebSocket()
            }else{
                alert("您的浏览器不支持Websocket通信协议，请使用Chrome或者Firefox浏览器！")
        };
    },
    created(){
        this.getUrl('行为分析');
        this.setIframeHeight(document.getElementById('iframe'));
    },
    methods:{
        //得到类型对应的easynvr通道号
        async getUrl(eclass){
            
            var data = [];
            data.eclass = eclass;
            console.log(data)
            let res = await deviceService.selectChannel(data);
            this.urlList = res.data
            console.log(this.urlList[0])
            this.url = this.EasyNVR_url + '/play.html?channel='+this.urlList[0]+'&iframe=yes&aspect=640x360';
        },
        setIframeHeight(iframe) {
            if (iframe) {
                var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
                if (iframeWin.document.body) {
                    iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
                }
            }
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
            if(array.WBMode == 0){
                var length = this.data.length;
                console.log(length)
                if(length <= 3){
                    this.data.push(array.ZhuaQ)
                }
                else {
                    console.log(this.data)
                    this.data.reverse();
                    this.data.pop(1);
                    this.data.reverse();
                    this.data.push(array.ZhuaQ);
                    console.log(this.data)
                    // var myAuto = document.getElementById('myaudio');
		            // myAuto.play();
                }
            }else{
                this.compareImage.Img = array.Img;
                this.compareImage.ZhuaQ = array.ZhuaQ;
            };     
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
    }
}
</script>
<style>
    .video{
        height: 320px;
        width: 360px;
    }
    .card{
        padding: 0px;
    }
    .small-img{
        width: 125px;
        height: 125px;
    }
    .large-img{
        width: 168px;
        height: 160px;
    }
</style>

