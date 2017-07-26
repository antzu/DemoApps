import ActionTypes from './types';
import database from './database';

export function getInvite() {
  return dispatch => {
    dispatch(getInviteRequestedAction());
    return database.ref('/').once('value', snap => {
      const invite = snap.val();
      dispatch(getInviteFulfilledAction(invite))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getInviteRejectedAction());
    });
  }
}

function getInviteRequestedAction() {
  return {
    type: ActionTypes.GetInviteRequested
  };
}

function getInviteRejectedAction() {
  return {
    type: ActionTypes.GetInviteRejected
  }
}

function getInviteFulfilledAction(invite) {
  return {
    type: ActionTypes.GetInviteFulfilled,
    invite
  };
}



export function addToInvite(name) {
  return dispatch => {
    dispatch(addToInviteRequestedAction());
    const guestsRef = database.ref('/guests');
    guestsRef.push({
      name
    })
    .then(() => {
      dispatch(addToInviteFulfilledAction({ name }));
    })
    .catch((error) => {
      dispatch(addToInviteRejectedAction());
    });
  }
}

function addToInviteRequestedAction() {
  return {
    type: ActionTypes.AddToInviteRequested
  };
}

function addToInviteRejectedAction() {
  return {
    type: ActionTypes.AddToInviteRejected
  }
}

function addToInviteFulfilledAction(guest) {
  return {
    type: ActionTypes.AddToInviteFulfilled,
    guest
  };
}