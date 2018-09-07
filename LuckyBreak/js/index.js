window.onload=function(){
	var snNo = hcb.params("deviceNo")
	var lotteryId = hcb.params("lotteryId")
	var token = hcb.params("token");
	var amount = hcb.params("amount");
	var typeId = hcb.params("typeId");
	var allArr,m,n,lock,orId,wxUrl;
	// alert(lotteryId)
	FastClick.attach(document.body);
	var arr=[];
	var arr1=[];
	var idx = 1;
	var w = $(".all").width()
	// alert(w)
	var data = [];


	// toast提示
	function toast(str){
		$('.toast').html(str).css({display:'block'})
		setTimeout(()=>{
			$('.toast').css({display:'none'})
		},2000)
	}
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
	scale('.buy')
	scale('.exit')
	scale('.true')
	scale('.false')
	// 付款后的操作
	// 生成二维码
	var dm = new Datamatrix();
	function qrcode(code,size,className){
		var ascii = dm.getDigit(code,false);
		var asciiArr2 = [];


		var asciiArr1 = ascii.split('\n');
		var len = asciiArr1.length;
		var asciiArr2 = [];
	    for(var i = 0;i < asciiArr1.length;i++){
	    	asciiArr2.push(asciiArr1[i].split(''))

	    }
	    for(var m = 0;m < asciiArr2.length; m++){
	    	for(var n = 0;n < asciiArr2[m].length;n++){
	    		if(asciiArr2[m][n]==0){
	    			$(className).append('<div  style="width:'+size/len+'rem;height:'+size/len+'rem;background:#fff;float:left; class="bai"></div>')
	    		}else{
	    			$(className).append('<div  style="width:'+size/len+'rem;height:'+size/len+'rem;background:#000;float:left; class="hei"></div>')
	    		}		
	    	}
	    }
	    // size = 0;
	    // alert(size)
	}
	// 生成牌
	function add(){
		for(var j=1;j<=data.length;j++){
			$('.spage').append('<div class="box box'+j+'"><div class="back"><div class="qr"></div></div><div class="front"></div></div>');
			$('.box'+j+' .front').css({backgroundImage:'url(./img/卡牌'+Math.ceil(j/6)+'.png)'})
			if(data[j-1].type==1){
				$('.box'+j).attr({'code':data[j-1].code,'type':1,'id':data[j-1].id})
				$('.box'+j+' .back').css({backgroundImage:'url(./img/彩票卡.png)'})
			}else if(data[j-1].type==2){
				$('.box'+j).attr({'url':data[j-1].url,'type':2})
				$('.box'+j+' .back').css({backgroundImage:'url('+data[j-1].url+')'})
			}
			
		}	
	}
	// 发牌动画
	function deal(){
		for(var i=data.length;i>=1;i--){
			$($('.box'+i).delay(Math.abs(i*100)).animate({left:((i-1)%6*296*(w/1920))+'px',top:Math.floor((i-1)/6)*346*(w/1920)+'px'},500));
		}
	}
	function go(){
		add();
		deal();
	}
	function haveBuy(){
		$('.dec,.star,.start').fadeOut(500);
		$('.introBox,.c4d,.b_paizi').fadeOut(1000);
		setTimeout(function(){
			$('.a_paizi').css({top:'0.45rem',transform:'scale(0.74,0.74)',transition:'1s'})
			$('.dian').css({top:'1.32rem',transform:'scale(1.32,1.32)',transition:'1s'})
			$('.all').css({height:'23.77rem', backgroundImage:"url(./img/背景2.jpg)",transition:'1s'})
		},2000)
		setTimeout(function(){
			$('.spage').fadeIn(1000)
			go();
			$('.box').click(function(){
				var that = this;
				var allIndex = $(this).index()+1;
				console.log($(this).index())
				// console.log($.inArray($(this).index(),arr))
				if($.inArray(allIndex,arr)==-1){
					arr.push(allIndex)
					$('.box'+allIndex).css({transform:'rotateY(180deg)'})
					// console.log()
					if($('.box'+allIndex).attr("type")==1){
						var lId = $('.box'+allIndex).attr("id");
						var turn = new FormData();
						turn.append('token',token);
						turn.append('id',lId);
						$('.big').css({backgroundImage:'url(./img/彩票卡.png)'})
						qrcode($('.box'+allIndex).attr('code'),0.65,'.box'+allIndex+' .back .qr');
						qrcode($('.box'+allIndex).attr('code'),1.47,'.qrbig')

						axios.post(_config.server+'/api/mbr/user/lottery/cash',turn).then(function(res){
							console.log(res)
						})


					}else if($('.box'+allIndex).attr("type")==2){
						$('.big').css({backgroundImage:'url('+$('.box'+allIndex).attr('url')+')'})
					}
					setTimeout(function(){
						$('.box'+allIndex).css({display:'none'})
						$('.window').fadeIn(500)
						idx = allIndex;
						$('.box'+allIndex+' .front').css({display:'none'})
					},500)
					
				}else{
					if($('.box'+allIndex).attr("type")==1){
						qrcode($('.box'+allIndex).attr('code'),1.47,'.qrbig')
					}
					$('.box'+allIndex).fadeOut(500)
					$('.window').fadeIn(500)
					idx = allIndex;
					$('.box'+allIndex+' .front').css({display:'none'})
				}
			})
		},3000)
	}
	// 获取彩票包号
	function getLottery(){
		axios.get(_config.server+'/api/game/package/random?token='+token+'&snNo='+snNo).then(function(res){
			if(res.data.status==1){
				console.log(res)
				var package = res.data.data.package;
				var lotteryId = res.data.data.lotteryId;
				var params = new FormData();
				// var singles = allArr.join(',')
				params.append('token',token)
				params.append('packages',package)
				params.append('amount',1)
				params.append('snNo',snNo)
				params.append('lotteryId',lotteryId)
				params.append('type',6)
				console.log(params)
				axios.post(_config.server+'/api/common/wechat/order',params).then(res=>{
					console.log(res)
					if(res.data.status==1){
						 orId = res.data.data.orderId;
						 wxUrl = res.data.data.url;
						 // alert('orId:'+orId+'---wxUrl:'+wxUrl)
						 // 吊起支付
						window.hcbWeb.openPayPage(orId,wxUrl)
						// 支付成功回调
						window.onPaySuccess=function(){
							alert('支付成功')
							axios.get(_config.server+'/api/game/package/detail?token='+token+'&orderId='+orId).then(function(res){
								console.log(res)
								if(res.data.status==1){
									data = res.data.data;
									haveBuy();

								}
							})
						}
						// window.onPayCancel=function(){
						// 	unlock();
						// }
					}
				})
			}else{
				toast(res.data.message);
			}
		})

	}
	// 关闭放大版
	$('.window').click(function(){
		// console.log($('.box'+idx).css('display'))
		$('.box'+idx).css({display:'block'})
		$('.window').stop();
		$('.window').fadeOut(500)
		$('.qrbig').empty();

	})










	// 点击立即开始
	$('.start').click(function(){
		console.log('点了')
		alert($('html').css('fontSize'))

		$('.introBox').fadeIn(500)
		$('.text').css({animation: 'change 0.5s 0.5s linear forwards'})
		$('.buy').css({animation: 'change 0.5s 0.5s linear forwards'})
	})
	// 立即购买
	// 点击立即购买
	$('.buy').click(function(){
		alert("购买")
		// alert("购买成功")
		getLottery();
	})
	$('.exit').click(function(){
		$('.ew').fadeIn(500)
	})
	$('.true').click(function(){
		$('.ew').fadeOut(500)
	})
	$('.false').click(function(){
		window.hcbWeb.close();
	})
	// go();
	// 点击翻牌
}













		
