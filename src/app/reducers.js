import messages from "@common/messages/MessagesReducers";
import user from "@components/login/LoginReducers";
import salas from "@components/salas/salas_list//SalasListReducers";
import salasHeader from "@components/salas/salas_header/SalasHeaderReducers";
import salasInfo from "@components/salas_info/SalasInfoReducers";
import productos from "@components/salas_info/salas_info_detal_action/SalasInfoDetailActionReducers";

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case "persist/REHYDRATE":
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  messages,
  user,
  salas,
  salasHeader,
  salasInfo,
  productos
};
