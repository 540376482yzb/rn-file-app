// import { LOGINSUCCESS, LOGOUTSUCCESS } from '../actions/auth.action'
// import constants from '../constant/constant'

const initialState = {

}

export default (state = initialState, action) => {
  switch (action.type) {
    // case constants.LOAD_BOT_NUMS:
    //   return { ...state, ...action.payload }
    // case LOGINSUCCESS:
    //   return { login: true, error: null }
    // case LOGOUTSUCCESS:
    //   return { login: false, error: null }
    default:
      return state
  }
};