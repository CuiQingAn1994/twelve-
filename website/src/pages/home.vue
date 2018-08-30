<template>
	<section>
    <div class="area inner">
      <!-- 轮播 -->
      <div class="banner">
        <div class="ban_box">
          <!-- <el-carousel arrow="never"  height="408px" indicator-position="outside" :interval="3000">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
           </el-carousel> -->
            <swiper :options="swiperOption" ref="mySwiper">
              <!-- slides -->
              <swiper-slide>I'm Slide 1</swiper-slide>
              <swiper-slide>I'm Slide 2</swiper-slide>
              <swiper-slide>I'm Slide 3</swiper-slide>
              <swiper-slide>I'm Slide 4</swiper-slide>
              <swiper-slide>I'm Slide 5</swiper-slide>
              <swiper-slide>I'm Slide 6</swiper-slide>
              <swiper-slide>I'm Slide 7</swiper-slide>
              <!-- Optional controls -->
              <div class="swiper-pagination"  slot="pagination"></div>
              <!-- <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div> -->
              <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
            </swiper>
        </div>
        <div class="ban_right">
          <img class="logo" src="">
        </div>
      </div>
      <!-- 公益数据 -->
      <div class="c1_l">
            <p class="c1_title">公益数据</p>
      </div>
      <div class="center">
        <div class="c_box c1">
          <div class="c1_r">
            <p class="c1_num">¥253,737,187.74</p>
            <p class="c1_all">历史善款总额</p>
          </div>
        </div>
        <div class="c_box c2">
          <div class="c1_r">
            <p class="c1_num c2_num">3,521.001</p>
            <p class="c1_all">历史爱心总人次</p>
          </div>
        </div>
        <div class="c_box c3">
          <div class="c3_box">
            <p class="c3_title">公益记录者证查询&gt;&gt;</p>
            <p><input class="c3_print" placeholder="请输入公益记录者姓名或手机号查询" type="text" name=""><span class="check">查询</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="benefit">
      <p class="inner">微公益 ·在行动 · 我参与</p>
    </div>
    <div class="active inner">
      <div class="a1">
        <p class="a1_title">本次更新的捐款数据为</p>
        <div class="a1_t"></div>
        <div class="a1_btn">
          <div class="all_btn">全部爱心名单</div>
          <div class="use_btn">善款使用</div>
        </div>
      </div>
      <div class="a2"></div>
      <div class="a3"></div>
    </div>
    <div class="benefit">
      <p class="tiny inner">公益动态</p>
    </div>
    <div class="a_con inner">
      <div class="a_in1 a_in">
        <div class="video">
           <video width="280" height="280"  src="http://jzvd.nathen.cn/6ea7357bc3fa4658b29b7933ba575008/fbbba953374248eb913cb1408dc61d85-5287d2089db37e62345123a1be272f8b.mp4" controls="controls"></video>
        </div>
        <div class="v_title">寄往天堂的一封信</div>
       
      </div>
      <div class="a_in2 a_in">
        <div class="a2_con">
          <div class="a2_left">
            <p class="al_top">20</p>
            <p class="al_bot">2018-02</p>
            <!-- shang -->
          </div>
          <div class="a2_right">
            <p class="ar_title">湖南女子监狱服刑母亲获帮扶</p>
            <p class="ar_con">湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶</p>
          </div>
        </div>
        <div class="a2_con">
          <div class="a2_left">
            <p class="al_top">20</p>
            <p class="al_bot">2018-02</p>
            <!-- shang -->
          </div>
          <div class="a2_right">
            <p class="ar_title">湖南女子监狱服刑母亲获帮扶</p>
            <p class="ar_con">湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶</p>
          </div>
        </div>
        <div class="a2_con">
          <div class="a2_left">
            <p class="al_top">20</p>
            <p class="al_bot">2018-02</p>
            <!-- shang -->
          </div>
          <div class="a2_right">
            <p class="ar_title">湖南女子监狱服刑母亲获帮扶</p>
            <p class="ar_con">湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶</p>
          </div>
        </div>
        <div class="a2_con">
          <div class="a2_left">
            <p class="al_top">20</p>
            <p class="al_bot">2018-02</p>
            <!-- shang -->
          </div>
          <div class="a2_right">
            <p class="ar_title">湖南女子监狱服刑母亲获帮扶</p>
            <p class="ar_con">湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶</p>
          </div>
        </div>
        <div class="a2_con">
          <div class="a2_left">
            <p class="al_top">20</p>
            <p class="al_bot">2018-02</p>
            <!-- shang -->
          </div>
          <div class="a2_right">
            <p class="ar_title">湖南女子监狱服刑母亲获帮扶</p>
            <p class="ar_con">湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶湖南女子监狱服刑母亲获帮扶</p>
          </div>
        </div>
        <div class="a2_con more">查看更多&gt;&gt;</div>

      </div>
    </div>
    <div class="a_img inner">
      <div class="in_img"></div>
      <div class="in_img"></div>
      <div class="in_img"></div>
      <div class="in_img"></div>
      <div class="in_img"></div>
    </div>
    <div class="intro">
      <div class="inner intro_box"> 
        <div class="left">
          <div :style="{background:idx==index?'#E51C23':'#fff',color:idx==index?'#fff':'#333333'}" v-for="(item,index) in intro"  @mouseenter="move(index)" class="l_btn">{{item.title}}</div>
        </div>
        <div class="right">
          <div class="r_1" v-if="idx==0">
            <p >北京博爱妇女发展慈善基金会（以下简称“博爱妇女基金会”），由北京市民政局主管登记的非营利慈善组织，司法部监狱管理局为指导单位，全国妇联、全国政协机关妇女委员会给予支持。宗旨是弘扬中华民族扶贫济困的传统美德，落实中央精准扶贫，帮助贫困妇女、儿童助学及监狱服刑人员的失学孩子等困难群众，开展多种形式的妇女儿童帮扶救助，贫困妇女培训，全面发展和提高妇女在社会各领域发挥更大的作用，为妇女儿童和慈善事业发展做出积极的贡献。</p>
            <p> 博爱妇女慈善基金会发挥其特点，经民政部门批准，设立了“贫困母亲救助项目、情暖高墙•关爱孩子公益项目（关爱监狱服刑人员未成年子女）、女性再就业培训项目、贫困妇女‘两癌’救助项目及儿童助学项目”等六大救助项目，主要针对贫困妇女、儿童及监狱服刑人员的未成年孩子开展救助工作。特别是“情暖高墙•关爱孩子”公益项目，2017年12月3日司法部监狱管理局与基金会在全国政协礼堂举行了启动仪式。</p>
            <p>基金会设有“美如爱心基金、李洪春艺术发展慈善基金、魅力汇爱心基金、安娜国际爱心基金、闫国超艺术爱心基金、聚心国际慈善基金、明清感恩社慈善基金、中隆源+昆银慈善基金、象山杨坜锋慈善基金、多多善舍爱心基金”等11个专项基金，在全国开展慈善扶贫活动。</p>
          </div>
          <div class="r_2" v-if="idx==1">
            <div class="img_box2"></div>
            <div class="img_box2"></div>
          </div>
          <div class="r3"  v-if="idx==2">
            <div :style="{width:30+250*4+'px',height:'100%'}">
              <div class="img_box3"></div>
              <div class="img_box3"></div>
              <div class="img_box3"></div>
              <div class="img_box3"></div>
            </div> 
          </div>
        </div>
      </div>
    </div>
    <div class="dashi inner">
      <div class="peo_title">公益大使</div>
      <div class="peo_dashi">
        <div class="peo_box" :style="{width:185*7+'px'}">
          <div class="dashi_box">
            <div class="d_top"></div>
            <div class="d_bot">邢海东</div>
          </div>
          <div class="dashi_box">
            <div class="d_top"></div>
            <div class="d_bot">邢海东</div>
          </div>
          <div class="dashi_box">
            <div class="d_top"></div>
            <div class="d_bot">邢海东</div>
          </div>
          <div class="dashi_box">
            <div class="d_top"></div>
            <div class="d_bot">邢海东</div>
          </div>
          <div class="dashi_box">
            <div class="d_top"></div>
            <div class="d_bot">邢海东</div>
          </div>
          <div class="dashi_box">
            <div class="d_top"></div>
            <div class="d_bot">邢海东</div>
          </div>
          <div class="dashi_box">
            <div class="d_top"></div>
            <div class="d_bot">邢海东</div>
          </div>
        </div>
      </div>
    </div>
	</section>
