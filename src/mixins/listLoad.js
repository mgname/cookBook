 import { mapMutations } from 'vuex'
/**
 * 列表分页加载逻辑
 */
export default {
	data() {
		return {
			current: 1,
			size: 10,
			isLoading: false,
			isLoadingDone: false,
			refreshing: false,
			listData: [],
			listLoadedHolderText: '',
			holderText: ''
		}
	},
	onLoad() {
		this.holderText = '加载中'
	},
	methods: {
		...mapMutations('classification', ['SET_TIME', 'SET_CLASSIFICATION', 'SET_PUBLISHER']),
		onrefresh() {
			if (this.refreshing) return
			this.SET_TIME('')
			this.SET_CLASSIFICATION('')
			this.SET_PUBLISHER('')
			this.getDataList(true)
			// 触发一次loadmore 然后再触发两次refresh 会出现无法再次触发loadmore的bug
			this.$refs['list'] && this.$refs['list'].resetLoadmore()
		},
		beforeRequest(isRefresh) {
			if (isRefresh) {
				this.refreshing = true
				this.current = 1
			} else {
				this.isLoading = true
			}
			this.holderText = '加载中'
		},
		afterRequest(res, isRefresh, dataOperateCallback = data => data) {
			if (res.data && res.data.code === 200) {
				if (res.data.data.length < res.data.size) {
					this.isLoadingDone = true
				} else {
					this.isLoadingDone = false
					this.current++
				}
				if (isRefresh) {
					this.listData = dataOperateCallback(res.data.data)
				} else {
					this.listData.push(...dataOperateCallback(res.data.data))
				}
				this.total = res.data.total.total
				this.isLoading = false
			} else {
				throw new Error()
			}
		},
		finally() {
			this.holderText = this.listLoadedHolderText
			this.isLoading = false
			this.refreshing = false
		}
	}
}
