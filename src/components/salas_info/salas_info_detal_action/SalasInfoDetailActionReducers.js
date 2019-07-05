export const initialState = {
  productos: [],
  modal: {
    isModalVisible: false
  },
  currentProduct: {}
};

export default function productos(state = initialState, action) {
  switch (action.type) {
    case "PRODUCTOS_LIST": {
      if (action.data) {
        return {
          ...state,
          productos: action.data
        };
      }
      return initialState;
    }
    case "SHOW_MODAL": {
      return {
        ...state,
        modal: {
          isModalVisible: action.isModalVisible
        }
      }
    }
    case "HIDE_MODAL": {
      return {
        ...state,
        modal: {
          isModalVisible: action.isModalVisible
        }
      }
    }
    case "SET_CURRENT_PRODUCT": {
      return {
        ...state,
        currentProduct: action.payload
      }
    }
    default:
      return initialState;
  }
}
