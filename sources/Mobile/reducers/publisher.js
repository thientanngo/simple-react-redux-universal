import * as c from '../constants';

const initState = {
	publisherInfo: {},
	isFetchingPublisherInfo: true,
	isFetchingPublisherInfoSuccess: false
};

export default function publisher(state = initState, action) {
	switch (action.type) {
		case c.SHOPPING_UPDATE_PUBLISHER_INFO:
			return {
				...state,
				publisherInfo: action.publisherInfo
			};

		case c.SHOPPING_GET_PUBLISHER_INFO_REQUESTING:
			return {
				...state,
				isFetchingPublisherInfo: true
			};

		case c.SHOPPING_GET_PUBLISHER_INFO_ERROR:
			return {
				...state,
				isFetchingPublisherInfo: false
			};

		case c.SHOPPING_GET_PUBLISHER_INFO_SUCCESS:
			return {
				...state,
				isFetchingPublisherInfo: false,
				isFetchingPublisherInfoSuccess: true
			};
		case c.SHOPPING_FETCH_PUBLISHER_INFO: {
			const { data } = action.res.data;
			let publisherInfo = {};

			if (data && data.length === 1) {
				publisherInfo = data[0];
			}

			return {
				...state,
				publisherInfo
			};
		}
		default:
			return state;
	}
}
