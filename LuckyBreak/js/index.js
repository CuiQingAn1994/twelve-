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
	    			$(className).append('<div  style="width:'+size/len+'px;height:'+size/len+'px;background:#fff;float:left; class="bai"></div>')
	    		}else{
	    			$(className).append('<div  style="width:'+size/len+'px;height:'+size/len+'px;background:#000;float:left; class="hei"></div>')
	    		}		
	    	}
	    }
	    // size = 0;
	    // alert(size)
	}
	// 生成牌
	function add(){
		for(var j=1;j<=40;j++){
			$('.spage').append('<div class="box box'+j+'"><div class="back"></div><div class="front">正面'+j+'</div></div>');
			
		}	
	}
	// 发牌动画
	function deal(){
		for(var i=40;i>=1;i--){
			$($('.box'+i).delay(Math.abs(i*100)).animate({left:((i-1)%6*320)+'px',top:Math.floor((i-1)/6)*320+'px'},500));
		}
	}

	// 关闭放大版
	$('.window').click(function(){
		// console.log($('.box'+idx).css('display'))
		$('.box'+idx).css({display:'block'})
		$('.window').stop();
		$('.window').fadeOut(500)
		$('.big').empty();

	})
	function go(){
		add();
		deal();
	}









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
		alert("购买成功")
		haveBuy();
	})
	function haveBuy(){
		$('.dec,.star,.start').fadeOut(500);
		$('.introBox,.c4d,.b_paizi').fadeOut(1000);
		$('.a_paizi').delay(2000).css({transform:'scale(0.5,0.5)',transition:'1s'})

	}










	// go();
	// 点击翻牌
	$('.box').click(function(){
		var that = this;
		// console.log($.inArray($(this).index(),arr))
		if( $.inArray($(this).index(),arr)==-1){
			arr.push($(this).index())
			$('.box'+$(this).index()).css({transform:'rotateY(180deg)'})
			qrcode('35029236757690164040196938237',280,'.box'+$(this).index()+' .back');
			setTimeout(function(){
				$('.box'+$(that).index()).css({display:'none'})
				$('.window').fadeIn(500)
				idx = $(that).index();
				$('.box'+$(that).index()+' .front').css({display:'none'})
				qrcode('35029236757690164040196938237',600,'.big')
			},300)
		}else{
			$('.box'+$(this).index()).fadeOut(500)
			$('.window').fadeIn(500)
			idx = $(this).index();
			$('.box'+$(this).index()+' .front').css({display:'none'})
			qrcode('35029236757690164040196938237',600,'.big')
		}


	})

}













		
