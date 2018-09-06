<template>
  <div class="video">
    <header>
      <img src="../../static/images/验票直播平台 2.png" alt="" class="title">
      <img src="../../static/images/tc.png" alt="" class="out" @click="outPage()">
    </header>

    <!-- 左边直播 -->
    <div class="video_box">
      <div class="box">
        <img src="../../static/images/zb.png" alt="" class="live" v-show="zbIcon">
        <p><span class="address">所在: 北京【频道】</span><img src="../../static/images/举报 copy@3x.png" alt="" class="report" @click="report()"></p>
        <div class="video_small_box">
          <div ref="mybox" class="prism-player created_video" id="J_prismPlayer"></div>
        </div>
        <div class="tips_content">
          注意<br> 每张彩票仅可申请一次视频验票，在申请邮寄纸质票后，该彩票将无法申请视频验票；
        </div>
      </div>
    </div>

    <!-- 右边等待队列 -->
    <div class="play_right">
      <div style="margin-bottom: 20px;">
        <div class="verification">
          <p>
            <span class="this">
            我的彩票:</span><span class="this_address">种类:{{firstList.sort}}</span>
          </p>
          <p class="type">
            票号: {{firstList.code}}
            <span class="price">面值: {{firstList.money}}元</span>
          </p>
        </div>
      </div>
      <div class="wait_list">
        <p class="list_title">验票进度</p>
        <img :src="imgUrl" alt="" class="list2" v-if="imgUrl!=''">
        <ul class="list" v-if="imgUrl==''">
          <li v-for="(item,index) in queueList">
            <span class="list_index" style="width: 3%">{{index+1}}</span>
            <span class="list_type" style="width: 12%">{{item.sort}}</span>
            <span class="list_price" style="width: 10%">{{item.money}}元</span>
            <span class="list_num">{{item.code}}</span>
            <span class="list_status" style="color: #FF9903" v-if="index==0">进行中</span>
            <span class="list_status" v-if="item.flag!=0&&index!=0">待验票</span>
            <span class="list_status" style="color: #FF0202" v-if="item.flag==0&&index!=0">待验票</span>
          </li>
        </ul>
        <p class="wait_num" v-if="queueList.length>0">您前方还有 <span class="number">{{queueList.length-1}}</span> 人等待验票</p>
        <p class="wait_num" v-else></p>
        <p class="list_title2" @click="vCancle()">取消验票</p>
      </div>
    </div>

    <!-- 举报弹窗 -->
    <div class="model" v-show="model">
      <div class="bg"></div>
      <div class="model_box">
        <p class="wherefore">举报原因:</p>
        <p class="other">其他(请在下方输入举报内容)</p>
        <textarea name="" id="" cols="30" rows="10" class="content" v-model="details"></textarea>
        <div class="model_btn">
          <span class="btn_cancel" @click="cancel()">取消</span>
          <span class="btn_confirm" @click="confirm()">确认</span>
        </div>
      </div>
    </div>

    <!-- 取消验票弹窗 -->
    <div class="model" v-show="vModel">
      <div class="bg"></div>
      <div class="model_box">
        <p class="vModel_content">取消后，您现在的排队进度将取消，下次进入将重新排队！确认取消吗？</p>
        <div class="model_btn">
          <span class="btn_cancel" @click="cancel()">取消</span>
          <span class="btn_confirm" @click="nextConfirm()">确认</span>
        </div>
      </div>
    </div>
    <!-- tips -->
    <div class="tips" v-show="tipsShow">感谢你的举报，我们会尽快作出处理！</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: false,
      vModel: false,
      tipsShow: false,
      zbIcon: false,
      details: '',
      code: '',
      token: '',
      deviceNo: '',
      urlVideo: '',
      imgUrl: '',
      queueList:[], //验票队列
      firstList:{},
    }
  },
  mounted(){
    let _this = this;
    this.code = this.$route.query.code;
    this.token = this.$route.query.token;
    this.deviceNo = this.$route.query.deviceNo;
    this.getVideoPath();
    this.getQueueList();
    setInterval(function () {
      _this.getQueueList();
      _this.getImgUrl();
    },2000)
    // this.all1()

  },
  methods:{
      //根据ID获取播放地址
      getVideoPath(){
        let formData = new FormData;
        formData.append('code', this.code)
        this.$http.post('/liveApi/getPlayStreamNameByCode',formData)
        .then((res)=>{
          // console.log(res.data.data)
          if(res.data.status == 1){
            this.urlVideo = res.data.data.pullUrlM3u8
            this.createVideo()
          }
        },(err)=>{
          console.log(err)
        })
      },

      //获取全部验票队列
      getQueueList(){
        let formData = new FormData;
        formData.append('token', this.token)
        this.$http.post('/liveApi/padExamineTicketList',formData)
        .then((res)=>{
          // console.log(res.data.data)
          if(res.data.status == 1){
            this.queueList = res.data.data.ticketList
            this.firstList = res.data.data.ticketList[0]
            // this.queueList.forEach((element,index) => {
            //   if(element.code == this.code){
            //     this.firstList = element
            //   }
            // });
          }
        },(err)=>{
          console.log(err)
        })
      },

      // 查询彩票是否验证过
      getImgUrl(){
        let formData = new FormData;
        formData.append('code', this.code)
        this.$http.post('/liveApi/ticketIsExamine',formData)
        .then((res)=>{
          console.log(res.data.data)
          if(res.data.status == 1){
            this.imgUrl = res.data.data.url
          }
        },(err)=>{
          console.log(err)
        })
      },

      // 查询是否验证过
      // getImg(){
      //   let formData = new FormData;
      //   formData.append('code', this.code)
      //   return this.$http.post('http://192.168.0.192:8080/liveApi/ticketIsExamine',formData)
      // },

      // 合并发送请求
      // all1(){
      //   this.$http.all([this.getImg(),this.getQueueList()]).then(this.$http.spread((res1,res2)=>{
      //     // console.log(res1.data)
      //     // console.log(res2)
      //     if(res1.data.status == 1){
      //       this.imgUrl = res1.data.data.url
      //     }
      //     if(res2.data.status == 1){
      //       this.queueList = res2.data.data.ticketList
      //       this.queueList.forEach((element,index) => {
      //         if(element.code == this.code){
      //           this.firstList = element
      //         }
      //       });
      //     }
      //   },(err)=>{
      //     console.log(err)
      //   }))
      // },

      // 确认取消验票
      nextConfirm(){
        let formData = new FormData();
        formData.append('token',this.token)
        this.$http.post('/liveApi/padExamineTicketLogOut',formData).then((res)=>{
          console.log(res)
          if(res.data.status == 1){
            this.getQueueList()
          }
        },(err)=>{
          console.log(err)
        })
      },

      //创建播放器
      createVideo(){
        let _this = this;
        let player = new Aliplayer({
          id: "J_prismPlayer",
          autoplay: true,
          isLive:true,
          playsinline:true,
          width:"100%",
          height: "100%",
          controlBarVisibility:"always",
          useH5Prism:false,
          useFlashPrism:false,
          source:this.urlVideo,
          cover:"",
            skinLayout:[{"name":"controlBar","align":"blabs","x":0,"y":0,"children":[
                  {"name":"playButton","align":"tl","x":15,"y":12}]},
                  {"name":"bigPlayButton","align":"blabs","x":30,"y":80}]
            },function(player){
            console.log("播放器创建了。");
            _this.zbIcon = true;
          }
        );
      },

      //  取消验票
      vCancle(){
        this.vModel = true;
      },

      // 举报
      report(){
        this.model = true;
      },
      // 弹窗取消
      cancel(){
        this.model = false;
        this.vModel = false;
      },
      // 弹窗确认提交
      confirm(){
        let _this = this;
        this.model = false;
        this.vModel = false;
        let formData = new FormData;
        formData.append('code', this.code)
        formData.append('content', this.details)
        this.$http.post('/liveApi/userToReport',formData).then((res)=>{
          // console.log(res)
          if(res.data.status == 1){
            _this.tipsShow = true
            setTimeout(function(){
              _this.tipsShow = false
            },2000)
          }
        },(err)=>{
          console.log(err)
        })
      },
      // 退出页面
      outPage(){
        window.hcbWeb.close();
      },
  },
}
</script>

