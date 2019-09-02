<template>
    <section>
        <div>
            <label for="">选择时间</label>
            <input v-model='time' type='text' @click='popupVisible=true' placeholder="选择时间" readonly>
            <mt-popup v-model="popupVisible" position="bottom">
                <mt-picker :slots="slots" @change="onValuesChange" showToolbar  ref="picker"  class="mt-picker">
                    <div class="btns">
                        <mt-button @click="popupVisible=false">取消</mt-button>
                        <mt-button @click="handleConfirm">确认</mt-button>
                    </div>
                </mt-picker>
            </mt-popup>
        </div>
        <div>   
            <label for="">选择省市</label>
            <input v-model='province' type='text' @click='popupVisible1=true' placeholder="省" readonly>
            <mt-popup v-model="popupVisible1" position="bottom">
                <mt-picker :slots="slots1" @change="onValuesChange1"  showToolbar ref="picker1"  class="mt-picker" valueKey='name'>
                    <div class="btns">
                        <mt-button @click="popupVisible1=false">取消</mt-button>
                        <mt-button @click="handleConfirm1">确认</mt-button>
                    </div>
                </mt-picker>
            </mt-popup>
            <input v-model='city' type='text' @click='popupVisible2=true' placeholder="市" readonly>
            <mt-popup v-model="popupVisible2" position="bottom">
                <mt-picker :slots="slots2" showToolbar ref="picker2"  class="mt-picker" valueKey='name'>
                    <div class="btns">
                        <mt-button @click="popupVisible2=false">取消</mt-button>
                        <mt-button @click="handleConfirm2">确认</mt-button>
                    </div>
                </mt-picker>
            </mt-popup>
        </div>
      
    </section>
</template>
<script>
export default {
    data(){
        return {
            slots: [
                {
                    flex: 1,
                    values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                    className: 'slot1',
                    textAlign: 'right'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                    className: 'slot3',
                    textAlign: 'left'
                }
            ], 
            slots1: [
                {
                    flex: 1,
                    values: [{val:"0",name:'浙江省'}, {val:"1",name:'山东省'}],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            slots2: [
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            popupVisible:false,
            popupVisible1:false,
            popupVisible2:false,
            time:'',
            province:'',
            city:'',
        }
    },
    methods:{
        onValuesChange(picker, values) {
            if (values[0] > values[1]) {//选择的开始时间大于结束时间，则手动把结束时间设置成跟开始时间一样
                picker.setSlotValue(1, values[0]);
            }
        },
        onValuesChange1(picker,values){
            if(values[0].val=="0"){
                this.slots2[0].values=[{val:'01',name:'杭州市'},{val:'02',name:'宁波市'},{val:'03',name:'温州市'}]
            }
            else{
                this.slots2[0].values=[{val:'10',name:'临沂市'},{val:'11',name:'test市'}]
            }
        },
        handleConfirm() {
            this.time=this.$refs.picker.getValues()
            this.popupVisible=false
        },
        handleConfirm1() {
            this.province=this.$refs.picker1.getValues()[0].name
            this.popupVisible1=false
        },
        handleConfirm2() {
            this.city=this.$refs.picker2.getValues()[0].name
            this.popupVisible2=false
        },
    }
}
</script>
<style lang='scss' scoped>
label{
    font-size:.2rem;
}
.mint-popup-bottom{
    left:0;
    transform: translate3d(0,0,0);
    right:0;
}
.btns{
    display: flex;
    justify-content: space-around;
    button{
        background-color: transparent;
        border:none;
        outline: none;
    }
}
</style>