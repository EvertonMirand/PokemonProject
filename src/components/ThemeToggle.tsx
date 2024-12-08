import { useDispatch } from 'react-redux';
import { setTheme } from '../store/themeSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();

  // Switch theme between light and dark
  const handleThemeChange = () => {
    const newTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
  };

  return (
    <button onClick={handleThemeChange} style={{ position: 'fixed', top: 10, right: 10 }}>
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
