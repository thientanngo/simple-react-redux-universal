import axios from 'axios';

export function setTokensCookie(res, token) {
	const { accessToken, tokenType, expiresAt } = token;
	res.cookie('accessToken', accessToken, {
		signed: true,
		maxAge: expiresAt
	});
	res.cookie('tokenType', tokenType, {
		signed: true,
		maxAge: expiresAt
	});
}

export function fetchOnServer(url, token) {
	const { accessToken, tokenType } = token;
	const tokenName = tokenType === 'guest' ? 'x-guest-token' : 'x-access-token';
	const options = {
		url,
		method: 'GET',
		baseURL: __API_URL__,
		params: {
			apikey: __API_KEY__
		},
		headers: {
			[tokenName]: accessToken,
			'x-platform': __APPNAME__
		}
	};
	return axios(options);
}

export function fetchOnClient(options) {
	return axios({
		...options,
		baseURL: '/api/'
	});
}

export function fetchTokens() {
	return axios({
		url: '/tokens',
		method: 'post',
		baseURL: __API_URL__,
		data: {
			apikey: __API_KEY__,
			grant_type: 'guest'
		},
		headers: {
			'x-platform': __APPNAME__
		}
	});
}

function fetchByProxy(req, res, token) {
	const { accessToken, tokenType } = token;
	const tokenName = tokenType === 'guest' ? 'x-guest-token' : 'x-access-token';
	const options = {
		method: req.method,
		baseURL: __API_URL__,
		params: {
			...req.query,
			apikey: __API_KEY__
		},
		data: {
			...req.body
		},
		headers: {
			[tokenName]: accessToken,
			'x-platform': __APPNAME__
		}
	};

	if (req.url === '/account/login') {
		options.url = '/tokens';
		options.data.grant_type = 'password';
	} else if (req.url === '/account/login/facebook') {
		options.url = '/tokens';
		options.data.grant_type = 'facebook';
	} else {
		options.url = req.url;
	}

	axios(options).then(response => {
		const json = response.data;
		if (json.access_token && json.token_type) {
			setTokensCookie(res, {
				accessToken: json.access_token,
				tokenType: json.token_type,
				expiresAt: json.expires_at
			});
		}
		res.status(response.status).json(json);
	});
}

export default function getProxy(req, res) {
	const accessToken = req.signedCookies.accessToken;
	const tokenType = req.signedCookies.tokenType;

	if (!accessToken || !tokenType) {
		fetchTokens().then(response => {
			const json = response.data;
			setTokensCookie(res, {
				accessToken: json.access_token,
				tokenType: json.token_type,
				expiresAt: json.expires_at
			});
			fetchByProxy(req, res, {
				accessToken: json.guest_token,
				tokenType: json.token_type
			});
		});
	} else {
		fetchByProxy(req, res, {
			accessToken,
			tokenType
		});
	}
}
