import { useState, useEffect, useCallback } from 'react';
import firebase from '../lib/firebase';
import { CATEGORY_LOCATIONS, CAMPUS_HOURS, getMinutesFromMidnight, parseEventDateTime } from '../utils/scheduleHelpers';
import Toasts from '../components/shared/Toasts';
import ActionConfirmModal from '../components/shared/ActionConfirmModal';
import StudentHeaderNav from '../components/student/StudentHeaderNav';
import StudentDashboardView from '../components/student/StudentDashboardView';
import StudentProfileView from '../components/student/StudentProfileView';
import StudentChangePasswordModal from '../components/student/StudentChangePasswordModal';
import CreatePostModal from '../components/student/CreatePostModal';
import PostDetailModal from '../components/student/PostDetailModal';
import NotificationsModal from '../components/student/NotificationsModal';
import ChatModal from '../components/student/ChatModal';

// AUTH GUARD
const user = JSON.parse(localStorage.getItem('ing_user') || 'null');
const userType = localStorage.getItem('ing_user_type');
if (!user || userType !== 'student') {
  window.location.href = 'student-login.html';
}

export default function StudentDashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showPostModal, setShowPostModal] = useState(false);

  const [newPost, setNewPost] = useState({
    category: 'sport',
    title: '',
    location: CATEGORY_LOCATIONS.sport[0].value,
    customLocation: '',
    date: '',
    startHour: '07',
    startMinute: '00',
    startAmPm: 'AM',
    endHour: '08',
    endMinute: '00',
    endAmPm: 'AM',
    spots: 4,
    description: '',
  });

  const [showActivityDetail, setShowActivityDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [showChatModal, setShowChatModal] = useState(false);
  const [chatPartner, setChatPartner] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatThreads, setChatThreads] = useState({});
  const [usersList, setUsersList] = useState({});
  const [confirmDeleteChat, setConfirmDeleteChat] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...user });
  const [imagePreview, setImagePreview] = useState(user?.profileImage || null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const [selectedChatId, setSelectedChatId] = useState(null);
  const [unreadDMs, setUnreadDMs] = useState(0);
  const [postError, setPostError] = useState('');
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((title, message, icon) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, title, message, icon }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const getMyId = () => (user && (user.id || user.uid)) || (firebase.auth().currentUser && firebase.auth().currentUser.uid) || '';

  const handleStartHourChange = (hour) => {
    const hourObj = CAMPUS_HOURS.find((h) => h.hour === hour);
    const autoAmPm = hourObj ? hourObj.ampm : ['01', '02', '03', '04', '05', '06', '12'].includes(hour) ? 'PM' : 'AM';
    const currentIndex = CAMPUS_HOURS.findIndex((h) => h.hour === hour);
    const nextHourObj = CAMPUS_HOURS[Math.min(currentIndex + 1, CAMPUS_HOURS.length - 1)];

    setNewPost((prev) => ({
      ...prev,
      startHour: hour,
      startAmPm: autoAmPm,
      endHour: nextHourObj ? nextHourObj.hour : hour,
      endAmPm: nextHourObj ? nextHourObj.ampm : autoAmPm,
    }));
  };

  const handleEndHourChange = (hour) => {
    const hourObj = CAMPUS_HOURS.find((h) => h.hour === hour);
    const autoAmPm = hourObj ? hourObj.ampm : ['01', '02', '03', '04', '05', '06', '12'].includes(hour) ? 'PM' : 'AM';
    setNewPost((prev) => ({ ...prev, endHour: hour, endAmPm: autoAmPm }));
  };

  const handleCategoryChange = (cat) => {
    const defaultLocObj = CATEGORY_LOCATIONS[cat] ? CATEGORY_LOCATIONS[cat][0] : null;
    setNewPost((prev) => ({
      ...prev,
      category: cat,
      location: defaultLocObj ? defaultLocObj.value : '',
      customLocation: '',
    }));
  };

  // Subscribe to Activities
  useEffect(() => {
    const activitiesRef = firebase.database().ref('activities');
    activitiesRef.on('value', (snapshot) => {
      const data = snapshot.val() || {};
      const items = Object.values(data)
        .map((item) => ({ ...item, joined: Array.isArray(item.joined) ? item.joined : [] }))
        .sort((a, b) => b.createdAt - a.createdAt);
      setActivities(items);
    });
    return () => activitiesRef.off();
  }, []);

  // Subscribe to Users List
  useEffect(() => {
    const usersRef = firebase.database().ref('users');
    usersRef.on('value', (snapshot) => setUsersList(snapshot.val() || {}));
    return () => usersRef.off();
  }, []);

  // Subscribe to Chats
  useEffect(() => {
    const chatsRef = firebase.database().ref('chats');
    chatsRef.on('value', (snapshot) => {
      const data = snapshot.val() || {};
      const threads = {};
      Object.entries(data).forEach(([key, msgsObj]) => {
        if (msgsObj && typeof msgsObj === 'object') {
          const msgList = Object.entries(msgsObj)
            .map(([mId, msgVal]) => ({ msgId: mId, ...msgVal }))
            .sort((a, b) => a.at - b.at);
          threads[key] = msgList;
        }
      });
      setChatThreads(threads);
    });
    return () => chatsRef.off();
  }, []);

  // Subscribe to Notifications - NEWEST FIRST
  useEffect(() => {
    const myId = getMyId();
    if (!myId) return;
    const notifRef = firebase.database().ref('notifications');
    notifRef.on('value', (snapshot) => {
      const data = snapshot.val() || {};
      const items = Object.values(data)
        .filter((n) => n.userId === myId)
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setNotifications(items);
    });
    return () => notifRef.off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const unread = notifications.filter((n) => !n.read).length;
    setUnreadNotifications(unread);
  }, [notifications]);

  useEffect(() => {
    let count = 0;
    const myId = getMyId();
    if (!myId) return;

    Object.keys(chatThreads).forEach((key) => {
      if (key.includes(myId)) {
        const thread = chatThreads[key];
        const lastMsg = thread[thread.length - 1];
        if (lastMsg && lastMsg.from !== myId) count++;
      }
    });
    setUnreadDMs(count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatThreads, user]);

  const filteredActivities = activities.filter((item) => (filter === 'all' ? true : item.category === filter));

  const getAvatarColor = (name) => {
    const safeName = name || 'Unknown';
    const colors = ['avatar-blue', 'avatar-gold', 'avatar-green', 'avatar-purple', 'avatar-pink', 'avatar-orange', 'avatar-red', 'avatar-teal'];
    let hash = 0;
    for (let i = 0; i < safeName.length; i++) {
      hash = safeName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const addPost = () => {
    setPostError('');

    const startMins = getMinutesFromMidnight(newPost.startHour, newPost.startMinute, newPost.startAmPm);
    const endMins = getMinutesFromMidnight(newPost.endHour, newPost.endMinute, newPost.endAmPm);

    if (endMins <= startMins) {
      setPostError('End time must be later than start time (e.g., 02:00 PM to 04:00 PM)');
      return;
    }

    const startTime = `${newPost.startHour}:${newPost.startMinute} ${newPost.startAmPm}`;
    const endTime = `${newPost.endHour}:${newPost.endMinute} ${newPost.endAmPm}`;

    const finalLocation = newPost.location === 'Custom / Other Location...' ? newPost.customLocation.trim() : newPost.location;

    if (!newPost.title || !finalLocation || !newPost.date) {
      setPostError('Please fill in all required fields (title, location, date)');
      return;
    }

    const myId = getMyId();
    if (!myId) {
      setPostError('You are not signed in properly. Please log out and sign in again.');
      return;
    }

    const postId = 'p_' + Date.now();
    const post = {
      id: postId,
      category: newPost.category,
      title: newPost.title,
      location: finalLocation,
      description: newPost.description,
      date: newPost.date,
      startTime,
      endTime,
      spots: newPost.spots,
      posterId: myId,
      posterName: user.name,
      joined: [{ id: myId, name: user.name }],
      createdAt: Date.now(),
    };

    firebase
      .database()
      .ref('activities/' + postId)
      .set(post)
      .then(() => {
        setShowPostModal(false);
        pushToast('Activity Created', `"${post.title}" is now live!`, 'fa-calendar-check');
        setNewPost({
          category: 'sport',
          title: '',
          location: CATEGORY_LOCATIONS.sport[0].value,
          customLocation: '',
          date: '',
          startHour: '07',
          startMinute: '00',
          startAmPm: 'AM',
          endHour: '08',
          endMinute: '00',
          endAmPm: 'AM',
          spots: 4,
          description: '',
        });

        firebase
          .database()
          .ref('users')
          .once('value')
          .then((snapshot) => {
            const data = snapshot.val() || {};
            Object.entries(data).forEach(([uid, u]) => {
              if (uid !== myId) {
                const notifId = 'n_' + Date.now() + '_' + Math.random().toString(36).slice(2);
                const notif = {
                  id: notifId,
                  userId: uid,
                  postId,
                  type: 'new_activity',
                  message: `📢 New Activity: "${post.title}". Tap to view.`,
                  read: false,
                  createdAt: Date.now(),
                };
                firebase.database().ref('notifications/' + notifId).set(notif);
              }
            });
          });
      })
      .catch((err) => {
        console.error('Failed to post activity:', err);
        setPostError('Failed to post activity: ' + err.message);
      });
  };

  const sendMessage = (otherId, text) => {
    const messageText = (text || '').trim();
    if (!messageText || !otherId) return;

    const myId = getMyId();
    if (!myId) {
      alert('Unable to identify your user ID. Please sign out and log back in.');
      return;
    }

    const threadKey = [myId, otherId].sort().join('|');
    const msgId = 'm_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    const newMsg = { from: myId, text: messageText, at: Date.now() };

    setChatMessage('');

    setChatThreads((prevThreads) => {
      const currentList = prevThreads[threadKey] || [];
      return { ...prevThreads, [threadKey]: [...currentList, { msgId, ...newMsg }] };
    });

    firebase
      .database()
      .ref(`chats/${threadKey}/${msgId}`)
      .set(newMsg)
      .catch((err) => {
        console.error('Direct message send failed:', err);
        alert('Message could not be sent: ' + err.message);
      });
  };

  const unsendMessage = (threadKey, msgId) => {
    if (confirm('Unsend this message?')) {
      setChatThreads((prev) => {
        const list = prev[threadKey] || [];
        return { ...prev, [threadKey]: list.filter((m) => m.msgId !== msgId) };
      });

      firebase
        .database()
        .ref(`chats/${threadKey}/${msgId}`)
        .remove()
        .then(() => pushToast('Message Unsent', null, 'fa-trash-can'))
        .catch((err) => alert('Failed to unsend: ' + err.message));
    }
  };

  const deleteConversation = (otherId) => {
    const myId = getMyId();
    if (!myId || !otherId) return;

    const primaryKey = [myId, otherId].sort().join('|');

    setChatThreads((prev) => {
      const next = { ...prev };
      delete next[primaryKey];
      Object.keys(next).forEach((k) => {
        if (k.includes(myId) && k.includes(otherId)) delete next[k];
      });
      return next;
    });

    setConfirmDeleteChat(null);
    setChatPartner(null);
    setSelectedChatId(null);
    pushToast('Conversation Deleted', 'The chat history has been removed.', 'fa-trash-can');

    firebase
      .database()
      .ref(`chats/${primaryKey}`)
      .remove()
      .catch((err) => console.error('Firebase chat remove error:', err));

    firebase
      .database()
      .ref('chats')
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val() || {};
        Object.keys(data).forEach((k) => {
          if (k.includes(myId) && k.includes(otherId)) {
            firebase.database().ref(`chats/${k}`).remove().catch(() => {});
          }
        });
      });
  };

  const openChat = (otherId, otherName) => {
    setChatPartner({ id: otherId, name: otherName || 'Unknown User' });
    setSelectedChatId(otherId);
    setShowChatModal(true);
  };

  const getUserChats = () => {
    const list = [];
    const myId = getMyId();
    if (!myId) return list;

    Object.keys(chatThreads).forEach((key) => {
      if (key.includes(myId)) {
        const ids = key.split('|');
        const otherId = ids[0] === myId ? ids[1] : ids[0];
        const thread = chatThreads[key];
        if (thread && thread.length > 0) {
          const lastMsg = thread[thread.length - 1];
          const otherUser = usersList[otherId];
          const otherName = otherUser && otherUser.name ? otherUser.name : 'Unknown User';

          list.push({ key, otherId, otherName, lastMsg, isUnread: lastMsg && lastMsg.from !== myId, updatedAt: lastMsg ? lastMsg.at : 0 });
        }
      }
    });
    return list.sort((a, b) => b.updatedAt - a.updatedAt);
  };

  const joinPost = (postId) => {
    const index = activities.findIndex((p) => p.id === postId);
    if (index === -1) return;

    const item = activities[index];
    const joinedList = Array.isArray(item.joined) ? item.joined : [];
    const myId = getMyId();

    if (joinedList.some((j) => j.id === myId)) {
      alert('You have already joined this activity.');
      return;
    }

    if (joinedList.length >= item.spots) {
      alert('This activity is full.');
      return;
    }

    const updatedJoined = [...joinedList, { id: myId, name: user.name }];

    firebase
      .database()
      .ref('activities/' + postId + '/joined')
      .set(updatedJoined)
      .then(() => pushToast('Activity Joined!', `You joined "${item.title}"`, 'fa-circle-check'))
      .catch((err) => console.error(err));
  };

  const cancelJoinPost = (postId) => {
    const item = activities.find((p) => p.id === postId);
    if (!item) return;

    const joinedList = Array.isArray(item.joined) ? item.joined : [];
    const myId = getMyId();
    const updatedJoined = joinedList.filter((j) => j.id !== myId);

    firebase
      .database()
      .ref('activities/' + postId + '/joined')
      .set(updatedJoined)
      .then(() => pushToast('Cancelled', 'You left the activity.', 'fa-info-circle'))
      .catch((err) => console.error(err));
  };

  const handleChangePassword = () => {
    if (passwordData.new.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      setPasswordError('New passwords do not match.');
      return;
    }

    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      currentUser
        .updatePassword(passwordData.new)
        .then(() => {
          setPasswordSuccess('Password updated successfully in Firebase!');
          setPasswordError('');
          setPasswordData({ current: '', new: '', confirm: '' });
          setTimeout(() => setShowChangePassword(false), 2000);
        })
        .catch((err) => setPasswordError(err.message));
    }
  };

  const updateProfile = () => {
    const myId = getMyId();
    firebase
      .database()
      .ref('users/' + myId)
      .update({
        name: editForm.name,
        phone: editForm.phone || '',
        address: editForm.address || '',
        course: editForm.course || '',
        semester: editForm.semester || '',
        profileImage: editForm.profileImage || null,
      })
      .then(() => {
        const updatedUser = { ...user, ...editForm };
        localStorage.setItem('ing_user', JSON.stringify(updatedUser));
        pushToast('Profile Updated', 'Your profile details were saved.', 'fa-user-check');
        setIsEditing(false);
      })
      .catch((err) => alert('Error updating profile: ' + err.message));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setEditForm({ ...editForm, profileImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setEditForm({ ...editForm, profileImage: null });
  };

  const markNotificationRead = (id) => {
    firebase.database().ref('notifications/' + id + '/read').set(true);
  };

  const markAllNotificationsRead = () => {
    notifications.filter((n) => !n.read).forEach((n) => firebase.database().ref('notifications/' + n.id + '/read').set(true));
    pushToast('All Notifications Read', null, 'fa-check-double');
  };

  const handleNotificationClick = (notification) => {
    markNotificationRead(notification.id);
    if (notification.postId) {
      const post = activities.find((p) => p.id === notification.postId);
      if (post) {
        setShowNotifications(false);
        setSelectedPost(post);
        setShowActivityDetail(true);
      }
    }
  };

  const getStatusBadge = (item) => {
    const eventDate = parseEventDateTime(item.date, item.startTime);
    const now = new Date();
    if (eventDate < now) return 'Past';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const postDate = new Date(item.date);
    postDate.setHours(0, 0, 0, 0);
    if (postDate.getTime() === today.getTime()) return 'Today';
    return 'Upcoming';
  };

  const getStatusClass = (status) => {
    const classes = {
      Today: 'status-today font-semibold',
      Upcoming: 'status-upcoming font-medium',
      Past: 'bg-gray-300 text-gray-600 font-normal',
    };
    return classes[status] || 'status-upcoming';
  };

  const myId = getMyId();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-light-mint">
      <Toasts toasts={toasts} />

      <StudentHeaderNav
        user={user}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        unreadNotifications={unreadNotifications}
        setShowChatModal={setShowChatModal}
        unreadDMs={unreadDMs}
        setShowLogoutConfirm={setShowLogoutConfirm}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="max-w-7xl mx-auto px-4 py-5">
        {currentPage === 'dashboard' && (
          <StudentDashboardView
            activities={activities}
            myId={myId}
            filter={filter}
            setFilter={setFilter}
            filteredActivities={filteredActivities}
            setShowPostModal={setShowPostModal}
            setSelectedPost={setSelectedPost}
            setShowActivityDetail={setShowActivityDetail}
            getUserChats={getUserChats}
            getStatusBadge={getStatusBadge}
            getStatusClass={getStatusClass}
          />
        )}
        {currentPage === 'profile' && (
          <StudentProfileView
            user={user}
            imagePreview={imagePreview}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            setShowChangePassword={setShowChangePassword}
            editForm={editForm}
            setEditForm={setEditForm}
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
            updateProfile={updateProfile}
            getAvatarColor={getAvatarColor}
          />
        )}
      </div>

      <div className="footer-cta mt-10">
        <div className="art-animation">
          <img src="https://ing.edu.np/images/art-animation.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <p className="text-xs text-blue-200/80 font-normal">© 2026 ING College of Innovation and Leadership. All Rights Reserved.</p>
        </div>
      </div>

      <StudentChangePasswordModal
        show={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        passwordData={passwordData}
        setPasswordData={setPasswordData}
        passwordError={passwordError}
        passwordSuccess={passwordSuccess}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onSubmit={handleChangePassword}
      />

      <ActionConfirmModal
        show={showLogoutConfirm}
        icon="fa-right-from-bracket"
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
        title="Log Out?"
        message="Are you sure you want to sign out of Find a Friend?"
        confirmLabel="Log Out"
        confirmClass="btn-danger"
        onConfirm={() => {
          localStorage.removeItem('ing_user');
          localStorage.removeItem('ing_user_type');
          firebase.auth().signOut();
          window.location.href = 'student-login.html';
        }}
        onCancel={() => setShowLogoutConfirm(false)}
      />

      <CreatePostModal
        show={showPostModal}
        onClose={() => setShowPostModal(false)}
        newPost={newPost}
        setNewPost={setNewPost}
        handleCategoryChange={handleCategoryChange}
        handleStartHourChange={handleStartHourChange}
        handleEndHourChange={handleEndHourChange}
        postError={postError}
        addPost={addPost}
      />

      <PostDetailModal
        show={showActivityDetail}
        post={selectedPost}
        myId={myId}
        onClose={() => setShowActivityDetail(false)}
        onJoinChat={(id, name) => {
          setShowActivityDetail(false);
          openChat(id, name);
        }}
        joinPost={joinPost}
        cancelJoinPost={cancelJoinPost}
      />

      <NotificationsModal
        show={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        markAllNotificationsRead={markAllNotificationsRead}
        handleNotificationClick={handleNotificationClick}
      />

      <ChatModal
        show={showChatModal}
        onClose={() => setShowChatModal(false)}
        myId={myId}
        getUserChats={getUserChats}
        getAvatarColor={getAvatarColor}
        selectedChatId={selectedChatId}
        setChatPartner={setChatPartner}
        setSelectedChatId={setSelectedChatId}
        chatPartner={chatPartner}
        setConfirmDeleteChat={setConfirmDeleteChat}
        confirmDeleteChat={confirmDeleteChat}
        chatThreads={chatThreads}
        unsendMessage={unsendMessage}
        chatMessage={chatMessage}
        setChatMessage={setChatMessage}
        sendMessage={sendMessage}
        deleteConversation={deleteConversation}
      />
    </div>
  );
}
