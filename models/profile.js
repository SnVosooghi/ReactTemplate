import moment from 'moment';
import Api from '../lib/api';
import HandleErrorMessage from '../lib/format-error-messages';
import initialState from '../store/auth';
import Config from '../constants/config';
import { getFeaturedImageUrl } from '../lib/images';
import { ucfirst, stripHtml } from '../lib/string';
import { errorMessages, successMessages } from '../constants/messages';
import pagination from '../lib/pagination';

/**
 * Transform the endpoint data structure into our redux store format
 * @param {obj} item
 */
const transform = (item) => ({
  id: item.id || 0,
  name: item.title && item.title.rendered ? ucfirst(stripHtml(item.title.rendered)) : '',
  content: item.content && item.content.rendered ? stripHtml(item.content.rendered) : '',
  contentRaw: item.content && item.content.rendered,
  excerpt: item.excerpt && item.excerpt.rendered ? stripHtml(item.excerpt.rendered) : '',
  date: moment(item.date).format(Config.dateFormat) || '',
  slug: item.slug || null,
  link: item.link || null,
  image: getFeaturedImageUrl(item),
});

export default {
  namespace: 'profile',

  /**
   *  Initial state
   */
  state: initialState,

  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({
    /**


    /**
     * Get a single item from the API
     * @param {user}
     * @returns {Promise[obj]}
     */
    async getProfile() {

      try {
        const response = await Api.get(`/costumer/profile`);
        dispatch.profile.setUser (response.data.data)
        return {message:'ok'};
      } catch (error) {
          console.log(error)
          return error.erros;
      }
    },

    async login(credintials) {
      try {
        const response = await Api.post(`/costumer/auth/login`,credintials);
        console.log(response)
        dispatch.auth.setToken(response.data.data.token);
                console.log('putted')
        return {message:'ok'};
      } catch (error) {
          console.log(error)
          return {message: 'unauthorized'};
      }
    },

    async forgotPassword( email){
      try {
        const response = await Api.post(`/costumer/auth/forgotpassword`,credintials);
        return {message:'ok'};
      } catch (error) {
          return error.erros;
      }
    },

  }),

  /**
   * Reducers
   */
  reducers: {
    /**
     * Replace list in store
     * @param {obj} state
     * @param {obj} payload
     */
    replace(state, payload) {
      let newList = null;
      const { data, headers, page } = payload;

      // Loop data array, saving items in a usable format
      if (data && typeof data === 'object') {
        newList = data.map((item) => transform(item));
      }

      // Create our paginated and flat lists
      const listPaginated = page === 1 ? { [page]: newList } : { ...state.listPaginated, [page]: newList };
      const listFlat = Object.keys(listPaginated).map((k) => listPaginated[k]).flat() || [];

      return newList
        ? {
          ...state,
          listPaginated,
          listFlat,
          lastSync: page === 1
            ? { [page]: moment().format() }
            : { ...state.lastSync, [page]: moment().format() },
          meta: {
            page,
            lastPage: parseInt(headers['x-wp-totalpages'], 10) || null,
            total: parseInt(headers['x-wp-total'], 10) || null,
          },
          pagination: pagination(headers['x-wp-totalpages'], '/articles/'),
        }
        : initialState;
    },

    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceUserInput(state, payload) {
      return {
        ...state,
        userInput: payload,
      };
    },



    setUser (state, payload) {
      return {
        ...state,
        user:payload
      }
    }
  },
};




const createRegisterSchema = (inputs) => {
  return {
    "firstName": inputs.firstName,
    "lastName": inputs.lastname,
    "email": inputs.email,
    "password": inputs.password,
    "phone": inputs.phone,
    "address": {
      "country": "Canada",
      "province": "Ontario",
      "city": "Quebec",
      "addressLine1": inputs.addressline1,
      "addressLine2": inputs.addressline2,
      "postalCode": inputs.postalcode,
      "location": {
        "lat": 38.95682,
        "lon": 38.95682
      }
    }
  }
}
