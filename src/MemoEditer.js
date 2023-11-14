import { useState, useEffect } from "react";

export default function MemoEditer({
  content,
  handleUpdateMemo,
  handleDeleteMemo,
}) {
  const [inputText, setInputText] = useState(content);
  useEffect(() => {
    setInputText(content);
  }, [content]);

  return (
    <div>
      <textarea
        value={inputText}
        rows={15}
        cols={30}
        onChange={(e) => setInputText(e.target.value)}
      />
      <br />
      <button onClick={() => handleUpdateMemo(inputText)}>編集</button>
      <button onClick={handleDeleteMemo}>削除</button>
    </div>
  );
}
