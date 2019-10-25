<template>
    <div>
        <div>
            <span  style="font-size:20px">监控画面</span>
            <Button type="primary" style="float:right">保存</Button>
        </div>
        <div class="ivu-divider ivu-divider-horizontal ivu-divider-default"><!----></div>
        <!-- <Row>
        <Col span="11"> -->
            <audio id="myAuto" controls="controls" src="/xjtu/static/audio/attention_stranger.mp3" v-show="false"></audio>
            <Card dis-hover>
                <Row :gutter="20">
                    <Col span="17">
                        <iframe id="iframe" :src=url  width="984px" height="553px" frameborder="no" scrolling="no" framespacing="0" allowfullscreen allow="autoplay"></iframe>
                    </Col>
                    <Col span="7">
                        <!-- <img class="large-img" style="float:right" :src=data> -->
                        <Row>
                            <img class="large-img" width="100%" height="50%" :src=compareImage[0].Img>
                            <img class="large-img" width="100%" height="50%" :src=compareImage[0].ZhuaQ>
                            <div class="p-box"><Icon type="md-alarm" /><p style="display:inline">时间:{{compareImage[0].CaptureTime}}</p></div>                      
                            <div class="p-box"><Icon type="md-camera"/><p style="display:inline">匹配率:{{compareImage[0].CompareResult}}</p></div>
                            <div class="p-box"><Icon type="md-locate"/><p style="display:inline">访问次数:{{compareImage[0].VisitCount}}</p></div>
                            <div class="p-box"><Icon type="md-contact"/><p style="display:inline">人员:白名单</p></div>  
                        </Row>
                        <Row>
                            <img class="large-img" width="100%" height="50%" :src=compareImage[1].Img>
                            <img class="large-img" width="100%" height="50%" :src=compareImage[1].ZhuaQ>
                                <div class="p-box"><Icon type="md-alarm" /><p style="display:inline">时间:{{compareImage[1].CaptureTime}}</p></div>                      
                                <div class="p-box"><Icon type="md-camera"/><p style="display:inline">匹配率:{{compareImage[1].CompareResult}}</p></div>
                                <div class="p-box"><Icon type="md-locate"/><p style="display:inline">访问次数:{{compareImage[1].VisitCount}}</p></div>
                                <div class="p-box"><Icon type="md-contact"/><p style="display:inline">人员:白名单</p></div>  
                        </Row>
                    </Col>
                </Row>
                <!-- <div>
                    <Col span="11">
                    <Icon type="md-alarm" /><p style="display:inline">时间:</p>
                    </COL>
                    <Col span="1">
                    <Divider type="vertical"/>
                    </COL>
                    <Col span="11">
                    <Icon type="md-contact" /><p style="display:inline">用户:</p>
                    </COL>
                </div> -->
                <div class="ivu-divider ivu-divider-horizontal ivu-divider-default"><!----></div>
                <div>
                    <img v-for="(item,index) in data" :key="index" class="small-img" :src=item style="padding-right:6px">
                </div>
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
            websocket_url: baseInfo.websocket_url,
            data:[],
            //存放匹配成功的两个数据
            compareImage:[{
                Img:'',
                ZhuaQ:''
            },
            {
                Img:'',
                ZhuaQ:''
            }],
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
        this.getUrl('人脸识别相机');
        this.setIframeHeight(document.getElementById('iframe'));
    },
    methods:{
        //得到类别对应的通道号，取第一个
        async getUrl(eclass){
            
            var data = [];
            data.eclass = eclass;
            console.log(data)
            let res = await deviceService.selectChannel(data);
            this.urlList = res.data
            console.log(this.urlList[0])
            this.url = this.EasyNVR_url + '/play.html?channel='+this.urlList[0]+'&iframe=yes&aspect=640x360';
        },
        //设置Iframe的大小自适应（没效果）
        setIframeHeight(iframe) {
            if (iframe) {
                var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
                if (iframeWin.document.body) {
                    iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
                }
            }
        },
        //初始化websocket
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
            // console.log(JSON.parse(event.data))
            var array = JSON.parse(event.data);
            //当发送的数据是人脸识别相机传递来的陌生人信息
            if(array.WBMode == 0){
                var length = this.data.length;
                console.log(array)
                console.log(length)
                if(length <= 7){ //length <= 图片显示的数目
                    this.data.push(array.ZhuaQ)
                }
                else {
                    console.log(this.data)
                    this.data.reverse();
                    this.data.pop(1);
                    this.data.reverse();
                    this.data.push(array.ZhuaQ);
                    console.log(this.data)
                    var myAuto = document.getElementById('myAuto');
		            myAuto.play();
                }
            }else if(array.WBMode == 2){ //当发送的数据是人脸识别相机传递来的白名单信息
                var length = this.compareImage.length;
                console.log(array)
                //这是用的栈的pop方法，其实还有splice方法可以简单实现
                    this.data.reverse();
                    this.data.pop(1);
                    this.data.reverse();
                    this.data.push(array.ZhuaQ);
                    this.compareImage.reverse();
                    this.compareImage.pop(1);
                    this.compareImage.push(array);
                    console.log(this.compareImage)
                    console.log(this.compareImage.length)
                // if(length <= 1){
                //     this.compareImage.push(array);
                // }
                // else {
                //     this.data.reverse();
                //     this.data.pop(1);
                //     this.compareImage.push(array);
                //     console.log(this.compareImage)
                //     console.log(this.compareImage[0].ZhuaQ)
                // }
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

