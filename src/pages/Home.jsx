import { useState, useEffect, useRef } from 'react';
import firebase from '../lib/firebase';
import { FLOOR_SEARCH_DATA } from '../data/floorSearchData';
import useToasts from '../hooks/useToasts';
import Toasts from '../components/shared/Toasts';
import ConfirmModal from '../components/shared/ConfirmModal';
import FloatingButtons from '../components/shared/FloatingButtons';
import Footer from '../components/shared/Footer';
import Header from '../components/home/Header';
import Hero from '../components/home/Hero';
import ActivitiesSection from '../components/home/ActivitiesSection';
import QuickAccess from '../components/home/QuickAccess';

export default function Home() {
            const [user, setUser] = useState(null);
            const [isLoggedIn, setIsLoggedIn] = useState(false);
            const [searchQuery, setSearchQuery] = useState('');
            const [searchResults, setSearchResults] = useState([]);
            const [showResults, setShowResults] = useState(false);
            const [activeIndex, setActiveIndex] = useState(-1);
            const [recentSearches, setRecentSearches] = useState(() => {
                const saved = localStorage.getItem('recent_searches');
                return saved ? JSON.parse(saved) : [];
            });
            const [activities, setActivities] = useState([]);
            const [activitiesLoaded, setActivitiesLoaded] = useState(false);
            const [scrolled, setScrolled] = useState(false);
            const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
            const [showBackToTop, setShowBackToTop] = useState(false);
            const [confirmOpen, setConfirmOpen] = useState(false);
            const searchRef = useRef(null);
            const { toasts, pushToast } = useToasts();

            useEffect(() => {
                const checkUser = () => {
                    const savedUser = localStorage.getItem('ing_user');
                    if (savedUser) {
                        try {
                            setUser(JSON.parse(savedUser));
                            setIsLoggedIn(true);
                        } catch(e) {
                            setUser(null);
                            setIsLoggedIn(false);
                        }
                    } else {
                        setUser(null);
                        setIsLoggedIn(false);
                    }
                };

                checkUser();

                const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
                    if (authUser) {
                        const savedUser = localStorage.getItem('ing_user');
                        if (savedUser) {
                            try {
                                setUser(JSON.parse(savedUser));
                                setIsLoggedIn(true);
                            } catch (e) {
                                localStorage.removeItem('ing_user');
                                localStorage.removeItem('ing_user_type');
                                setUser(null);
                                setIsLoggedIn(false);
                            }
                        }
                    } else {
                        // Firebase says there's no active session — always clear local
                        // state too, even if a stale ing_user is still sitting in
                        // localStorage, so the UI never shows someone as logged in
                        // when their session has actually expired.
                        localStorage.removeItem('ing_user');
                        localStorage.removeItem('ing_user_type');
                        setUser(null);
                        setIsLoggedIn(false);
                    }
                });

                return () => unsubscribe();
            }, []);

            useEffect(() => {
                localStorage.setItem('recent_searches', JSON.stringify(recentSearches));
            }, [recentSearches]);

            // Fetch REAL activities directly from Firebase Realtime Database
            useEffect(() => {
                if (!isLoggedIn) {
                    setActivities([]);
                    setActivitiesLoaded(true);
                    return;
                }

                const activitiesRef = firebase.database().ref('activities');
                
                const handleSnapshot = (snapshot) => {
                    const data = snapshot.val() || {};
                    let items = [];
                    if (Array.isArray(data)) {
                        items = data.filter(Boolean);
                    } else if (typeof data === 'object') {
                        items = Object.values(data);
                    }

                    items = items.map(item => ({
                        ...item,
                        joined: Array.isArray(item.joined) ? item.joined : []
                    })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

                    setActivities(items);
                    setActivitiesLoaded(true);
                };

                const handleError = (err) => {
                    console.warn("Firebase activities fetch notice:", err);
                    setActivities([]);
                    setActivitiesLoaded(true);
                };

                activitiesRef.on('value', handleSnapshot, handleError);

                return () => {
                    activitiesRef.off('value', handleSnapshot);
                };
            }, [isLoggedIn]);

            useEffect(() => {
                const onScroll = () => {
                    setScrolled(window.scrollY > 40);
                    setShowBackToTop(window.scrollY > 500);
                };
                window.addEventListener('scroll', onScroll);
                return () => window.removeEventListener('scroll', onScroll);
            }, []);

            const handleSearch = (query) => {
                setActiveIndex(-1);
                if (!query.trim()) {
                    setSearchResults([]);
                    setShowResults(false);
                    return;
                }

                const q = query.toLowerCase();
                const results = FLOOR_SEARCH_DATA.filter(item =>
                    item.name.toLowerCase().includes(q) ||
                    item.floor.toLowerCase().includes(q) ||
                    item.type.toLowerCase().includes(q)
                );

                setSearchResults(results);
                setShowResults(true);

                if (results.length > 0) {
                    const newRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
                    setRecentSearches(newRecent);
                }
            };

            const handleResultClick = (result) => {
                const floorMap = {
                    'B2': 'B2', 'B1': 'B1', 'Ground': 'Ground', '1st': '1st',
                    '2nd': '2nd', '3rd': '3rd', '4th': '4th', '5th': '5th',
                    '6th': '6th', '7th': '7th', '8th': '8th', '9th': '9th', '10th': '10th'
                };
                const floor = floorMap[result.floor] || 'Ground';
                window.location.href = `floornavigation.html#${floor}`;
            };

            const handleSearchKeyDown = (e) => {
                if (!showResults || searchResults.length === 0) return;
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setActiveIndex(i => Math.min(i + 1, searchResults.length - 1));
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setActiveIndex(i => Math.max(i - 1, 0));
                } else if (e.key === 'Enter' && activeIndex >= 0) {
                    handleResultClick(searchResults[activeIndex]);
                } else if (e.key === 'Escape') {
                    setShowResults(false);
                }
            };

            const clearRecentSearches = () => {
                setRecentSearches([]);
                pushToast('Recent searches cleared', null, 'fa-broom');
            };

            const handleLogout = () => {
                localStorage.removeItem('ing_user');
                localStorage.removeItem('ing_user_type');
                firebase.auth().signOut().catch(() => {});
                setUser(null);
                setIsLoggedIn(false);
                setConfirmOpen(false);
                pushToast('Logged out', 'See you again soon!', 'fa-hand-wave');
            };

            const totalFacilities = FLOOR_SEARCH_DATA.length;
            const totalFloors = new Set(FLOOR_SEARCH_DATA.map(f => f.floor)).size;
            const totalClassrooms = FLOOR_SEARCH_DATA.filter(f => f.type === 'Classroom').length;
            const totalLabs = FLOOR_SEARCH_DATA.filter(f => f.type === 'Lab').length;

            const popularSearches = ['Library', 'Cafeteria', 'Computer Lab', 'Admin Office', 'Futsal'];

            return (
                <div className="content-wrapper min-h-screen bg-light-mint">
                    <Toasts toasts={toasts} />
                    <ConfirmModal
                        open={confirmOpen}
                        title="Log out of Find a Friend?"
                        message="You'll need to sign back in to see your dashboard and activities."
                        onConfirm={handleLogout}
                        onCancel={() => setConfirmOpen(false)}
                    />

                    <Header
                        isLoggedIn={isLoggedIn}
                        user={user}
                        scrolled={scrolled}
                        mobileMenuOpen={mobileMenuOpen}
                        setMobileMenuOpen={setMobileMenuOpen}
                        onLogoutClick={() => setConfirmOpen(true)}
                    />

                    <Hero
                        searchRef={searchRef}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleSearch={handleSearch}
                        handleSearchKeyDown={handleSearchKeyDown}
                        showResults={showResults}
                        setShowResults={setShowResults}
                        searchResults={searchResults}
                        setSearchResults={setSearchResults}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        handleResultClick={handleResultClick}
                        recentSearches={recentSearches}
                        clearRecentSearches={clearRecentSearches}
                        popularSearches={popularSearches}
                        totalFloors={totalFloors}
                        totalFacilities={totalFacilities}
                        totalClassrooms={totalClassrooms}
                        totalLabs={totalLabs}
                    />

                    <div className="max-w-6xl mx-auto px-4 py-10">
                        <ActivitiesSection isLoggedIn={isLoggedIn} activitiesLoaded={activitiesLoaded} activities={activities} />
                        <QuickAccess />
                    </div>

                    <FloatingButtons showBackToTop={showBackToTop} findFriendHref="student-dashboard.html" />

                    <Footer isLoggedIn={isLoggedIn} onLogoutClick={() => setConfirmOpen(true)} />
                </div>
            );
}
