import { Link ,useNavigate  } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {


const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const name = localStorage.getItem("name");
  let finalName="";
  if(name!=null){
  finalName=name;
  }
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  localStorage.removeItem("name");
  navigate("/");
};
  return (
    
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold text-orange-600">
          PanditConnect
        </h1>

        {/* Navigation + Language */}
        <div className="flex items-center gap-6">

          <Link to="/" className="hover:text-orange-600">
            Home
          </Link>
          {name && (
            <span className="text-gray-700 font-medium">
              Welcome, {finalName}
            </span>
          )}
          {!token ? (
            <Link
              to="/login"
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Login
            </Link>
          ) : (
            <>
              {role === "PANDIT" && (
                <Link to="/pandit-dashboard" className="hover:text-primary">
                  Dashboard
                </Link>
              )}

              {role === "USER" && (
                <Link to="/select-pandit" className="hover:text-primary">
                  Start Chat
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          )}

          {/* Language Selector */}
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            defaultValue={i18n.language}
            className="border rounded-lg px-2 py-1 text-sm"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
          </select>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
