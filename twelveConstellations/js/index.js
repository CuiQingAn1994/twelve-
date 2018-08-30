window.onload=function(){
	var snNo = hcb.params("deviceNo")
	var lotteryId = hcb.params("lotteryId")
	var token = hcb.params("token");
	var amount = hcb.params("amount");
	var typeId = hcb.params("typeId");
	var allArr,m,n,lock,orId,wxUrl;
	// alert(lotteryId)
	FastClick.attach(document.body);
	// 放缩的方法
	function scale(name){
		$(name).css({transition:'0.2s'})
		$(name).on('touchstart',function(){
			$(name).css({transform:'scale(0.8,0.8)'})
		})
		// 抬起恢复
		$(name).on('touchend',function(){
			$(name).css({transform:'scale(1,1)'})
		})
	}

	// toast提示
	function toast(str){
		$('.toast').html(str).css({display:'block'})
		setTimeout(()=>{
			$('.toast').css({display:'none'})
		},2000)
	}
	// scale('.title');
	scale('.close')
	scale('.exit');
	scale('.pay');
	$('.all').addClass('animated fadeIn show')
	$('.close').fadeIn(1000)
	setTimeout(()=>{
		$('.con').addClass('animated flipInY show')
		$('.title').addClass('animated fadeIn show')
	},500)
	// setTimeout(()=>{
	// 	$('.con').removeClass('animated flipInY');
	// },1000)
	function open(){
		$('.spage').animate({width:'13.87rem'},1000)
		$('.exit').fadeIn(1000)
	}
	// 获取彩票
	function lottery(){
		axios.get(_config.server+'/api/activity/number/lottery?lotteryId='+lotteryId).then(res=>{
			console.log(res)
			if(res.data.status==1){
				var twoLott = res.data.data;
				if(twoLott.length==2){
					lock = twoLott[0].id+','+twoLott[1].id
					console.log(lock)
					// alert(twoLott[0].number+','+twoLott[1].number)
					if(twoLott[0].number==twoLott[1].number){
						$('.lucky1').html(twoLott[0].number)
					}else{
						$('.lucky1').html(twoLott[0].number+' , '+twoLott[1].number)
					}
					// 第一张票的信息
					$('.lott1').attr("lottId",twoLott[0].id)
					$('.lott1 .lott_name').html(twoLott[0].name)
					$('.lott1 .lott_num').html(twoLott[0].code.substring(0,twoLott[0].code.length-13))
					// 第二张票的信息
					$('.lott2').attr("lottId",twoLott[1].id)
					$('.lott2 .lott_name').html(twoLott[1].name)
					$('.lott2 .lott_num').html(twoLott[1].code.substring(0,twoLott[1].code.length-13))
					$('.fpage').stop();
					$('.spage').stop();
					$('.fpage').animate({width:'0rem'},1000)
					setTimeout(()=>{
						open();
					},1000)
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
			$('.fpage').stop();
			$('.spage').stop();
			$('.spage').animate({width:'0rem'},1000)
			$('.exit').fadeOut(1000)
			setTimeout(()=>{
				$('.fpage').animate({width:'18.96rem'},1000)
				$('.close').fadeIn(1000)
			},1000)
		})
	}



	// 点击星座
	// 按下缩小
	$('.outBox').on('touchstart',function(){
		$($(this)[0]).css({transform:'scale(0.8,0.8)'})
	})
	// 抬起恢复
	$('.outBox').on('touchend',function(){
		$($(this)[0]).css({transform:'scale(1,1)'})
	})
	// 选一个星座
	$('.outBox').click(function(){
		init();
		console.log($(this).index())
		
		// setTimeout(()=>{
			lottery();
		// },1000)
		$('.close').fadeOut(1000)
		if($(this).index()==0){
			$('.s_top').html('<img src="./img/白羊座文案.png">')
		}else if($(this).index()==1){
			$('.s_top').html('<img src="./img/金牛座文案.png">')
		}else if($(this).index()==2){
			$('.s_top').html('<img src="./img/双子座文案.png">')
		}else if($(this).index()==3){
			$('.s_top').html('<img src="./img/巨蟹座文案.png">')
		}else if($(this).index()==4){
			$('.s_top').html('<img src="./img/狮子座文案.png">')
		}else if($(this).index()==5){
			$('.s_top').html('<img src="./img/处女座文案.png">')
		}else if($(this).index()==6){
			$('.s_top').html('<img src="./img/天秤座文案.png">')
		}else if($(this).index()==7){
			$('.s_top').html('<img src="./img/天蝎座文案.png">')
		}else if($(this).index()==8){
			$('.s_top').html('<img src="./img/射手座文案.png">')
		}else if($(this).index()==9){
			$('.s_top').html('<img src="./img/摩羯座文案.png">')
		}else if($(this).index()==10){
			$('.s_top').html('<img src="./img/水瓶座文案.png">')
		}else if($(this).index()==11){
			$('.s_top').html('<img src="./img/双鱼座文案.png">')
		}
	})


	// 初始化选择票状态
	function init(){
		 allArr=[];
		 m = 0;
		 n = 0;
		 $('.choose1').css({display:'none'})
		 $('.choose2').css({display:'none'})
		 $('.paynum').html('0')
		 $('.payprice').html('0')
	}
	// 关闭
	// function gb(){
	// 	init();
	// 	$('.spage').css({width:'0rem'})
	// 	$('.exit').css(display:'none')
	// 	$('.fpage').css({width:'18.96rem'})
	// 	$('.close').css({display:'block'})

	// }

	// 选第一张	
	$('.lott1').click(function(){
		if(m%2==0){
			// alert($('.sinbl').attr("lottId"))
			$('.choose1').css({display:'block'})
			allArr.push($('.lott1').attr("lottId"))

		}else if(m%2==1){
			$('.choose1').css({display:'none'})
			if($.inArray($('.lott1').attr("lottId"),allArr)!=-1){
				allArr.splice($.inArray($('.lott1').attr("lottId"),allArr),1);
			}
		}
		$('.paynum').html(allArr.length)
		$('.payprice').html(allArr.length*amount)
		m++
		console.log(allArr)
	})
	// 选第二张
	$('.lott2').click(function(){
		if(n%2==0){
			// alert($('.sinbr').attr("lottId"))
			$('.choose2').css({display:'block'})
			allArr.push($('.lott2').attr("lottId"))
		}else if(n%2==1){
			$('.choose2').css({display:'none'})
			if($.inArray($('.lott2').attr("lottId"),allArr)!=-1){
				allArr.splice($.inArray($('.lott2').attr("lottId"),allArr),1);
			}
		}
		n++
		$('.paynum').html(allArr.length)
		$('.payprice').html(allArr.length*amount)
		console.log(allArr)
	})

	// 支付
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
					}
				}
			})
		}

		// alert('正在开发中。。。')
	})

	// 点击返回
	$('.exit').click(function(){
		// alert('返回')
		unlock();
		
	})
	$('.close').click(function(){
		window.hcbWeb.close();
	})


	
}












		