<style scoped>
header{
  position: relative;
  width: 100%;
  height: 150px;
}
.title{
  display: inline-block;
  width: 100%;
  height: 150px;
}
.out{
  position: absolute;
  top: 45px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.video_box{
  width: 66%;
}
.box{
  position: relative;
  margin: 20px;
  padding: 20px;
  border-radius: 20px;
  background-color: #F5EADB;
  box-shadow:2px 2px 4px 0px rgba(102,102,102,0.5);
}
.box>p{
  text-align: right;
}
.video_small_box{
  height: 668px;
}
.live{
  position: absolute;
  display: block;
  height: 30px;
  top: 80px;
  left: 35px;
  z-index: 100;
}
.address{
  float: left;
  line-height: 26px;
}
.report{
  display: inline-block;
  height: 20px;
}
.created_video{
  margin-top: 20px;
}
.tips_content{
  margin-top: 62px;
}

/*右边等待队列*/
.video_box,.play_right{
  display: inline-block;
}
.play_right{
  width: 33%;
  vertical-align: top;
  margin-top: 20px;
}
.verification_title{
  font-size: 16px;
  margin-bottom: 10px;
}
.already{
  display: inline-block;
  width: 100px;
  margin: 0 20px;
}
.verification{
  border-radius: 20px;
  padding: 10px;
  background-color: #F5EADB;
}
.this{
  color: #FF9903;
}
.this_address{
  float: right;
}
.price{
  float: right;
}
.wait_list{
  text-align: center;
  border-radius: 20px;
  background-color: #F5EADB;
  padding-top: 20px;
  height: 804px;
}
.list_title{
  width:254px;
  height:47px;
  line-height: 47px;
  background:rgba(242,184,16,1);
  border-radius:20px;
  margin: 0 auto 20px;
}
.list_title2{
  width:170px;
  height:47px;
  line-height: 47px;
  background:#FF9903;
  border-radius:20px;
  margin: 0 auto 20px;
}
.list{
  font-size: 0;
  width: 100%;
  height: 600px;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  background-color: white;
  overflow-x: hidden;
　overflow-y:auto;
}
.list2{
  display: block;
  width: 100%;
  height: 600px;
  border: 1px solid red;
}
.vImage{
  display: block;
  width: 100%;
  height: 600px;
  border: 1px solid red;
}
.list>li{
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #cccccc;
}
.list_index{
  display: inline-block;
  vertical-align: top;
  font-size: 20px;
}
.list_index{
  color: #999999;
}
.list_num{
  display: inline-block;
  vertical-align: top;
  font-size: 20px;
  color: #999999;
  margin: 0 10px;
}
.list_price,.list_type,.list_status{
  display: inline-block;
  vertical-align: top;
  font-size: 16px;
  margin: 0 2%;
  color: #999999;
}
.list_status{
  color: #999999;
}
.wait_num{
  text-align: center;
  color: #999999;
  font-size: 20px;
  margin: 10px 0;
  height: 28px;
}
.number{
  color: #FF9903;
}

/*弹窗*/
.bg{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.6;
  z-index: 110;
}
.model_box{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width:900px;
  height:570px;
  background:rgba(255,255,255,1);
  border-radius:30px;
  margin: auto;
  padding: 60px;
  z-index: 120;
}
.wherefore,.other{
  font-size: 24px;
  color: #666666;
  margin-bottom: 10px;
}
.content{
  width:780px;
  height:220px;
  background:rgba(238,238,238,1);
  border-radius:10px;
  margin-top: 10px;
  border: none;
  outline: none;
  resize: none;
  padding: 10px;
  font-size: 20px;
}
.model_btn{
  font-size: 0;
}
.btn_cancel,.btn_confirm{
  display: inline-block;
  width:200px;
  height:60px;
  line-height: 60px;
  text-align: center;
  box-shadow:0px 2px 4px 0px rgba(0,0,0,0.5);
  border-radius:30px;
  font-size: 24px;
  margin: 50px 95px 0;
}
.btn_cancel{
  background:rgba(238,238,238,1);
}
.btn_confirm{
  background:rgba(255,2,2,1);
  color: white;
}

.vModel_content{
  width: 70%;
  font-size: 24px;
  color: #FF0202;
  text-align: center;
  margin: 100px auto;
}

.tips{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width:300px;
  height:50px;
  line-height: 50px;
  text-align: center;
  border-radius: 50px;
  background-color: white;
  z-index: 140;
  margin: auto;
}
</style>
















