<template>
	<view class="card_wrapper" @click="handleNavigation">
		<image v-if="!item.m_pic" class="food_img" src="@/static/imgs/food_card.png" mode="aspectFit"></image>
		<image v-else :src="'http://192.168.1.5:8080/static/' + item.m_pic" mode="aspectFill" class="food_img"></image>
		<view class="menu" @click="toggleCollection">
			<text class="menu_title">{{ item.m_title }}</text>
			<view class="message" v-if="!isMy">
				<view class="message_left">
					<image class="message_avatar" src="@/static/imgs/avatar.png" mode="aspectFit"></image>
					<text class="message_name">{{ item.u_nick }}</text>
				</view>
				<u-icon name="star-fill" :color="isCollection ? '#FFCD38' : '#C4C4C4'" size="24"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data() {
		return {
			isCollection: false
		}
	},
	props: {
		isMy: {
			type: Boolean,
			default: false
		},
		item: {
			type: Object,
			required: true
		}
	},
	computed: {
		...mapState('user', ['u_id'])
	},
	methods: {
		handleNavigation() {
			// console.log(this.item)
			uni.navigateTo({
				url: '/pages/menu/detail/index?id=' + this.item.m_id
			});
		},
		toggleCollection(e) {
			e.stopPropagation()
			if (this.isCollection) {
				this.cancelCollection()
			} else {
				this.addCollection()
			}
		},
		async getCollection() {
			const response = await uni.request({
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				url: 'http://192.168.1.5:8080/collection/isCollection',
				method: 'GET',
				data: {
					uId: this.u_id,
					mId: this.item.m_id
				},
				success: (res) => {
					if (res.data.code === 200) {
						this.isCollection = true
					} else {
						this.isCollection = false
					}
				},
				fail(err) {
					return uni.showToast({
						title: '请求接口失败'
					})
				}
			})
		},
		async cancelCollection() {
			const response = await uni.request({
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				url: 'http://192.168.1.5:8080/collection/cancelCollection',
				method: 'GET',
				data: {
					uId: this.u_id,
					mId: this.item.m_id
				},
				success: (res) => {
					console.log(res)
					if (res.data.code === 200) {
						this.isCollection = false
					}
				},
				fail(err) {
					return uni.showToast({
						title: '请求接口失败'
					})
				}
			})
		},
		async addCollection() {
			const response = await uni.request({
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				url: 'http://192.168.1.5:8080/collection/addCollection',
				method: 'GET',
				data: {
					uId: this.u_id,
					mId: this.item.m_id
				},
				success: (res) => {
					console.log(res)
					if (res.data.code === 200) {
						this.isCollection = true
					}
				},
				fail(err) {
					return uni.showToast({
						title: '请求接口失败'
					})
				}
			})
		}
	},
	mounted() {
		this.getCollection()
	}
}
</script>

<style lang="scss" scoped>
.card_wrapper {
	background-color: #F3F3F3;
	border-radius: 36rpx;
	width: 330rpx;
	margin-bottom: 12rpx;
}
.food_img {
	// width: 330rpx;
	height: 252rpx;
	border-radius: 36rpx 36rpx 0px 0px;
}
.menu {
	padding: 10 22rpx 16rpx;
	&_title {
		font-weight: 600;
		font-size: 36rpx;
		line-height: 42rpx;
		color: #4A4A4A;
		margin-bottom: 18rpx;
	}
}
.message {
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	// background-color: pink;
	&_left {
		flex-direction: row;
		align-items: center;
	}
	&_avatar {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}
	&_name {
		font-size: 30rpx;
		color: #4A4A4A;
		// background-color: blue;
	}
	&_right {
		width: 38rpx;
		height: 40rpx;
	}
}
</style>
