window.onload=function(){
	var snNo = hcb.params("deviceNo")
	var lotteryId = hcb.params("lotteryId")
	var token = hcb.params("token");
	var amount = hcb.params("amount");
	var typeId = hcb.params("typeId");
	var allArr,m,n,lock,orId,wxUrl;
	// alert(lotteryId)
	FastClick.attach(document.body);
	// 一个一个显示十二生肖
	function query(){
		$('.con').addClass('show')
		for(var j=1;j<=12;j++){
			(function(j){
				setTimeout(()=>{
					$('.con'+j).css({transform:'rotateY(360deg)'})
					$('.box'+j).addClass('show')
					// console.log(j)
				},300*j)
			})(j)
		}
		setTimeout(()=>{
			$('.con').css({transition:'0.2s'})
		},4000)
	}
	// 画轴展开
	function open(){
		setTimeout(()=>{
			$('.scroll').animate({width:'1506px'},2000,'linear')
			$('.bleft').animate({width:'151px'},250,'linear')
			$('.bright').animate({width:'151px'},250,'linear')
			$('.bcenter').delay(190).animate({width:'1064px'},1800,'linear')
			setTimeout(()=>{
				$('.sIn').addClass('animated fadeIn').css({display:'block'})
				$('.exit').addClass('animated fadeIn show')
			},2000)
		},500)
	}
	// 获取彩票
	function lottery(){
		axios.get(_config.server+'/api/activity/number/lottery?lotteryId='+lotteryId).then(res=>{
			console.log(res)
			if(res.data.status==1){
				var twoLott = res.data.data;
				if(twoLott.length==2){
					$('.window').addClass('animated fadeIn').css({display:'block'})
					lock = twoLott[0].id+','+twoLott[1].id
					console.log(lock)
					// alert(twoLott[0].number+','+twoLott[1].number)
					if(twoLott[0].number==twoLott[1].number){
						$('.lucky').html(twoLott[0].number)
					}else{
						$('.lucky').html(twoLott[0].number+','+twoLott[1].number)
					}
					// 第一张票的信息
					$('.sinbl').attr("lottId",twoLott[0].id)
					$('.lott1').html(twoLott[0].name)
					$('.lott_num1').html(twoLott[0].code.substring(0,twoLott[0].code.length-13))
					// 第二张票的信息
					$('.sinbr').attr("lottId",twoLott[1].id)
					$('.lott2').html(twoLott[1].name)
					$('.lott_num2').html(twoLott[1].code.substring(0,twoLott[1].code.length-13))
					open();
				}else{
					// alert('没票了')
					toast('此彩种卖完了,请选择其他彩种！')
					gb();
				}
				
			}
			
		})
	}
	// 解锁彩票
	function unlock(){
		var lockParams = new FormData();
		lockParams.append('token',token);
		lockParams.append('id',lock);
		lockParams.append('type',2);
		axios.post(_config.server+'/api/common/ticket/unlock',lockParams).then(res=>{
			console.log(res)
		})
	}
	// 初始化选择票状态
	function init(){
		 allArr=[];
		 m = 0;
		 n = 0;
		 $('.chose1').css({display:'none'})
		 $('.chose2').css({display:'none'})
		 $('.cnum').html('0')
		 $('.cprice').html('0')
	}
	function toast(str){
		$('.toast').html(str).css({display:'block'})
		setTimeout(()=>{
			$('.toast').css({display:'none'})
		},2000)
	}
	// 停止动画
	function stop(){
		$('.scroll').stop();
		$('.bleft').stop();
		$('.bright').stop();
		$('.bcenter').stop();
		$('.sIn').stop();
	}
	function wdInit(){
		$('.scroll').css({width:'1.40rem'})
		$('.bleft').css({width:'0rem'})
		$('.bright').css({width:'0rem'})
		$('.bcenter').css({width:'0rem'})
		$('.window').removeClass('fadeIn')
		$('.window').addClass('fadeOut').css({display:'none'})
		$('.sIn').removeClass('fadeIn').css({display:'none'})
		$('.exit').removeClass('animated fadeIn show')
	}
	// 关闭页面
	function gb(){
			stop();
			wdInit();
	}
	// 花边，花，浪
	// 第一页动画
	$('.down').addClass('show animated fadeInDown');
	$('.up').addClass('show animated fadeInUp')
	setTimeout(()=>{
		$('.fade').addClass('show animated fadeIn')
	},1000)
	setTimeout(()=>{
		$('.cloud').addClass('show animated fadeInLeft')
		$('.cloud2').addClass('show animated fadeInRight')
	},1500)
	setTimeout(()=>{
		$('.word').animate({width:'6.35rem'},2000,'linear');
	},2500)
	setTimeout(()=>{
		$('.seal2').addClass('show animated fadeIn')
	},5000)
	setTimeout(()=>{
		$('.seal1').addClass('show animated fadeIn')
	},5500)
	// 第二页动画
	setTimeout(()=>{
		$('.circle').animate({top:'-1.25rem'},1000);
		$('.flower').animate({bottom:'-1.25rem'},1000);
		// $('.cloud').removeClass('fadeInLeft');
		$('.cloud').addClass('fadeOutLeft')
		// $('.cloud2').removeClass('fadeInRight');
		$('.cloud2').addClass('fadeOutRight')
		$('.word').addClass('animated fadeOut')
		$('.seal2').addClass('fadeOut')
		$('.seal1').addClass('fadeOut')
	},6500)
	setTimeout(()=>{
		$('.word2').animate({width:'6.84rem'},1000)
	},7500)
	setTimeout(()=>{
		$('.seal3').addClass('show animated fadeIn')
	},8500)
	setTimeout(()=>{
		$('.seal4').addClass('show animated fadeIn')
	},9000)
	setTimeout(()=>{
		query();
		$('.close').addClass('show animated fadeIn')
	},9500)
	// 完成
	// 选择生肖
	// 按下缩小
	$('.animals .con').on('touchstart',function(){
		$($(this)[0]).css({transform:'scale(0.8,0.8)'})
	})
	// 抬起恢复
	$('.animals .con').on('touchend',function(){
		$($(this)[0]).css({transform:'scale(1,1)'})
	})
	// 点击触发
	$('.animals .con').click(function(){
		 init();
		// 点击鼠
		if($(this).index()==0){
						
			$('#intro').html('<img  src="./img/shutext.png"><span class="lucky" ></span>')
			// 点击牛
		}else if($(this).index()==1){
			$('#intro').html('<img  src="./img/niutext.png"><span class="lucky" ></span>')
			// 点击虎
		}else if($(this).index()==2){
			$('#intro').html('<img  src="./img/hutext.png"><span class="lucky" ></span>')
			// 兔
		}else if($(this).index()==3){
			$('#intro').html('<img  src="./img/tutext.png"><span class="lucky" ></span>')
			// 龙
		}else if($(this).index()==4){
			$('#intro').html('<img  src="./img/longtext.png"><span class="lucky" ></span>')
			// 蛇
		}else if($(this).index()==5){
			$('#intro').html('<img  src="./img/shetext.png"><span class="lucky" ></span>')
			// 马
		}else if($(this).index()==6){
			$('#intro').html('<img  src="./img/matext.png"><span class="lucky" ></span>')
			// 羊
		}else if($(this).index()==7){
			$('#intro').html('<img  src="./img/yangtext.png"><span class="lucky" ></span>')
			// 猴
		}else if($(this).index()==8){
			$('#intro').html('<img  src="./img/houtext.png"><span class="lucky" ></span>')
			// 鸡
		}else if($(this).index()==9){
			$('#intro').html('<img  src="./img/jitext.png"><span class="lucky" ></span>')
			// 狗
		}else if($(this).index()==10){
			$('#intro').html('<img  src="./img/goutext.png"><span class="lucky" ></span>')
			// 猪
		}else if($(this).index()==11){
			$('#intro').html('<img  src="./img/zhutext.png"><span class="lucky" ></span>')
		}
		$('.window').removeClass('fadeOut')
		lottery();
		// open();
		
		
	})
	// 关闭
	// 按下缩小
	$('.exit').on('touchstart',function(){
		$('.exit').css({transform:'scale(0.8,0.8)'})
	})
	// 抬起恢复
	$('.exit').on('touchend',function(){
		$('.exit').css({transform:'scale(1,1)'})
	})
	$('.exit').click(function(){
		unlock();
		gb();
		
	})
	$('.close').on('touchstart',function(){
		$('.close').css({transform:'scale(0.8,0.8)'})
	})
	// 抬起恢复
	$('.close').on('touchend',function(){
		$('.close').css({transform:'scale(1,1)'})
	})
	// 选择彩票

		
	// 选第一张	
	$('.sinbl').click(function(){
		if(m%2==0){
			// alert($('.sinbl').attr("lottId"))
			$('.chose1').css({display:'block'})
			allArr.push($('.sinbl').attr("lottId"))

		}else if(m%2==1){
			$('.chose1').css({display:'none'})
			if($.inArray($('.sinbl').attr("lottId"),allArr)!=-1){
				allArr.splice($.inArray($('.sinbl').attr("lottId"),allArr),1);
			}
		}
		$('.cnum').html(allArr.length)
		$('.cprice').html(allArr.length*amount)
		m++
		console.log(allArr)
	})
	// 选第二张
	$('.sinbr').click(function(){
		if(n%2==0){
			// alert($('.sinbr').attr("lottId"))
			$('.chose2').css({display:'block'})
			allArr.push($('.sinbr').attr("lottId"))
		}else if(n%2==1){
			$('.chose2').css({display:'none'})
			if($.inArray($('.sinbr').attr("lottId"),allArr)!=-1){
				allArr.splice($.inArray($('.sinbr').attr("lottId"),allArr),1);
			}
		}
		n++
		$('.cnum').html(allArr.length)
		$('.cprice').html(allArr.length*amount)
		console.log(allArr)
	})

	// 关闭页面
	$('.close').click(function(){
		window.hcbWeb.close();
	})
	// 换一批
	// 按下缩小
	$('.change').on('touchstart',function(){
		$('.change').css({transform:'scale(0.8,0.8)'})
	})
	// 抬起恢复
	$('.change').on('touchend',function(){
		$('.change').css({transform:'scale(1,1)'})
	})
	$('.change').click(function(){
		unlock();
		init();
		lottery();
		$('.lucky').removeClass('animated fadeIn').css({display:'none'})
		$('.lucky').addClass('animated fadeIn').css({display:'block'})
		$('.lott').removeClass('animated fadeIn').css({display:'none'})
		$('.lott').addClass('animated fadeIn').css({display:'block'})

	})
	// 付款
	// 按下缩小
	$('.pay').on('touchstart',function(){
		$('.pay').css({transform:'scale(0.8,0.8)'})
	})
	// 抬起恢复
	$('.pay').on('touchend',function(){
		$('.pay').css({transform:'scale(1,1)'})
	})
	$('.pay').click(function(){
		if(allArr.length==0){
			toast('请至少选择一张!');
		}else{
			console.log('执行')
			var params = new FormData();
			var singles = allArr.join(',')
			params.append('token',token)
			params.append('singles',singles)
			params.append('amount',allArr.length*amount)
			params.append('snNo',snNo)
			params.append('lotteryId',lotteryId)
			params.append('type',typeId)
			axios.post(_config.server+'/api/common/wechat/order',params).then(res=>{
				console.log(res)
				if(res.data.status==1){
					 orId = res.data.data.orderId;
					 wxUrl = res.data.data.url;
					 // alert('orId:'+orId+'---wxUrl:'+wxUrl)
					window.hcbWeb.openPayPage(orId,wxUrl)
					window.onPaySuccess=function(){
						window.hcbWeb.openDjPage(orId)
					}
					window.onPayCancel=function(){
						unlock();
						init();
						gb();
					}
				}
			})
		}

		// alert('正在开发中。。。')
	})
	// 关闭刮奖页面
	window.onDjPageClosed = function(){
		// alert('关闭刮奖页面了')
		init();
		gb();
	}
	// 支付成功

	
}












		
