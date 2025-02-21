import PropTypes from "prop-types";
import KeyResultList from "./KeyResultList";
import KeyResultForm from "./KeyResultForm";
import { useState } from "react";

function ObjectiveList({
  objectives,
  onAddKeyResult,
  onEditKeyResult,
  onDeleteKeyResult,
  onUpdateProgress,
  onEditObjective,
  onDeleteObjective,
}) {
  const [editingObjective, setEditingObjective] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const handleEditClick = (objective) => {
    setEditingObjective(objective.id);
    setEditForm({
      title: objective.title,
      description: objective.description,
    });
  };

  return (
    <div className="space-y-6">
      {objectives.map((objective) => (
        <div key={objective.id} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {editingObjective === objective.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="input input-bordered w-full text-2xl font-bold"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="textarea textarea-bordered w-full"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingObjective(null)}
                    className="btn btn-ghost"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => {
                      onEditObjective(objective.id, editForm);
                      setEditingObjective(null);
                    }}
                    className="btn btn-primary"
                  >
                    完成
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="card-title text-2xl">{objective.title}</h2>
                  <p className="text-base-content/70 mt-1">
                    {objective.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(objective)}
                    className="btn btn-ghost btn-sm"
                  >
                    編輯
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("確定要刪除這個目標嗎？")) {
                        onDeleteObjective(objective.id);
                      }
                    }}
                    className="btn btn-ghost btn-sm text-error"
                  >
                    刪除
                  </button>
                </div>
              </div>
            )}

            <div className="divider"></div>

            <div>
              <KeyResultList
                keyResults={objective.keyResults}
                onUpdateProgress={(keyResultId, progress) =>
                  onUpdateProgress(objective.id, keyResultId, progress)
                }
                onEditKeyResult={(keyResultId, updatedData) =>
                  onEditKeyResult(objective.id, keyResultId, updatedData)
                }
                onDeleteKeyResult={(keyResultId) =>
                  onDeleteKeyResult(objective.id, keyResultId)
                }
              />
            </div>

            <div className="mt-4">
              <KeyResultForm
                onSubmit={(keyResult) =>
                  onAddKeyResult(objective.id, keyResult)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

ObjectiveList.propTypes = {
  objectives: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      keyResults: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          target: PropTypes.number.isRequired,
          current: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  onAddKeyResult: PropTypes.func.isRequired,
  onEditKeyResult: PropTypes.func.isRequired,
  onDeleteKeyResult: PropTypes.func.isRequired,
  onUpdateProgress: PropTypes.func.isRequired,
  onEditObjective: PropTypes.func.isRequired,
  onDeleteObjective: PropTypes.func.isRequired,
};

export default ObjectiveList;
