import { useEffect } from "react";
import Link from "next/link";
import React, { useState, useContext } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { useRouter } from "next/router";

const Header = () => {
  const [togglevalue, setToggleValue] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();
  const togglehandler = () => {
    togglevalue ? setToggleValue(false) : setToggleValue(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken("");
    router.push("/signin");
  };
  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      setToken(data);
    } else {
      setToken("");
    }
  }, [token, logoutHandler]);

  return (
    <header className="bg-white text-black  flex py-4 px-3 justify-between items-center shadow-md fixed w-full shadow-[#eee]  ">
      <div className="logo">
        <h1>keystonejs-nextjs</h1>
      </div>
      <nav className="relative">
        <ul
          className={`capitalize  absolute   bg-white ${
            togglevalue
              ? " -right-3 top-5 w-screen flex-col h-screen items-center "
              : " -right-[30rem] -top-[20rem] "
          }  sm:relative  sm:w-full  sm:top-0 sm:right-0 sm:h-full  sm:flex-row flex items-center`}
        >
          <li className="mx-2 p-2 cursor-pointer hover:text-[#ffb366]">
            <Link href="/" onClick={togglehandler}>
              Home
            </Link>
          </li>

          {token ? (
            <>
              <li className="mx-2 p-2 cursor-pointer hover:text-[#ffb366]">
                <Link href="/user-profile" onClick={togglehandler}>
                  Profile
                </Link>
              </li>
              <button
                className="bg-blue-500 px-4 py-2 rounded"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <li className="mx-2 p-2 cursor-pointer hover:text-[#ffb366]">
                <Link href="/signin" onClick={togglehandler}>
                  Signin
                </Link>
              </li>

              <li className="mx-2 p-2 cursor-pointer hover:text-[#ffb366]">
                <Link href="/signup" onClick={togglehandler}>
                  SignUp
                </Link>
              </li>
            </>
          )}
        </ul>
        <AiOutlineBars className="sm:hidden " onClick={togglehandler} />
      </nav>
    </header>
  );
};

export default Header;
