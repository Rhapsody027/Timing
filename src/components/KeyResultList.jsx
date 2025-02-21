import PropTypes from "prop-types";
import { useState } from "react";

function KeyResultList({
  keyResults,
  onUpdateProgress,
  onEditKeyResult,
  onDeleteKeyResult,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", target: 0 });

  const handleEditClick = (kr) => {
    setEditingId(kr.id);
    setEditForm({ title: kr.title, target: kr.target });
  };

  const handleEditSubmit = (kr) => {
    onEditKeyResult(kr.id, editForm);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {keyResults.map((kr) => (
        <div key={kr.id} className="card bg-base-300">
          <div className="card-body p-4">
            {editingId === kr.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="input input-bordered w-full"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={editForm.target}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        target: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="input input-bordered w-24 text-center"
                    min="1"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn btn-ghost btn-sm"
                    >
                      取消
                    </button>
                    <button
                      onClick={() => handleEditSubmit(kr)}
                      className="btn btn-primary btn-sm"
                    >
                      保存
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{kr.title}</h3>
                  <div className="flex items-center space-x-4">
                    <div className="join">
                      <input
                        type="number"
                        value={kr.current}
                        onChange={(e) => {
                          const value = Math.min(
                            Math.max(0, parseInt(e.target.value) || 0),
                            kr.target
                          );
                          onUpdateProgress(kr.id, value);
                        }}
                        className="input input-sm w-20 join-item text-center border-none focus:outline-blue-500"
                        min="0"
                        max={kr.target}
                      />
                      <span className="join-item btn btn-sm no-animation">
                        / {kr.target}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(kr)}
                        className="btn btn-ghost btn-sm"
                      >
                        編輯
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("確定要刪除這個關鍵結果嗎？")) {
                            onDeleteKeyResult(kr.id);
                          }
                        }}
                        className="btn btn-ghost btn-sm text-error"
                      >
                        刪除
                      </button>
                    </div>
                  </div>
                </div>

                <progress
                  className={`progress ${
                    kr.current >= kr.target
                      ? "progress-success"
                      : "progress-primary"
                  } w-full`}
                  value={kr.current}
                  max={kr.target}
                ></progress>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

KeyResultList.propTypes = {
  keyResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      target: PropTypes.number.isRequired,
      current: PropTypes.number.isRequired,
    })
  ).isRequired,
  onUpdateProgress: PropTypes.func.isRequired,
  onEditKeyResult: PropTypes.func.isRequired,
  onDeleteKeyResult: PropTypes.func.isRequired,
};

export default KeyResultList;
