import status from './status';
import user from './user';
import salas from './salas';
import salasHeader from './salasHeader';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  status,
  user,
  salas,
  salasHeader,
};
