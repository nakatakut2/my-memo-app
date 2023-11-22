import { useState, useContext } from "react";
import { LoginContext } from "./MemoApp";

export default function MemoEditer({ content, handleUpdateMemo, handleDeleteMemo }) {
  const [inputText, setInputText] = useState(content);
  const isLogin = useContext(LoginContext);

  return (
    <div>
      <textarea
        value={inputText}
        rows={15}
        cols={30}
        onChange={isLogin ? (e) => setInputText(e.target.value) : null}
      />
      <br />
      {isLogin && (
        <div>
          <button onClick={() => handleUpdateMemo(inputText)}>編集</button>
          <button onClick={handleDeleteMemo}>削除</button>
        </div>
      )}
    </div>
  );
}
