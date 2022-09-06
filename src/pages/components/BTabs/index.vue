<template>
	<view class="tab_item_list" :style="`just-content:${justContent}`">
		<view
			v-for="(item, index) in tabs"
			ref="active"
			:key="index"
			class="tab_item_wrapper"
			@click="handleItemClick(item, index)"
		>
			<text
				:style="index === current ? activeStyle : normalStyle"
				:class="['tab_item', index === current ? 'tab_item_active' : '']"
			>{{ item.label }}</text>
		</view>
		<view :class="['underline', underlineClassName]" :style="underlineStyle" />
	</view>
</template>

<script>
const dom = uni.requireNativePlugin('dom')
export default {
	props: {
		tabs: { // tabs數組
			type: Array,
			required: true
		},
		current: { // 當前激活索引
			type: Number,
			required: true
		},
		leftSpacing: { // tabs距離左邊距離，用於計算
			type: [String, Number],
			default: 32
		},
		justContent: { // 文字排列佈局方式
			type: String,
			default: 'space-between'
		},
		activeStyle: { // 激活文字樣式
			type: String,
			default: ''
		},
		normalStyle: { // 激活文字樣式
			type: String,
			default: ''
		}
	},
	data() {
		return {
			left: '',
			width: 0,
			underlineClassName: ''
		}
	},
	computed: {
		underlineStyle() {
			const left = Math.max(this.left, uni.upx2px(32))
			return `width:${this.width}px;transform:translateX(${left}px);`
		}
	},
	watch: {
		current(val) {
			this.setStyle(val)
		}
	},
	mounted() {
		this.setStyle(0)
	},
	methods: {
		setStyle(index) {
			this.$nextTick(() => {
				setTimeout(() => { // 修復字體激活狀態和普通狀態寬度不一致可能算不准的bug
					dom.getComponentRect(this.$refs.active[index], (res) => {
						console.log(res.size.left)
						this.left = res.size.left
						this.width = res.size.width
						!this.underlineClassName.length && (this.underlineClassName = 'underline_animation')
					})
				}, 20)
			})
		},
		handleItemClick(item, index) {
			if (this.current !== index) {
				this.$emit('change', item)
			}
			this.$emit('update:current', index)
		}
	}
}
</script>

<style lang="scss" scoped>
.tab_item_list {
	flex-direction: row;
	position: relative;
}
.tab_item_wrapper {
	padding: 4rpx 0 8rpx 0;
	// background-color: pink;
}
.tab_item {
	font-size: 24rpx;
	line-height: 60rpx;
	color: #C4C4C4;
	&_active {
		font-weight: bold;
		color: #FFCD38;
	}
}
.underline {
	position: absolute;
	left: 0;
	bottom: 0;
	background-color: #FFCD38;
	height: 6rpx;
	border-radius: 6rpx;
	width: 0;
	&_animation {
		transition-property: width, transform;
		transition-duration:0.3s;
		transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1.0);
	}
}
</style>
