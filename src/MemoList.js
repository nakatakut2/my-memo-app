export default function MemoList({
  memos,
  activeMemo,
  setActiveMemo,
  handleAddNewMemo,
}) {
  return (
    <div className="memoList">
      <button onClick={handleAddNewMemo}>追加</button>
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
