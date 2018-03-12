import messages from "@common/messages/MessagesReducers";
import user from "@components/login/LoginReducers";
import salas from "@components/salas/salas_list//SalasListReducers";
import salasHeader from "@components/salas/salas_header/SalasHeaderReducers";

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
  salasHeader
};
