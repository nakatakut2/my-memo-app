import { useContext } from "react";
import { LoginContext } from "./MemoApp";

export default function MemoList({
  memos,
  activeMemo,
  setActiveMemo,
  handleAddNewMemo,
}) {
  const isLogin = useContext(LoginContext);
  return (
    <div className="memoList">
      {isLogin && <button onClick={handleAddNewMemo}>追加</button>}
      <ul>
        {memos.map((memo) => (
          <li
            key={memo.id}
            className={
              activeMemo && memo.id === activeMemo.id ? "selectedMemo" : ""
            }
            onClick={() => {
              setActiveMemo(memo);
            }}
          >
            {memo.content.split("\n")[0]}
          </li>
        ))}
      </ul>
    </div>
  );
}
