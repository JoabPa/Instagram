import { firebase, FieldValue } from '../lib/firebase';

const doesUsernameExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
};

const getUserByUserId = async (userId) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
};

const getSuggestedProfiles = async (userId, following) => {
  let query = firebase.firestore().collection('users');

  if (following.length > 0) {
    query = query.where('userId', 'not-in', [...following, userId]);
  } else {
    query = query.where('userId', '!=', userId);
  }
  const result = await query.limit(10).get();

  const profiles = result.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }));

  return profiles;
};

const updateLoggedInUserFollowing = async (
  loggedInUserDocId, // currently logged in user document id (joab's profile)
  profileId, // the user that joab requests to follow
  isFollowingProfile // true/false (am i currently following this person?)
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
};

const updateFollowedUserFollowers = async (
  profileDocId, // currently logged in user document id (joab's profile)
  loggedInUserDocId, // the user that joab requests to follow
  isFollowingProfile // true/false (am i currently following this person?)
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
};

export {
  doesUsernameExist,
  getUserByUserId,
  getSuggestedProfiles,
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
};
