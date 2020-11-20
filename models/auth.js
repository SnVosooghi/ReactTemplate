import moment from 'moment';
import Api from '../lib/api';
import initialState from '../store/auth';
import Config from '../constants/config';
import { getFeaturedImageUrl } from '../lib/images';
import { ucfirst, stripHtml } from '../lib/string';
import { setCookie } from '../lib/cookies'

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
  namespace: 'auth',

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
    async register(inputs) {

      const user=createRegisterSchema( inputs)

      console.log("user is")
      console.log(user);

      try {

        const response = await Api.post(`/costumer/auth/register`,user);
        dispatch.auth.setToken(response.data.data.token);
        return {message:'ok'};
      } catch (error) {
          dispatch.auth.setError(error.errors)
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

    async googleLogin() {
      try {
        const response = await Api.get(`/costumer/auth/google`);
        console.log(response)
        dispatch.auth.setToken(response.data.data.token);
                console.log('putted')
        return {message:'ok'};
      } catch (error) {
          console.log(error)
          return {message: 'unauthorized'};
      }
    },

    async facebookLogin() {
      try {
        const response = await Api.get(`/costumer/auth/facebook`);
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

    async additionalData ( info) {
      try {
        const response = await Api.put(`/costumer/profile`,info);
        console.log(response)
        return {message:'ok'};
      } catch (error) {
          console.log(error)
          return error.erros;
      }
    },

    async fileUpload (file) {
      const formData = new FormData();
      formData.append('photo',file)
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }

      try {
        const response = await Api.post(`/files/photos`, formData, config);
        console.log(response);
        dispatch.auth.setImageUrl(response.data.data.path);
        return {message:'ok'};
      } catch (error) {
          console.log(error)
          return error.erros;
      }

  }

  }),

  /**
   * Reducers
   */
  reducers: {

    setToken (state, payload) {
      localStorage.setItem("token", payload);
      setCookie( 'Auth:Token', payload, 100);
      return {
        ...state,
        token:payload
      }
    },

    setImageUrl (state, payload) {
      return {
        ...state,
        imageUri:payload
      }
    },

    setError ( state, payload) {
      return {
        ...state,
        error:payload
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
      "province": inputs.state,
      "city": inputs.city,
      "addressLine1": inputs.addressline1,
      "addressLine2": inputs.addressline1,
      "postalCode": inputs.postalcode,
      "location": {
        "lat": 38.95682,
        "lon": 38.95682
      }
    }
  }
}
