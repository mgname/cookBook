<template>
	<view class="option_content">
		<view
			v-for="item in options"
			:key="item.id"
			:class="['option_item', isActive(item.id) ? 'option_item_active' : '']"
			@click="handleOptionClick(item)"
		>
			<text :class="['option_item_text', , isActive(item.id) ? 'option_item_text_active' : '']">{{ item.label }}</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		options: {
			type: Array,
			required: true
		},
		data: {
			type: [Array, String, Number],
			default: ''
		}
	},
	methods: {
		isActive(id) {
			return this.data === id
		},
		handleOptionClick(item) {
			if (item.id === this.data) {
				this.$emit('update:data', '')
			} else {
				this.$emit('update:data', item.id)
			}
		}
	}
}
</script>

<style scoped lang="scss">
.option {
	&_content {
		flex-direction: row;
		flex-wrap: wrap;
	}
	&_item {
		height: 74rpx;
		justify-content: center;
		padding: 0 50rpx;
		border-radius: 10rpx;
		background: #F3F3F3;
		margin: 0 24rpx 28rpx 0;
		&_active {
			background-color: #FCF8ED;
		}
		&_text {
			font-size: 28rpx;
			color: #4A4A4A;
			&_active {
				color: #FFCD38;
			}
		}
	}
}
</style>
