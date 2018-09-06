<template>
	<section>
		<div v-title>二维码</div>
		<div id="qrcode">二维码位置</div>  
	</section>
</template>
<script type="text/javascript">
	import QRCode from 'qrcodejs2' ;
	export default{
		data(){
			return{
				url:""
			}
		},
		methods: { 
			query(){
				this.$http.post().then(res=>{
					this.url = 'asdhfsdhfkashfkjasdfak'
				})
			} ,
		    qrcode () {  
		      let qrcode = new QRCode('qrcode', {  
		        width: 300,  
		        height: 300, // 高度  
		        text: 'http://www.baidu.com', // 二维码内容  
		        render: 'table' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
		        // background: '#f0f'  
		        // foreground: '#ff0'  
		      })  
		      console.log(qrcode)  
		    }  
		 },
		mounted(){  
		   this.qrcode(); 
		} 
	} 

	
</script>
<style type="text/css" scoped>
	#qrcode{

	}
</style>