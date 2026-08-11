import { useState, useEffect, useCallback } from 'react';
import firebase, { firebaseConfig } from '../lib/firebase';
import { CATEGORY_LOCATIONS, CAMPUS_HOURS, getMinutesFromMidnight, parseEventDateTime } from '../utils/scheduleHelpers';
import Toasts from '../components/shared/Toasts';
import ActionConfirmModal from '../components/shared/ActionConfirmModal';
import AdminHeaderNav from '../components/admin/AdminHeaderNav';
import DashboardView from '../components/admin/DashboardView';
import ActivitiesView from '../components/admin/ActivitiesView';
import StudentsView from '../components/admin/StudentsView';
import ProfileView from '../components/admin/ProfileView';
import CreateActivityModal from '../components/admin/CreateActivityModal';
import ActivityDetailModal from '../components/admin/ActivityDetailModal';
import CreateStudentModal from '../components/admin/CreateStudentModal';
import EditStudentModal from '../components/admin/EditStudentModal';
import ChangePasswordModal from '../components/admin/ChangePasswordModal';

// AUTH GUARD
const initialUser = JSON.parse(localStorage.getItem('ing_user') || 'null');
const userType = localStorage.getItem('ing_user_type');
if (!initialUser || userType !== 'admin') {
  window.location.href = 'admin-login.html';
}

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [adminUser, setAdminUser] = useState(initialUser);
  const [students, setStudents] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [newActivity, setNewActivity] = useState({
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

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showActivityDetail, setShowActivityDetail] = useState(false);
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    studentId: '',
    email: '',
    phone: '',
    dob: '',
    course: '',
    semester: '',
    password: '',
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ ...adminUser });
  const [imagePreview, setImagePreview] = useState(adminUser?.profileImage || null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((title, message, icon) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, title, message, icon }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const handleStartHourChange = (hour) => {
    const hourObj = CAMPUS_HOURS.find((h) => h.hour === hour);
    const autoAmPm = hourObj ? hourObj.ampm : ['01', '02', '03', '04', '05', '06', '12'].includes(hour) ? 'PM' : 'AM';
    const currentIndex = CAMPUS_HOURS.findIndex((h) => h.hour === hour);
    const nextHourObj = CAMPUS_HOURS[Math.min(currentIndex + 1, CAMPUS_HOURS.length - 1)];

    setNewActivity((prev) => ({
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
    setNewActivity((prev) => ({ ...prev, endHour: hour, endAmPm: autoAmPm }));
  };

  const handleCategoryChange = (cat) => {
    const defaultLocObj = CATEGORY_LOCATIONS[cat] ? CATEGORY_LOCATIONS[cat][0] : null;
    setNewActivity((prev) => ({
      ...prev,
      category: cat,
      location: defaultLocObj ? defaultLocObj.value : '',
      customLocation: '',
    }));
  };

  useEffect(() => {
    const loadStudents = () => {
      firebase
        .database()
        .ref('users')
        .once('value')
        .then((snapshot) => {
          const data = snapshot.val() || {};
          const studentList = Object.values(data).filter((u) => u.role === 'student');
          setStudents(studentList);
        })
        .catch((err) => console.error('Failed to load students:', err));
    };

    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) loadStudents();
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let activitiesRef = firebase.database().ref('activities');
    activitiesRef.on('value', (snapshot) => {
      const data = snapshot.val() || {};
      const items = Object.values(data).map((item) => ({
        ...item,
        joined: Array.isArray(item.joined) ? item.joined : [],
      }));
      items.sort((a, b) => b.createdAt - a.createdAt);
      setAllActivities(items);
    });
    return () => activitiesRef.off();
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.studentId && s.studentId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getAvatarColor = (name) => {
    const colors = ['avatar-blue', 'avatar-green', 'avatar-purple', 'avatar-pink', 'avatar-orange', 'avatar-teal'];
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) {
      hash = (name || '').charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const handleCreateActivity = () => {
    setFormError('');

    const startMins = getMinutesFromMidnight(newActivity.startHour, newActivity.startMinute, newActivity.startAmPm);
    const endMins = getMinutesFromMidnight(newActivity.endHour, newActivity.endMinute, newActivity.endAmPm);

    if (endMins <= startMins) {
      setFormError('End time must be later than start time (e.g. 02:00 PM to 04:00 PM)');
      return;
    }

    const startTime = `${newActivity.startHour}:${newActivity.startMinute} ${newActivity.startAmPm}`;
    const endTime = `${newActivity.endHour}:${newActivity.endMinute} ${newActivity.endAmPm}`;

    const finalLocation = newActivity.location === 'Custom / Other Location...' ? newActivity.customLocation.trim() : newActivity.location;

    if (!newActivity.title || !finalLocation || !newActivity.date) {
      setFormError('Please fill in all required fields.');
      return;
    }

    const currentUser = firebase.auth().currentUser;
    const myId = (currentUser && currentUser.uid) || adminUser.id || 'admin_1';

    const activityId = 'p_' + Date.now();
    const activity = {
      id: activityId,
      category: newActivity.category,
      title: newActivity.title,
      location: finalLocation,
      description: newActivity.description,
      date: newActivity.date,
      startTime,
      endTime,
      spots: newActivity.spots,
      posterId: myId,
      posterName: adminUser?.name || 'Admin',
      joined: [{ id: myId, name: adminUser?.name || 'Admin' }],
      createdAt: Date.now(),
    };

    firebase
      .database()
      .ref('activities/' + activityId)
      .set(activity)
      .then(() => {
        setNewActivity({
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
        setShowCreateModal(false);
        pushToast('Activity Published', `"${activity.title}" is now active.`, 'fa-calendar-check');

        firebase
          .database()
          .ref('users')
          .once('value')
          .then((snapshot) => {
            const data = snapshot.val() || {};
            Object.entries(data).forEach(([uid, u]) => {
              if (u.role === 'student' && uid !== myId) {
                const notifId = 'n_' + Date.now() + '_' + Math.random().toString(36).slice(2);
                const notif = {
                  id: notifId,
                  userId: uid,
                  type: 'new_activity',
                  title: 'New Campus Activity',
                  message: `"${activity.title}" was just posted by Admin.`,
                  activityId,
                  read: false,
                  createdAt: Date.now(),
                };
                firebase.database().ref('notifications/' + uid + '/' + notifId).set(notif);
              }
            });
          });
      })
      .catch((err) => {
        console.error(err);
        setFormError(err.message);
      });
  };

  const handleCreateStudent = async () => {
    setFormError('');

    if (!newStudent.name || !newStudent.email || !newStudent.password) {
      setFormError('Please fill in name, email, and password.');
      return;
    }
    if (newStudent.password.length < 8) {
      setFormError('Password must be at least 8 characters long.');
      return;
    }

    try {
      const secondaryApp = firebase.initializeApp(firebaseConfig, 'Secondary_' + Date.now());
      const secondaryAuth = secondaryApp.auth();

      const userCred = await secondaryAuth.createUserWithEmailAndPassword(newStudent.email, newStudent.password);
      const newUid = userCred.user.uid;

      const student = {
        id: newUid,
        name: newStudent.name,
        email: newStudent.email,
        role: 'student',
        studentId: newStudent.studentId || 'STU' + String(Date.now()).slice(-6),
        phone: newStudent.phone || '',
        dob: newStudent.dob || '',
        course: newStudent.course || '',
        semester: newStudent.semester || '',
        createdAt: new Date().toISOString().split('T')[0],
      };

      await firebase.database().ref('users/' + newUid).set(student);
      await secondaryAuth.signOut();
      await secondaryApp.delete();

      setStudents([...students, student]);
      setNewStudent({ name: '', studentId: '', email: '', phone: '', dob: '', course: '', semester: '', password: '' });
      setShowCreateStudent(false);
      pushToast('Student Added', `Account created for ${student.name}`, 'fa-user-check');
    } catch (err) {
      console.error(err);
      setFormError(err.message);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent({ ...student });
    setShowEditModal(true);
  };

  const saveEditStudent = () => {
    if (!editingStudent.name || !editingStudent.email) {
      setFormError('Name and email are required.');
      return;
    }
    firebase
      .database()
      .ref('users/' + editingStudent.id)
      .update({
        name: editingStudent.name,
        email: editingStudent.email,
        phone: editingStudent.phone || '',
        course: editingStudent.course || '',
        semester: editingStudent.semester || '',
      })
      .then(() => {
        setStudents(students.map((s) => (s.id === editingStudent.id ? { ...editingStudent } : s)));
        setShowEditModal(false);
        setEditingStudent(null);
        pushToast('Student Updated', 'Changes saved successfully.', 'fa-user-check');
      })
      .catch((err) => {
        console.error(err);
        setFormError(err.message);
      });
  };

  const handleDeleteStudent = (studentId) => {
    firebase
      .database()
      .ref('users/' + studentId)
      .remove()
      .then(() => {
        setStudents(students.filter((s) => s.id !== studentId));
        setShowDeleteConfirm(null);
        pushToast('Student Deleted', 'User profile removed.', 'fa-trash-can');
      })
      .catch((err) => alert('Failed to delete: ' + err.message));
  };

  const resetStudentPassword = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    firebase
      .auth()
      .sendPasswordResetEmail(student.email)
      .then(() => pushToast('Reset Email Sent', `Password reset sent to ${student.email}`, 'fa-envelope'))
      .catch((err) => alert('Failed to send reset email: ' + err.message));
  };

  const deleteActivity = (activityId) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      firebase
        .database()
        .ref('activities/' + activityId)
        .remove()
        .then(() => pushToast('Activity Deleted', null, 'fa-trash-can'));
    }
  };

  const resetAllData = () => {
    if (confirm('⚠️ WARNING: This will clear local session storage. Continue?')) {
      localStorage.removeItem('ing_user');
      localStorage.removeItem('ing_user_type');
      window.location.href = 'index.html';
    }
  };

  const updateAdminProfile = () => {
    const myId = (firebase.auth().currentUser && firebase.auth().currentUser.uid) || adminUser.id;
    firebase
      .database()
      .ref('users/' + myId)
      .update({
        name: profileForm.name,
        phone: profileForm.phone || '',
        department: profileForm.department || '',
        profileImage: profileForm.profileImage || null,
      })
      .then(() => {
        const updated = { ...adminUser, ...profileForm };
        setAdminUser(updated);
        localStorage.setItem('ing_user', JSON.stringify(updated));
        pushToast('Profile Saved', 'Your admin details were updated.', 'fa-user-check');
        setIsEditingProfile(false);
      })
      .catch((err) => alert('Failed to update profile: ' + err.message));
  };

  const handleAdminImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setProfileForm({ ...profileForm, profileImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const removeAdminImage = () => {
    setImagePreview(null);
    setProfileForm({ ...profileForm, profileImage: null });
  };

  const changeAdminPassword = () => {
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
          setPasswordSuccess('Password updated successfully!');
          setPasswordError('');
          setPasswordData({ current: '', new: '', confirm: '' });
          setTimeout(() => setShowChangePassword(false), 2000);
        })
        .catch((err) => setPasswordError(err.message));
    }
  };

  const getStatusBadge = (activity) => {
    const eventDate = parseEventDateTime(activity.date, activity.startTime);
    const now = new Date();
    if (eventDate < now) return 'Past';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const postDate = new Date(activity.date);
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

  if (!adminUser) return null;

  return (
    <div className="min-h-screen bg-light-mint">
      <Toasts toasts={toasts} />

      <AdminHeaderNav adminUser={adminUser} setShowLogoutConfirm={setShowLogoutConfirm} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className="max-w-7xl mx-auto px-4 py-5">
        {currentPage === 'dashboard' && (
          <DashboardView
            students={students}
            allActivities={allActivities}
            resetAllData={resetAllData}
            setShowCreateModal={setShowCreateModal}
            setShowCreateStudent={setShowCreateStudent}
            setCurrentPage={setCurrentPage}
            setSelectedActivity={setSelectedActivity}
            setShowActivityDetail={setShowActivityDetail}
            getStatusBadge={getStatusBadge}
            getStatusClass={getStatusClass}
          />
        )}
        {currentPage === 'activities' && (
          <ActivitiesView
            allActivities={allActivities}
            setShowCreateModal={setShowCreateModal}
            setSelectedActivity={setSelectedActivity}
            setShowActivityDetail={setShowActivityDetail}
            getStatusBadge={getStatusBadge}
            getStatusClass={getStatusClass}
          />
        )}
        {currentPage === 'students' && (
          <StudentsView
            students={students}
            filteredStudents={filteredStudents}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setShowCreateStudent={setShowCreateStudent}
            handleEditStudent={handleEditStudent}
            resetStudentPassword={resetStudentPassword}
            setShowDeleteConfirm={setShowDeleteConfirm}
            getAvatarColor={getAvatarColor}
          />
        )}
        {currentPage === 'profile' && (
          <ProfileView
            adminUser={adminUser}
            imagePreview={imagePreview}
            isEditingProfile={isEditingProfile}
            setIsEditingProfile={setIsEditingProfile}
            setShowChangePassword={setShowChangePassword}
            profileForm={profileForm}
            setProfileForm={setProfileForm}
            handleAdminImageUpload={handleAdminImageUpload}
            removeAdminImage={removeAdminImage}
            updateAdminProfile={updateAdminProfile}
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

      <CreateActivityModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        newActivity={newActivity}
        setNewActivity={setNewActivity}
        handleCategoryChange={handleCategoryChange}
        handleStartHourChange={handleStartHourChange}
        handleEndHourChange={handleEndHourChange}
        formError={formError}
        handleCreateActivity={handleCreateActivity}
      />

      <ActivityDetailModal show={showActivityDetail} activity={selectedActivity} onClose={() => setShowActivityDetail(false)} onDelete={(id) => { setShowActivityDetail(false); deleteActivity(id); }} />

      <CreateStudentModal show={showCreateStudent} onClose={() => setShowCreateStudent(false)} newStudent={newStudent} setNewStudent={setNewStudent} formError={formError} onCreate={handleCreateStudent} />

      <EditStudentModal show={showEditModal} editingStudent={editingStudent} setEditingStudent={setEditingStudent} onSave={saveEditStudent} onClose={() => setShowEditModal(false)} />

      <ActionConfirmModal
        show={!!showDeleteConfirm}
        icon="fa-exclamation-triangle"
        iconBg="bg-red-100"
        iconColor="text-red-600"
        title="Delete Student?"
        message="Are you sure you want to delete this student account? This action cannot be undone."
        confirmLabel="Delete"
        confirmClass="btn-danger"
        onConfirm={() => handleDeleteStudent(showDeleteConfirm)}
        onCancel={() => setShowDeleteConfirm(null)}
      />

      <ChangePasswordModal
        show={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        passwordData={passwordData}
        setPasswordData={setPasswordData}
        passwordError={passwordError}
        passwordSuccess={passwordSuccess}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onSubmit={changeAdminPassword}
      />

      <ActionConfirmModal
        show={showLogoutConfirm}
        icon="fa-right-from-bracket"
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
        title="Log Out?"
        message="Are you sure you want to sign out of the Admin Dashboard?"
        confirmLabel="Log Out"
        confirmClass="btn-danger"
        onConfirm={() => {
          localStorage.removeItem('ing_user');
          localStorage.removeItem('ing_user_type');
          firebase.auth().signOut();
          window.location.href = 'admin-login.html';
        }}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
}
