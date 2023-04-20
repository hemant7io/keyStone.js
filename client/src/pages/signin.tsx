import { SIGNIN_USER } from "../lib/mutation";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { FormEventHandler, useState } from "react";

const User: NextPage = (props): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [signinUser, { data, error, loading }] = useMutation(SIGNIN_USER);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(email, password);
    signinUser({
      variables: {
        email,
        password,
      },
    });
  };

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>error</h1>;
  }

  if (data?.authenticateUserWithPassword?.sessionToken) {
    router.push("/");
    localStorage.setItem(
      "token",
      data?.authenticateUserWithPassword?.sessionToken
    );
  }
  return (
    <div className="mx-auto max-w-[400px] sm:w-[60%] md:w-[40%]   shadow p-4 text-center">
      <h1 className="font-bold text-[2rem]">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col ">
        <label htmlFor="email" className="text-left">
          User Id
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="xyz@email.com"
          className="border p-3 rounded outline-none my-2"
        />
        <label htmlFor="email" className="text-left">
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          className="border p-3 rounded outline-none my-2"
        />
        <button type="submit" className="bg-blue-500 py-3 px-5 rounded">
          Login
        </button>
      </form>
    </div>
  );
};
export default User;
