import * as c from 'Layout/constants';

export function setClientRendered(isClientRendered = true) {
	return {
		type: c.LAYOUT_SET_CLIENT_RENDERED,
		isClientRendered
	};
}
