<template>
    <div>
        <div>
            <span  style="font-size:20px">监控画面</span>
            <Button type="primary" icon="md-crop" style="float:right">截图</Button>
        </div>
        <div class="ivu-divider ivu-divider-horizontal ivu-divider-default"><!----></div>
        <div>
            <Layout>
                <Content>
                    <iframe src="http://192.168.1.100:10800/play.html?channel=1&iframe=yes&aspect=640x480" width="100%" height="100%" style="border:none;" allowfullscreen allow="autoplay"></iframe>        
                </Content>
                <Divider type="vertical" :style="{height:'initial'}"/>
                <Sider class="sider" :style="{minWidth: '280px',background: '#f5f7f9'}">
                    <Card dis-hover class="card"> 
                        <div class="p-box"><Icon type="md-alarm" /><p style="display:inline">时间:</p></div>                      
                        <div class="p-box"><Icon type="md-camera"/><p style="display:inline">摄像:</p></div>
                        <div class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:</p></div>
                        <div class="p-box"><Icon type="md-contact"/><p style="display:inline">人员:</p></div>   
                    </Card>
                    <Divider type="horizontal"/>
                    <Card dis-hover class="card"> 
                        <div class="p-box"><Icon type="md-alarm" /><p style="display:inline">时间:</p></div>                      
                        <div class="p-box"><Icon type="md-camera"/><p style="display:inline">摄像:</p></div>
                        <div class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:</p></div>
                        <div class="p-box"><Icon type="md-contact"/><p style="display:inline">人员:</p></div>   
                    </Card>
                    <Divider type="horizontal"/>
                    <Card dis-hover class="card"> 
                        <div class="p-box"><Icon type="md-alarm" /><p style="display:inline">时间:</p></div>                      
                        <div class="p-box"><Icon type="md-camera"/><p style="display:inline">摄像:</p></div>
                        <div class="p-box"><Icon type="md-locate"/><p style="display:inline">事件:</p></div>
                        <div class="p-box"><Icon type="md-contact"/><p style="display:inline">人员:</p></div>   
                    </Card>
                </Sider>
            </Layout>
        </div>
    </div>
    
</template>
<script>
export default {
    
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