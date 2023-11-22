import "./MemoApp.css";
import { useState, useEffect, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

import MemoList from "./MemoList";
import MemoEditer from "./MemoEditer";

export const LoginContext = createContext();

export default function MemoApp() {
  const [activeMemo, setActiveMemo] = useState(null);
  const storeData = localStorage.getItem("memos");
  const [memos, setMemos] = useState(storeData ? JSON.parse(storeData) : []);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  const handleLoginChange = () => {
    setIsLogin(!isLogin);
  };

  const handleAddNewMemo = () => {
    const newMemo = { id: uuidv4(), content: "新規メモ" };
    setMemos((memos) => [...memos, newMemo]);
    setActiveMemo(newMemo);
  };

  const handleUpdateMemo = (inputText) => {
    setMemos((memos) =>
      memos.map((memo) =>
        memo.id === activeMemo.id ? { ...memo, content: inputText } : memo
      )
    );
    setActiveMemo(null);
  };

  const handleDeleteMemo = () => {
    setMemos((memos) => memos.filter((memo) => memo.id !== activeMemo.id));
    setActiveMemo(null);
  };

  return (
    <div className="MemoApp">
      <header>
        <h1>メモ帳</h1>
        <button className="login" onClick={handleLoginChange}>
          {isLogin ? "ログアウト" : "ログイン"}
        </button>
      </header>
      <LoginContext.Provider value={isLogin}>
        <div className="container">
          <MemoList
            memos={memos}
            activeMemo={activeMemo}
            setActiveMemo={setActiveMemo}
            handleAddNewMemo={handleAddNewMemo}
          />
          {activeMemo && (
            <MemoEditer
              key={activeMemo.id}
              content={activeMemo.content}
              handleUpdateMemo={handleUpdateMemo}
              handleDeleteMemo={handleDeleteMemo}
            />
          )}
        </div>
      </LoginContext.Provider>
    </div>
  );
}
