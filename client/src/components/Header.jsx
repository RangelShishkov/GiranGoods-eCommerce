import React, { useContext, useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null); // Ref for the user menu dropdown

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!search.trim()) {
        setSuggestions([]); // Clear suggestions for empty input
        return;
      }

      try {
        const response = await fetch(
          `${SummaryApi.searchProduct.url}?q=${encodeURIComponent(
            search.trim()
          )}`
        );
        const data = await response.json();

        const results = Array.isArray(data?.data) ? data.data : [];
        setSuggestions(results.slice(0, 3)); // Take the first X items
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    };

    fetchSearchResults();
  }, [search]);

  const handleSearchSubmit = () => {
    if (search.trim()) {
      navigate(`/search?q=${search}`);
      setSuggestions([]); // Close suggestions after search
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickOutsideDropdown =
        dropdownRef.current && !dropdownRef.current.contains(event.target);
      const isClickOutsideMenu =
        menuRef.current && !menuRef.current.contains(event.target);

      if (isClickOutsideDropdown) {
        setSuggestions([]);
      }

      if (isClickOutsideMenu) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSearch("");
        setSuggestions([]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Run once after component mounts

  const logoutHandler = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to={"/"}>
            <Logo width={175} />
          </Link>
        </div>

        <div className="relative hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-sm focus-within:border-1 focus-within:border-black pl-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none"
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={handleKeyPress}
            value={search}
          />
          <button
            className="text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full bg-cyan-500 hover:bg-cyan-600 text-white"
            onClick={handleSearchSubmit}
          >
            <GrSearch />
          </button>
          {suggestions.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 bg-white border border-gray-300 rounded shadow-md w-full max-h-60 overflow-auto"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion._id || index}
                  className="p-2 hover:bg-gray-100 border-b-2 cursor-pointer"
                  onClick={() => {
                    setSearch("");
                    setSuggestions([]);
                    navigate(`/product/${suggestion._id}`);
                  }}
                >
                  <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                    <img
                      src={suggestion.productImage[0]}
                      alt={suggestion.productName}
                      className="w-10 h-10 rounded mr-3 scale-110 object-fit"
                    />

                    <div className="flex flex-col">
                      <span className="font-medium">
                        {suggestion.brandName + " "}
                        {suggestion.productName}
                      </span>
                      <span className="text-sm text-gray-500 italic">
                        {suggestion.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-5">
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative cursor-pointer">
              <PiShoppingCartSimple />
              <div className="bg-cyan-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          {user?._id && (
            <div
              className="text-xl cursor-pointer"
              onClick={() => setMenuDisplay((preve) => !preve)}
            >
              <FaRegUser />
            </div>
          )}
          <div className="relative flex justify-center">
            {menuDisplay && (
              <div
                ref={menuRef}
                className="absolute bg-white bottom-0 top-9 h-fit p-2 shadow-lg rounded"
              >
                <nav>
                  {user?.role === ROLE.ADMIN ? (
                    <>
                      <Link
                        to={"/admin-panel/all-products"}
                        className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        Admin Panel
                      </Link>

                      <Link
                        to="/order"
                        className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        My Orders
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/order"
                        className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        My Orders
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            )}
          </div>

          <div>
            {user?._id ? (
              <button
                onClick={logoutHandler}
                className="px-2 py-1 rounded-full text-white bg-cyan-500 hover:bg-cyan-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-2 py-1 rounded-full text-white bg-cyan-500 hover:bg-cyan-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
