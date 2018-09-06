<template>
  <div class="video">
    <header>
      <h1 class="title">华彩宝录票直播平台</h1>
      <img src="../../static/images/tc.png" alt="" class="out" @click="outPage()">
    </header>
    <img src="../../static/images/zb.png" alt="" class="live">
    <div ref="mybox" class="prism-player created_video" id="J_prismPlayer"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: false,
      tipsShow: false,
      zbIcon: false,
      details: '',
      code: '',
      urlVideo: '',
    }
  },
  mounted(){
    this.code = this.$route.query.code;
    this.getVideoPath()
    // this.createVideo()

  },
  methods:{
      //根据ID获取播放地址
      getVideoPath(){
        // let formData = new FormData;
        // formData.append('code', this.code)
        // http://192.168.0.192:8080
        this.$http.get('/liveApi/entryTicketLiveUrl').then((res)=>{
          console.log(res.data.data)
          if(res.data.status == 1){
            this.urlVideo = res.data.data.pullUrlM3u8
            this.createVideo()
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
          height:"100vh",
          controlBarVisibility:"always",
          useH5Prism:false,
          useFlashPrism:false,
          source:this.urlVideo,
          // source:'https://vid.zthuacai.com/ZthcLive/ZthcYanPiaoLive120000.m3u8',
          cover:"",
            skinLayout:[{"name":"controlBar","align":"blabs","x":0,"y":0,"children":[
                  {"name":"playButton","align":"tl","x":15,"y":12}]},
                  {"name":"bigPlayButton","align":"blabs","x":30,"y":80}]
            },function(player){
            console.log("播放器创建了。");
            // _this.zbIcon = true;
          }
        );
      },

      // 退出页面
      outPage(){
        window.hcbWeb.close();
        // console.log(111)
      },
  },
}
</script>

<style scoped>
.video{
  position: relative;
}
.title{
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  z-index: 10;
  font-size: 30px;
  text-align: center;
  color: white;
  font-weight: 900;
}
.out{
  position: absolute;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  z-index: 20;
}
.live{
  position: absolute;
  display: block;
  top: 20px;
  left: 20px;
  z-index: 100;
}

</style>
















