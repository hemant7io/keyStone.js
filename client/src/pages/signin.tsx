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

  if (data?.sessionToken) {
    router.push("/");
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="xyz@email.com"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="****"
        />
        <input type="submit" value="login" />
      </form>
    </div>
  );
};
export default User;
