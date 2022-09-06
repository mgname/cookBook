const state = {
	time: '',
	classification: '',
	publisher: ''
}

const mutations = {
	SET_TIME: (state, time) => {
		state.time = time
	},
	SET_CLASSIFICATION: (state, classification) => {
		state.classification = classification
	},
	SET_PUBLISHER: (state, publisher) => {
		state.publisher = publisher
	}
}

export default {
	namespaced: true,
	state,
	mutations
}