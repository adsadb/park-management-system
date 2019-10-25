<template>
    <div>
        <div>
            <span  style="font-size:20px">监控画面</span>
            <Button type="primary" icon="md-crop" style="float:right">截图</Button>
        </div>
        <div class="ivu-divider ivu-divider-horizontal ivu-divider-default"><!----></div>
        <div id="content">
            <audio id="myAuto" controls="controls" :src=audio v-show="false"></audio>
            <iframe id="aud" allow="autoplay" style="display:none" :src=audio></iframe>
            <Layout>
                <Content>
                    <Row :gutter="10">
                        <div>
                        <i-col span="12">
                            <iframe :src=url[0] height="360px" width="640px" frameborder="no" scrolling="no" framespacing="0" style="border:none;" allowfullscreen allow="autoplay"></iframe>
                        </i-col>
                        </div>
                        <div>
                        <i-col span="12">
                            <iframe :src=url[1] height="360px" width="640px" frameborder="no" scrolling="no" framespacing="0" style="border:none;" allowfullscreen allow="autoplay"></iframe>
                        </i-col>
                        </div>
                    </Row>  
                    <br>
                    <Row :gutter="10">
                        <div>
                        <i-col span="12">
                            <iframe :src=url[2] height="360px" width="640px" frameborder="no" scrolling="no" framespacing="0" style="border:none;" allowfullscreen allow="autoplay"></iframe>
                        </i-col>
                        </div>
                        <div>
                        <i-col span="12">
                            <iframe :src=url[3] height="360px" width="640px" frameborder="no" scrolling="no" framespacing="0" style="border:none;" allowfullscreen allow="autoplay"></iframe>
                        </i-col>
                        </div>
                    </Row>                    
                </Content>
                <Divider type="vertical" :style="{height:'initial'}"/>
                <Sider class="sider" :style="{minWidth: '280px',background: '#f5f7f9'}">
                        <!-- <div style="position:absolute; height:720px; overflow:auto;width:100%">
                            <Card v-for="(item,index) in data" :key="index" dis-hover class="card" width="100%" > 
                                <img class="large-img" width="100%" height="50%" :src=item.Img>
                                <div class="p-box"><Icon type="md-alarm" /><p style="display:inline">时间:{{item.RecordTime}}</p></div>                      
                                <div class="p-box"><Icon type="md-camera"/><p style="display:inline">摄像:{{item.CameraID}}</p></div>
                                <div v-if="item.AlertType==1" class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:明火</p></div> 
                                <div v-if="item.AlertType==2" class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:安全帽</p></div>
                                <div v-if="item.AlertType==3" class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:区域入侵</p></div>
                                <div v-if="item.AlertType==4" class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:摔倒</p></div>  
                            </Card>
                        </div> -->
                        <div style="position:absolute; height:740px;width:100%; overflow:auto">
                            <Card v-for="(item,index) in data" :key="index" dis-hover class="card"> 
                                    <img class="large-img" width="100%" height="50%" :src=item.Img> 
                                <div class="p-box"><Icon type="md-alarm" /><p style="display:inline">时间:{{item.RecordTime}}</p></div>                      
                                <div class="p-box"><Icon type="md-camera"/><p style="display:inline">摄像:{{item.CameraID}}</p></div>
                                <div v-if="item.AlertType==1" class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:明火</p></div> 
                                <div v-if="item.AlertType==2" class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:安全帽</p></div>
                                <div v-if="item.AlertType==3" class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:区域入侵</p></div>
                                <div v-if="item.AlertType==4" class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:摔倒</p></div>    
                            </Card>
                            <Card v-for="(item,index) in compareImage" :key="index" dis-hover class="card"> 
                                <img class="large-img" width="100%" height="50%" :src=item.ZhuaQ>
                                <div class="p-box"><Icon type="md-alarm" /><p style="display:inline">时间:{{item.CaptureTime}}</p></div>                      
                                <div class="p-box"><Icon type="md-camera"/><p style="display:inline">匹配率:{{item.CompareResult}}</p></div>
                                <div class="p-box"><Icon type="md-contact"/><p style="display:inline">人员:陌生人</p></div>    
                            </Card>
                        </div>
                </Sider>
            </Layout>
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
            url: [],
            urlList:[],
            websocket: null,
            message:'',
            audio:'',
            compareImage:[]
        }
    },
    methods:{ 
        //得到对应视频类别的通道号
        async getUrl(eclass){
            var data = [];
            data.eclass = eclass;
            console.log(data)
            let res = await deviceService.selectChannel(data);
            this.urlList = res.data
            console.log(this.urlList[0])
            this.url.push(this.EasyNVR_url + '/play.html?channel='+ this.urlList[0]+'&iframe=yes&aspect=640x360');
            this.urlList = [];
        },
        //初始化WebSocket
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
        //处理WebSocket收到的数据
        setOnmessageMessage(event) {
            // this.data = event.data;
            // console.log(JSON.parse(event.data))
            var array = JSON.parse(event.data);
            if(array.AlertType == 1){//火
                this.data.push(array);
                this.audio = '/xjtu/static/audio/attention_fire.mp3'
            } 
            else if(array.AlertType == 2){//安全帽
                this.data.push(array);
                this.audio = '/xjtu/static/audio/attention_helmet.mp3'
            } 
            else if(array.AlertType == 3){//区域入侵
                this.data.push(array);
                this.audio = '/xjtu/static/audio/attention_region.mp3'
            } 
            else if(array.AlertType == 4){//摔倒
                this.data.push(array);
                this.audio = '/xjtu/static/audio/attention_tumble.mp3'
            } 
            if(array.WBMode == 0){//陌生人
                this.compareImage.push(array)
                this.audio = '/xjtu/static/audio/attention_stranger.mp3'
            }  
            var myAuto = document.getElementById('myAuto');
                myAuto.play();  
                // console.log(this.data)
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
        },
    },
    mounted(){
        if (!!window.WebSocket && window.WebSocket.prototype.send) {
                this.websocket = new WebSocket(this.websocket_url)
                this.initWebSocket()
            }else{
                alert("您的浏览器不支持Websocket通信协议，请使用Chrome或者Firefox浏览器！")
        };
    },
    //渲染页面之前调用的方法（在网页没加载出来之前得到相应视频对应的EasyNVR的通道号）
    created(){
        this.getUrl('行为分析');
        this.getUrl('微光相机');
        this.getUrl('安全帽检测');
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