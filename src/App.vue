<script>
	export default {
		globalData: {
			hasToIsAuthPage: false
		},
		onLaunch: function() {
			console.log('App Launch')
			plus.screen.lockOrientation('portrait-primary') // 禁止橫屏
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
/* @import url("./static/fonts/family.css"); */
@import "uview-ui/index.scss";
@import url("@/static/iconfont/iconfont.css");
@font-face {
  font-family: 'iconfont';  /* project id 3286157 */
  src: url('https://at.alicdn.com/t/font_3286157_ohf49kq7uco.ttf?t=1648534856292') format('truetype');
}
</style>

<style lang="scss">
	.isAuth {
		flex: 1;
		background-color: #ffffff;
	}
	// 加载更多文字
	.loadmore {
		width: 670rpx;
		// background-color: #ffffff;
		align-items: center;
		justify-content: center;
		text-align: center;
		flex-direction: row;
		height: 60rpx;
		&_text {
			font-size: 26rpx;
			line-height: 26rpx;
			color: #999;
		}
	}
	
	// 加载完毕文字
	.loading_done {
		width: 670rpx;
		text-align: center;
		font-size: 26rpx;
		line-height: 24rpx;
		color: rgba(153, 153, 153, 0.6);
		margin: 16rpx 0;
	}
</style>

