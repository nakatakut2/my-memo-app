import "./MemoApp.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import MemoList from "./MemoList";
import MemoEditer from "./MemoEditer";

export default function MemoApp() {
  const [activeMemo, setActiveMemo] = useState(null);
  const storeData = localStorage.getItem("memos");
  const [memos, setMemos] = useState(storeData ? JSON.parse(storeData) : []);

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

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
    <div>
      <h1 className="header">メモ帳</h1>
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
    </div>
  );
}
