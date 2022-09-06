<template>
	<view :style="{ height: statusBarHeight }" class="uni-status-bar">
		<slot />
	</view>
</template>

<script>
const statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
export default {
	name: 'BStatusBar',
	data() {
		return {
			statusBarHeight: statusBarHeight
		}
	}
}
</script>

<style lang="scss" scoped>
	.uni-status-bar {
		// height: 20px;
		// width: 750rpx;
		// height: var(--status-bar-height);
	}
</style>
