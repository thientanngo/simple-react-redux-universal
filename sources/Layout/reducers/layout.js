import * as c from 'Layout/constants';
import {
	filterCategoryList,
	filterSearchCategoryList
} from 'Layout/actions/helpers';

const initState = {
	showNavigation: false,
	showSearchContent: false,
	isSimpleLayout: false,
	categories: [],
	searchCategory: [],
	me: {},
	suggestions: {},
	isClientRendered: false,
	showHeaderOverlay: false,
	showCategoryList: false,
	showSuggestionContent: false,

	bannerBook: null,
	bannerDigitalAccessories: null
};

function getBanner(action = {}) {
	const resData = action.res.data;
	let data;
	let banner;

	if (resData) {
		data = resData.data;
	}

	if (data && data.length > 0) {
		banner = data[0];
	}

	return banner;
}

export default function layout(state = initState, action) {
	switch (action.type) {
		case c.LAYOUT_FETCH_NAVIGATION_CATEGORIES: {
			const categoryList = filterCategoryList(action.res.data.data);
			const searchCategory = filterSearchCategoryList(action.res.data.data);

			return {
				...state,
				categories: categoryList,
				searchCategory
			};
		}

		case c.LAYOUT_FETCH_CUSTOMER_INFO:
			return { ...state, me: action.res.data };

		case c.LAYOUT_FETCH_BOOK_BANNER: {
			const banner = getBanner(action);

			return {
				...state,
				bannerBook: banner
			};
		}

		case c.LAYOUT_FETCH_DIGITAL_ACCESSORIES_BANNER: {
			const banner = getBanner(action);

			return {
				...state,
				bannerDigitalAccessories: banner
			};
		}

		case c.LAYOUT_GET_SEARCH_SUGGESTIONS: {
			// Check suggesstions
			const categoryies = action.suggestions.categoryies || [];
			const products = action.suggestions.products || [];
			const keywords = action.suggestions.keywords || [];

			let isEmpty = true;
			if (
				categoryies.length > 0 ||
				products.length > 0 ||
				keywords.length > 0
			) {
				isEmpty = false;
			}

			// console.log('isEmpty', isEmpty);

			return {
				...state,
				showHeaderOverlay: !isEmpty,
				showSuggestionContent: !isEmpty,
				suggestions: action.suggestions
			};
		}

		case c.LAYOUT_TOGGLE_NAVIGATION:
			return { ...state, showNavigation: action.showNavigation };

		case c.LAYOUT_TOGGLE_SEARCH_CONTENT:
			return { ...state, showSearchContent: action.showSearchContent };

		case c.LAYOUT_SET_SIMPLE_LAYOUT:
			return { ...state, isSimpleLayout: action.isSimpleLayout };

		case c.LAYOUT_SET_CLIENT_RENDERED:
			return { ...state, isClientRendered: action.isClientRendered };

		case c.LAYOUT_UPDATE_CURRENT_SEARCH_CATEGORY:
			return { ...state, currentSearchCategory: action.catId };

		case c.LAYOUT_HIDE_HEADER_OVERLAY:
			// Hide Header overlay, it also hide suggesstion content
			return {
				...state,
				showSuggestionContent: false,
				showHeaderOverlay: false,
				showCategoryList: false
			};
		case c.LAYOUT_SHOW_HEADER_OVERLAY:
			return { ...state, showHeaderOverlay: true };

		case c.LAYOUT_SHOW_CATEGORY_LIST:
			return {
				...state,
				showHeaderOverlay: true,
				showCategoryList: true
			};

		// NEW
		case c.LAYOUT_CHANGE_PAGE_TITLE: {
			return {
				...state,
				title: action.title
			};
		}

		default:
			return state;
	}
}
