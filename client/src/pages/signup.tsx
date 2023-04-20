import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import { SIGNUP_USER } from "../lib/mutation";

const User: NextPage = (props): JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const router = useRouter();

  const [signupUser, { data, error, loading }] = useMutation(SIGNUP_USER);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    signupUser({
      variables: {
        data: {
          name,
          email,
          password,
        },
      },
    });
  };

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>error</h1>;
  }
  if (data?.createUser?.id) {
    router.push("/signin");
  }

  return (
    <div className="mx-auto max-w-[400px] sm:w-[60%] md:w-[40%]   shadow p-4 text-center">
      <h1 className="font-bold text-[2rem]">SignUp</h1>
      <form onSubmit={handleSubmit} className="flex flex-col ">
        <label htmlFor="name" className="text-left">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          className="border p-3 rounded outline-none my-2"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email" className="text-left">
          User Id
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="xyz@email.com"
          className="border p-3 rounded outline-none my-2"
        />
        <label htmlFor="password" className="text-left">
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          placeholder="********"
          className="border p-3 rounded outline-none my-2"
        />
        <label htmlFor="Cpassword" className="text-left">
          Confrim Password
        </label>
        <input
          value={password}
          onChange={(e) => setCpassword(e.target.value)}
          type="password"
          id="Cpassword"
          placeholder="********"
          className="border p-3 rounded outline-none my-2"
        />
        <button type="submit" className="bg-blue-500 py-3 px-5 rounded">
          SignUp
        </button>
      </form>
    </div>
  );
};
export default User;