</template>
<script type="text/javascript">
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
      components: {
          swiper,
          swiperSlide
      },
	    data() {
	      return {
             swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
            // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
              notNextTick: true,
              loop:true,
              // swiper configs 所有的配置同swiper官方api配置
              autoplay: true,
              speed:300,
              direction : 'horizontal',
              grabCursor : true,
              setWrapperSize :true,
              autoHeight: true,
              pagination: {
                el: '.swiper-pagination',
              },
              paginationClickable :true,
              prevButton:'.swiper-button-prev',//上一张
              nextButton:'.swiper-button-next',//下一张
              scrollbar:'.swiper-scrollbar',//滚动条
              mousewheelControl : true,
              observeParents:true,
              // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
              debugger: true,
          },
          intro:[{title:'机构介绍'},{title:'领导成员'},{title:'荣誉证书'}],
          idx:0,
	      };
	    },
      methods:{
        move(index){
          this.idx = index;
        }
      }
    }
</script>
<style type="text/css">
   .swiper-pagination .swiper-pagination-bullet-active{
    background:red;
  }
</style>
<style type="text/css" scoped>
 
  .swiper-container, .swiper-slide { 
    width:100%;
    height:100%;
  } 
  /*版心*/
  .inner{
    width:1088px;
    margin:0 auto;
  }
  section{
  	width:100%;
  	padding-top:16px;
  }
  /*轮播*/

  .banner{
  	height:408px;
  }
  .ban_box{
  	width:66.66666666%;
  	float: left;
    height:100%;
    border:1px solid #666;
  }
  .ban_right{
  	border:1px solid #666;
  	float: left;
  	width:32.33333333%;
  	height:408px;
  	margin-left:1%;
  }
  .logo{
  	width:50%;
  	height:50%;
  }
  /*公益数据*/
  .center{
    width:100%;
  	height:104px;
  	margin-top:15px;
    overflow: hidden;
  }
  .c_box{
  	float: left;
  	width:33.33333333%;
	 box-sizing: border-box;
	 height:100%;
  }
  .c1{
  	border-right:2px dashed #666;
  	height:86px;
  }
  .c1_l{
  	width:66.66666666%;
  	/*float: left;*/
    color:#E86036;
    text-align: center;

  }
  .c1_r{
  	width:100%;
  	float: left;
  }
 .c1_num,.c1_all{
  	height:43px;
  	line-height: 43px;
  }
  .c1_title{
  	font-size: 18px;
    padding:15px 0 5px 0;
  }
  .c1_num{
  	font-size: 24px;
  	color:#E67132;
  	font-weight: bold;
  }
  .c1_all{
  	font-size: 14px;
  }
  .c2_num{
  	color:#FF9903;
  }
  .c3{
  	box-sizing: border-box;
  	padding:0 0px 0px 10px;
  }
  .c3_box{
  	width:100%;
  	height:100%;
  	box-sizing: border-box;
  	border:1px solid #0794F4 ;
  	padding:0 12px ;
  }
  .c3_title{
  	font-size: 14px;
  	line-height: 40px;
  }
  .c3_print{
  	height:44px;
  	width:60%;
  	margin-right:13px;
  	border:1px solid #888;
  	font-size: 12px;
  	padding-left:10px;
  }
  .check{
  	display: inline-block;
  	width:91px;
  	height:40px;
  	line-height: 40px;
  	background: #259B24;
  	border-radius: 4px;
  	color:#fff;
  	font-size: 14px;
  }
  /*微公益在行动我参与*/
  .benefit{
    width:100%;
  	color:#E51C23;
  	font-size: 20px;
    text-align: left;
  	float: left;
    padding:20px 0;
    border-top:5px solid #f6f6f6;
    margin-top:10px;
  }

  /*公益动态*/
  .active{
    height:430px;
    overflow: hidden;
    margin-bottom:10px;
  }
  .a1{
    width:calc(33.33333333% - 50px);
    float: left;
    height:100%;
    margin: 0 25px;
    position: relative;
  }
  .a1_t{
    width:100%;
    height:378px;
    border:1px solid #259B24;
  }
  .a2,.a3{
    width:calc(33.33333333% - 50px);
    float: left;
    height:100%;
    margin: 0 25px;
    border:1px solid #259B24;
  }
  .a1_title{
    position: absolute;
    width:80%;
    height:45px;
    text-align: center;
    line-height: 45px;
    background:#259B24;
    color:#fff;
    top:0px;
    left:-5%;
    box-shadow: 0px 2px 4px 0px #333;
  }
  .a1_btn{
    width:100%;
    height:45px;
    color:#fff;
    text-align: center;
    font-size: 14px;
  }
  .all_btn,.use_btn{
    height:100%;
    float: left;
    margin-top:10px;
    line-height: 45px;
    border-radius: 2px;
  }
  .all_btn{
    width:50%;  
    margin-right:10px;
    background:#E51C23; 
  }
  .use_btn{
    width:calc(50% - 10px);
    background:#3399FF;
  }
  .a_con{
    height:330px;
    overflow: hidden;
  }
  .a_in1{
    width:calc(33.33333333% - 50px);
    height:100%;
    /*border:1px solid #888;*/
    float: left;
    margin-right:16px;
    overflow:hidden;
  }
  .video{
    width:280px;
    height:280px;
    overflow: hidden;
    /*margin:0 auto;*/
  }
  .v_title{
    line-height: 50px;
    font-size: 16px;
  }
  .a_in2{
    width:calc(66.66666666% + 4px);
    height:100%;
    /*border:1px solid #888;*/
    float: left;
  }
  .a2_con{
    width:50%;
    height:110px;
    /*line-height: 110px;*/
    box-sizing: border-box;
    text-align: center;
    float: left;
    overflow: hidden;
  }
  .more{
    line-height: 90px;
  }
  .a2_left{
    width:25%;
    height:90px;
    border-right:2px solid #999;
    box-sizing: border-box;
    padding:20px 0;
    /*background:green;*/
    float: left;
  }

  .al_top,.al_bot{
    height:25px;
    color:#999;
  }
  .al_top{
    font-size: 22px;
  }
  .al_bot{
    font-size: 16px; 
  }
  .a2_right{
    width:calc(75% - 2px);
    float: left;
    height:90px;
    /*background:#888;*/
    box-sizing: border-box;
    padding:0 16px;
    /*padding*/

  }
  .ar_title{
    height:30px;
    line-height: 30px;
    font-size: 14px;
    color:#333;
  }
  .ar_con{
    height:60px;
    line-height: 20px;
    font-size: 12px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color:#666;
  }

  .a_img{
    margin-top:10px;
    overflow: hidden;
  }
  .in_img{
    width:calc(20% - 22px);
    float: left;
    border:1px solid #999;
    margin-right:20px;
    height:140px;
  }
  /*机构介绍＊领导成员＊荣誉证书*/
  .intro{
    width:100%;
    height:350px;
    margin-top:20px;
    border-top:10px solid #f6f6f6;
    border-bottom:10px solid #f6f6f6;
    background:rgba(0,0,0,.7);
    box-sizing: border-box;
    padding:32px 0;
  }
  .intro_box{
    height:100%;
  }
  .left{
    width:170px;
    height:100%;
    float: left;

    
  }
  .l_btn{
    width:170px;
    height:40px;
    line-height: 40px;
    text-align: center;
    box-shadow: 0px 2px 4px 0px #333333;
    margin-bottom:16px;
    border-radius: 4px;
  }
  .right{
    float: left;
    width:calc(100% - 170px);
    height:100%;
    overflow: auto;
    /*background:#fff;*/
  }
  .r_1{
    text-align: left;
    text-indent: 2em;
    font-size: 16px;
    color:#fff;
    box-sizing: border-box;
    padding-left:30px;
    padding-top:5px;
  }
  .r_2{
    padding-left:30px;
    padding-top:5px;
    box-sizing: border-box;

  }
  .r3{
    width:calc(100% - 30px);
    overflow-x: auto;
    margin-left:30px;
    padding-top:5px;
  }
  .img_box2{
    width:144px;
    height:180px;
    background:#fff;
    float: left;
    margin-right:50px;
  }
  .img_box3{
    width:225px;
    height:163px;
    background:#fff;
    float: left;
    margin-right:25px;
  }
  .dashi{
    height:400px;
  }
  .peo_title{
    padding:20px;
    text-align: left;
  }
  .peo_dashi{
    overflow: auto;
  }
  .peo_box{

  }
  .dashi_box{
    width:150px;
    height:235px;
    /*border:1px solid #888;*/
    float: left;
    margin-right:35px;
  }
  .d_top{
    width:148px;
    height:148px;
    border-radius: 50%;
    border:1px solid #888;
    background:#D8D8D8;
  }
  .d_bot{
    line-height: 85px;
    color:#E86036;
  }

  @media screen and (max-width: 1280px){
    .intro{
      width:1280px;
    }
  }
</style>