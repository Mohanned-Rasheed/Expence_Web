import { useState } from "react";
import { auth } from "../firebase/config.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../state/Firebase/userSlice.ts";

function LoginPage() {
  const dispatch = useDispatch();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [err, setErr] = useState("");
  const [sginInFlag, setSginInFlag] = useState(true);

  function isValidEmail(email: string) {
    var regex = /^([a-zA-Z0-9_.+-])+\@([a-zA-Z0-9-])+\.[a-zA-Z]{2,4}$/;
    return regex.test(String(email).toLowerCase());
  }
  function isValidPassword(str: string) {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$])/.test(str);
  }

  return (
    <main className="flex justify-center items-center bg-slate-300 w-[100vw] h-[100vh] ">
      <section className="rounded-md  h-[550px] px-10  bg-white flex justify-center items-center flex-col">
        <text className="font-bold max-md:text-4xl text-5xl mb-12">
          {sginInFlag ? "Login" : "Register"}
        </text>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (isValidEmail(email)) {
              if (password.length === 0) {
                setErr("Please Write Your Password");
                return;
              } else if (
                password.length < 6 &&
                password.length > 0 &&
                !sginInFlag
              ) {
                setErr("Password Too Short");
                return;
              }

              if (sginInFlag) {
                await signInWithEmailAndPassword(auth, email, password)
                  .then((currentUser) => {
                    dispatch(setUser(currentUser));
                  })
                  .catch(() => {
                    setErr("Wrong Email or Password");
                  });
                setEmail("");
                setPassword("");
              } else {
                if (!isValidPassword(password)) {
                  setErr("Password Must Contain Letters Numbers Symbols(@#$)");
                  return;
                }
                await createUserWithEmailAndPassword(auth, email, password)
                  .then((currentUser) => {
                    dispatch(setUser(currentUser));
                  })
                  .catch((err) => {
                    setErr(err);
                  });
                setEmail("");
                setPassword("");
              }
            } else {
              setErr("Make Sure To Write a Vailde Email");
            }
          }}
          className="flex justify-center items-center flex-col gap-8"
        >
          <div className="text-red-600 w-96 text-center">{err}</div>
          <label className=" flex flex-col max-md:w-80 w-96 h-12">
            Email{" "}
            <input
              onChange={(input) => {
                setEmail(input.target.value);
              }}
              value={email}
              placeholder=" Type Your Email"
              className=" border-b-gray-200 border-b outline-none"
              type="email"
            ></input>
          </label>

          <label className=" flex flex-col max-md:w-80 w-96 h-12">
            password{" "}
            <input
              onChange={(input) => {
                setPassword(input.target.value);
              }}
              value={password}
              placeholder=" Type Your Password"
              className=" outline-none border-b-gray-200 border-b"
              type="password"
            ></input>
          </label>

          <button className=" bg-green-300 h-12 max-md:w-80 w-96 max-md:text-lg text-xl font-bold text-white rounded-md">
            {sginInFlag ? "Login" : "Register"}
          </button>
        </form>
        <text className="w-full flex justify-center mt-8">
          {sginInFlag ? "Dont have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setSginInFlag(!sginInFlag);
            }}
            className="pl-1 text-blue-900"
          >
            {sginInFlag ? "Register" : "Login"}
          </button>{" "}
        </text>
      </section>
    </main>
  );
}

export default LoginPage;
