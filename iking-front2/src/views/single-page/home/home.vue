<template>
  <div>
    <Row :gutter="20">
      <router-link :to=infor.href v-for="(infor, i) in inforCardData" :key="`infor-${i}`">
      <i-col span="6"  style="height: 120px;padding-bottom: 10px;padding-right:10px">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
      </router-link>
    </Row>
    <Row :gutter="16">
      <Col span="8">
        <p style="font-size:18px">人员记录</p>
        <div style="position:absolute; height:685px;width:80%; overflow:auto">
          <Card v-for="(item,index) in person_data" :key="index" dis-hover class="card"> 
            <Row :gutter="5">
            <Col span="13">
              <div>
                <img style="text-align:center" :src="item.ZhuaQ" weight="102px" height="90px">
              </div>
            </Col>
            <Col span="11">
              <div class="p-box"><Icon type="md-alarm" /><p style="display:inline">时间:{{item.CaptureTime}}</p></div>                      
              <div class="p-box"><Icon type="md-camera"/><p style="display:inline">匹配率:{{item.CompareResult}}</p></div> 
              <div v-if="item.WBMode==0" class="p-box"><Icon type="md-locate"/><p style="display:inline">人员:陌生人</p></div>  
              <div v-if="item.WBMode==2" class="p-box"><Icon type="md-locate"/><p style="display:inline">人员:员工</p></div>
            </Col>
            </Row>
          </Card>
        </div>
      </Col> 
     <Col span="8">
        <p style="font-size:18px">安全帽及明火检测异常记录</p>
        <div style="position:absolute; height:685px;width:80%; overflow:auto">
          <Card v-for="(item,index) in helmet_data" :key="index" dis-hover class="card"> 
            <Row :gutter="5">
            <Col span="13">
              <div>
                <img style="text-align:center" :src="item.Img" weight="102px" height="90px">
              </div>
            </Col>
            <Col span="11"> 
              <div class="p-box"><Icon type="md-alarm" /><p style="display:inline">时间:{{item.RecordTime}}</p></div>                      
              <div class="p-box"><Icon type="md-camera"/><p style="display:inline">摄像:{{item.CameraID}}</p></div>
              <!--后台websocket只有一个，所有数据通过一个传输，需要对类别做判断，显示对应的信息-->
              <div v-if="item.AlertType==1" class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:明火</p></div> 
              <div v-if="item.AlertType==2" class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:安全帽</p></div>    
            </Col>
            </Row>
          </Card>
        </div>
      </Col>
    <Col span="8">
      <p style="font-size:18px">行为异常报警记录</p>
      <div style="position:absolute; height:685px;width:80%; overflow:auto">
          <Card v-for="(item,index) in alarm_data" :key="index" dis-hover class="card"> 
            <Row :gutter="5">
            <Col span="13">
              <div>
                <img style="text-align:center" :src="item.Img" weight="102px" height="90px">
              </div>
            </Col>
            <Col span="11"> 
              <div class="p-box"><Icon type="md-alarm" /><p style="display:inline">时间:{{item.RecordTime}}</p></div>                      
              <div class="p-box"><Icon type="md-camera"/><p style="display:inline">摄像:{{item.CameraID}}</p></div>
              <div v-if="item.AlertType==3" class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:区域入侵</p></div>
              <div v-if="item.AlertType==4" class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:摔倒</p></div>      
            </Col>
            </Row>
          </Card>
      </div>
      </Col>
    </Row>
    <br>
    <!-- <Row>
    <Table border size="small" :data="tableDatas" :columns="columns"></Table>
    </Row> -->
  </div>
</template>

<script>
import {deviceService} from '@/api/service'
import { baseInfo } from '@/config' // 项目变量配置
import InforCard from '@/components/info-card'
import CountTo from '@/components/count-to'
import { ChartPie, ChartBar } from '@/components/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
            websocket: null,
            message:'',
            //首页显示框的数据来源，href是点击跳转页面路径（对应router中写下的路径名）
      inforCardData: [
        { title: '今日来访数量', icon: 'md-person-add', count: 0, color: '#2d8cf0',href:'/monitoring_management/past_record' },
        { title: '今日报警数量', icon: 'md-alert', count: 0, color: '#ed3f14',href:'/person_detection/person_detection_record'},
        { title: '设备使用数量', icon: 'md-camera', count: 4, color: '#ff9900',href:'/device_management/device_list'},        
        { title: '今日异常考勤', icon: 'md-map', count: 14, color: '#9A66E4',href:'/attendance_management/attendance_record'}
      ],
      tableDatas: [],
        columns: [
            {
                title: "发生时间",
                key: "RecordTime"
            },
            {
                title: "发生地点",
                key: "CameraID"
            },
            {
                title: "人物",
                key: "fpicture"
            },
            {
                title: "事件",
                key: "AlertType"
            },
            {
                title: "状态",
                key: "state"
            }           
        ],
        //人员记录
        person_data:[],
        //安全帽及明火报警记录
        helmet_data:[],
        //摔倒及区域入侵报警记录
        alarm_data:[],
    }
  },
  mounted() {
    //检测浏览器是否支持websocket
            if (!!window.WebSocket && window.WebSocket.prototype.send) {
                this.websocket = new WebSocket(this.websocket_url)
                this.initWebSocket()
            }else{
                alert("您的浏览器不支持Websocket通信协议，请使用Chrome或者Firefox浏览器！")
        };
    },
  methods:{
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
        //对接受到的websocket中的数据做相应的处理
        setOnmessageMessage(event) {
            // this.data = event.data;
            console.log(JSON.parse(event.data))
            var array = JSON.parse(event.data);
            //安全帽及明火检测报警数据
            if(array.AlertType == 2 || array.AlertType == 1){
              var length = this.helmet_data.length;
                console.log(length)
                    this.helmet_data.push(array)
              this.tableDatas.push(array)
              this.inforCardData[1].count++;
            }
            //行为异常报警数据
            if(array.AlertType == 3 || array.AlertType ==4){
              var length = this.alarm_data.length;
                console.log(length)
                console.log(this.alarm_data)
                this.alarm_data.push(array)
              this.tableDatas.push(array)
              this.inforCardData[1].count++;//首页的icard标签中报警记录+1（这部分应该实时从数据库获得，演示做的数据）
            }   
            //人脸识别数据（只处理了黑白名单）
            if(array.WBMode ===0 || array.WBMode ===2){
              this.person_data.push(array)
              this.inforCardData[0].count++;//首页的icard标签中来访数量+1（这部分应该实时从数据库获得，演示做的数据）
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
    }
}
</script>

<style lang="less">
  .count-style{
    font-size: 50px;
  }
  .p-box{
          margin-bottom: 8px;
      }
</style>
