const sessionIdtoUser = new Map();

function addSessionIdtoUser(sessionId, user) {
  sessionIdtoUser.set(sessionId, user);
}

function getUserBySessionId(sessionId) {
  return sessionIdtoUser.get(sessionId);
}

function removeSessionId(sessionId) {
  sessionIdtoUser.delete(sessionId);
}

module.exports = {
  addSessionIdtoUser,
  getUserBySessionId,
  removeSessionId
};