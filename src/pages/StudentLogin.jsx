import { useState } from 'react';
import firebase from '../lib/firebase';

export default function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then((cred) =>
        firebase
          .database()
          .ref('users/' + cred.user.uid)
          .once('value')
          .then((snapshot) => {
            const dbData = snapshot.val() || {};

            // Verify this account is actually a student account in the database,
            // so an admin account logging in here doesn't silently get treated
            // as a student (or vice versa).
            if (dbData.role !== 'student') {
              firebase.auth().signOut();
              setError('Access denied: this account is not a student account.');
              setLoading(false);
              return;
            }

            const studentUser = {
              id: cred.user.uid,
              name: dbData.name || cred.user.displayName || email.split('@')[0],
              email: cred.user.email || email,
              studentId: dbData.studentId || 'STU' + String(Date.now()).slice(-6),
              ...dbData,
              role: 'student',
            };

            localStorage.setItem('ing_user', JSON.stringify(studentUser));
            localStorage.setItem('ing_user_type', 'student');
            window.location.href = 'student-dashboard.html';
          })
      )
      .catch((err) => {
        console.error('Student login error:', err);
        setError('Invalid email or password. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-mint">
      <div className="max-w-md w-full mx-4 animate-fadeUp">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-7">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm bg-electric-gold">
              <img src="https://ing.edu.np/images/footer/logo-new.svg" alt="ING" className="h-10 w-auto" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mt-4">Student Login</h2>
            <p className="text-gray-500 text-xs mt-1 font-normal">Login with your ING College student account</p>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <span className="animate-pulse-soft inline-block w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span className="text-[11px] text-gray-400 font-normal">Secure student access</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1.5 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-teal focus:border-transparent transition text-sm font-normal"
                placeholder="student@ing.edu.np"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1.5 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-teal focus:border-transparent transition text-sm font-normal pr-10"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                </button>
              </div>
            </div>
            {error && <div className="error-text font-normal">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 rounded-xl font-semibold transition-all duration-200 text-sm shadow-xs mt-2"
            >
              {loading ? (
                <>
                  Logging in... <i className="fas fa-spinner fa-spin ml-2"></i>
                </>
              ) : (
                'Login →'
              )}
            </button>
            <div className="text-center text-xs pt-2">
              <a href="admin-login.html" className="text-gray-400 hover:text-gray-600 transition font-normal">Admin Login</a>
              <span className="text-gray-300 mx-2">•</span>
              <a href="index.html" className="text-gray-400 hover:text-gray-600 transition font-normal">Home Page</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
