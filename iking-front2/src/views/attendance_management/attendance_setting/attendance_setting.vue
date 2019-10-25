<template>
    <section>
        <Row>
            <Col span="10">
                <Card>
                    <p slot="title" style="text-align:center;font-size:18px">考勤设置</p>
                    <div style="font-size:18px">参与考勤人员</div>
                    <CheckboxGroup v-model="selectPerson">
                        <Checkbox v-for="(item,index) in personList" :key="index" :label="item.fid">{{item.fusername}}</Checkbox>
                    </CheckboxGroup>
                    <Divider />
                    <div style="font-size:18px">上下班时间</div>
                    <TimePicker format="HH:mm" @on-change="setTime" type="timerange" placement="bottom-start" placeholder="Select time" style="width: 168px"></TimePicker>
                    <Divider />
                    <div style="font-size:18px">上班周期</div>
                    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                        <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
                    </div>
                    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange,setOption(checkAllGroup)">
                        <Checkbox label=1>周一</Checkbox>
                        <Checkbox label=2>周二</Checkbox>
                        <Checkbox label=3>周三</Checkbox>
                        <Checkbox label=4>周四</Checkbox>
                        <Checkbox label=5>周五</Checkbox>
                        <Checkbox label=6>周六</Checkbox>
                        <Checkbox label=7>周日</Checkbox>
                    </CheckboxGroup>
                    <Divider />
                    <Button @click="submitForm()" type="primary" style="margin:0 auto;display:block">保存考勤设置</Button>
                </Card>
            </Col>
        </Row>
  </section>
</template>

<script>
import {personService} from '@/api/service'
import {checkService} from '@/api/service'
export default {
  data() {
    return {
        itemForm:{
            cycleone:'0',
            cycletwo:'0',
            cyclethree:'0',
            cyclefour:'0',
            cyclefive:'0',
            cyclesix:'0',
            cycleseven:'0'
        },
        selectPerson:[],
        personList: [],
        indeterminate: true,
        checkAll: false,
        checkAllGroup: ['1','2','3','4','5','6','7']
    };
  },
  methods: {
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['1','2','3','4','5','6','7'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 7) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },
            //获得参与考勤的名单
            async selectAllPersonNote(){
                let res = await personService.findAllPerson();
                    console.log(res);
					if (res.data !== null) {
						for (var i = 0; i < res.data.length; i++) {
                            this.personList.push({	
                                fid:res.data[i].fid,						
                                fusername: res.data[i].fusername                                                
                            });
                        }
					}
            },
            //设置表单itemForm中的上下班时间
            setTime(val){
                this.itemForm.cstime = val[0];
                this.itemForm.cxtime = val[1];
                console.log(this.itemForm)
            },
            //设置上下班周期（每星期的星期几上班）
            switchOption(val){
                switch(val){
                    case '1': this.itemForm.cycleone = '1';return;
                    case '2': this.itemForm.cycletwo = '1';return;
                    case '3': this.itemForm.cyclethree = '1';return;
                    case '4': this.itemForm.cyclefour = '1';return;
                    case '5': this.itemForm.cyclefive = '1';return;
                    case '6': this.itemForm.cyclesix = '1';return;
                    case '7': this.itemForm.cycleseven = '1';return;
                }
            },
            setOption(val){
                let n = val.length;
                for(var i=0;i<n;i++){
                    this.switchOption(val[i]);
                    console.log(this.itemForm)
                }
            },
            async submitForm(){
                let select = {addPer:''};
                select.addPer = JSON.stringify(this.selectPerson)
                // for(var i = 0;i < this.selectPerson.length;i++){
                //     select.addPer[i] = JSON.stringify(this.selectPerson[i]);
                // };
                // let data = JSON.stringify(select);
                // console.log(data)
                console.log(select)
                let res1 = await checkService.selectPerson(select);
                // let res2 = await checkService.addCheckSet(this.itemForm);
                if(res1.status === 'success' ){
                        this.$Message.success('添加成功!');
                }
                    else this.$Message.error('添加失败!');
            }
    },
        mounted() {
            this.selectAllPersonNote();
        }
}
</script>

<style lang="less" scoped>
</style>