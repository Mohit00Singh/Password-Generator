import { useState, useCallback, useEffect,useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  //useref
  const passwordref = useRef(null);

  const copypassword = useCallback(() => {
    passwordref.current?.select()
    passwordref.current?.setSelectionRange(0,12);
    window.navigator.clipboard.writeText(password);
  },[password]);
  //usecallBack
  //put into cache for optimization
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (num) str += "0123456789";
    if (char) str += "`~!@#$%^&*()_+-<>?/.,{}[]";

    for (let i = 1; i <= length; i++) {
      let ch = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(ch);
    }
    setPassword(pass);
  }, [length, num, char, setPassword]);

 // dependencies if chhed-chad then reRender
  useEffect(() => {
    passwordGenerator();
  }, [length, num, char, passwordGenerator]);


  return (
    <>
      <div
        className="w-full max-w-md mx-auto shadow-md 
      rounded-lg px-5 py-3 my-8  bg-gray-700 text-orange-400"
      >
        <h1 className="text-4xl text-center text-white my-3">
          Password Generator
        </h1>
        <div
          className="flex shadow rounded-lg 
        overflow-hidden mb-4"
        >
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordref}
          />
          <button
           onClick={copypassword}
           className="outline-none bg-green-400 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={num}
              id="numberInput"
              onChange={() => {
                setNum((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={char}
              id="charInput"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
