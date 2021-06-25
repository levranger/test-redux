const initialState = {
  images: [],
  selectedImage: null,
  isModalActive: false,
  modalPhoto: null,
};

function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'UPLOAD_IMAGES':

      return {
        ...state, images: payload,
      };

    case 'TOGGLE_MODAL':
      return {
        ...state, isModalActive: !state.isModalActive,
      };
    case 'SELECT_IMAGE':
      return {
        ...state,
        selectedImage: payload,
      };
    case 'RESET_MODAL_PHOTO':
      return {
        ...state,
        modalPhoto: null,
      };
    case 'GET_MODAL_PHOTO':
      return {
        ...state, modalPhoto: payload,
      };
    default:
      return state;
  }
}

export default appReducer;
