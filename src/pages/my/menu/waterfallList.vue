<template>
	<view style="flex: 1;">
		<waterfall
			ref="list"
			:loadmoreoffset="30"
			:show-scrollbar="false"
			class="waterfall_wrapper"
			column-count="2"
			column-width="auto"
			column-gap="6"
			@loadmore="loadmore"
		>
			<refresh :display="refreshing ? 'show' : 'hide'" @refresh="onrefresh">
				<view class="loadmore">
					<text class="loadmore_text">刷新中...</text>
				</view>
			</refresh>
			<cell v-for="(item, index) in listData" :key="index">
				<menu-card :item="item" :is-my="true"></menu-card>
			</cell>
			<header>
				<text v-if="isLoadingDone" class="loading_done">加载完成</text>
				<view v-else class="loadmore">
					<text class="loadmore_text">加载中...</text>
				</view>
			</header>
		</waterfall>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import menuCard from "../../components/menu_card.vue"
import listLoad from '@/mixins/listLoad.js'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			status: ''
		}
	},
	props: {
		activeIndex: {
			type: Number,
			required: true
		}
	},
	computed: {
		...mapState('user', ['token', 'u_id'])
	},
	watch: {
		activeIndex: {
			handler(newValue, oldValue) {
				if (newValue === 0) {
					this.status = ''
				} else if (newValue === 1) {
					this.status = 1
				} else {
					this.status = 0
				}
				console.log(newValue, this.listData.length)
				// if (this.listData.length === 0) {
				this.getDataList(true)
				// }
			},
			immediate: true
		}
	},
	mixins: [listLoad],
	components: {
		menuCard
	},
	methods: {
		loadmore() {
			if (this.isLoadingDone) return
			this.getDataList()
		},
		async getDataList(isRefresh) {
			this.beforeRequest(isRefresh)
			const response = await uni.request({
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					'token': this.token
				},
				url: 'http://192.168.1.5:8080/menus/getAllMyMenusList',
				method: 'GET',
				data: {
					pageSize: this.size,
					pageIndex: this.current,
					status: this.status,
					id: this.u_id
				},
				success: (res) => {
					console.log(res)
					if (res.data.code === 200) {
						// console.log(res.data)
						this.afterRequest(res, isRefresh)
						console.log(this.listData)
					} else {
						return this.$refs.uToast.show({
							type: 'default',
							message: "没有此菜谱"
						})
					}
				},
				fail(err) {
					return this.$refs.uToast.show({
						type: 'error',
						message: "请求接口失败"
					})
				},
				complete: () => {
					this.finally()
				}
			})
		}
	}
}
</script>

<style>
</style>