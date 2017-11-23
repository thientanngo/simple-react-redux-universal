import { fetchOnClient } from 'Global/libraries';
import * as c from 'Layout/constants';

// export function getSuggestions(keyword = '') {
//   return dispatch => {
//     fetchOnClient({
//       url: '/search/suggestion',
//       method: 'get',
//       params: {
//         q: keyword
//       }
//     }).then(respone => {
//       dispatch({
//         type: c.LAYOUT_GET_SEARCH_SUGGESTIONS,
//         suggestions: respone.data
//       });
//     });
//   };
// }

// export function updateCurrentSearchCategory(catId = '') {
//   return dispatch => {
//     dispatch({
//       type: c.LAYOUT_UPDATE_CURRENT_SEARCH_CATEGORY,
//       catId
//     });
//   };
// }
