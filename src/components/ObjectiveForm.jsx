import { useState } from "react";
import PropTypes from "prop-types";

function ObjectiveForm({ onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSubmit(formData);
    setFormData({ title: "", description: "" });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="btn btn-primary">
        新增目標
      </button>
    );
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-2xl font-bold mb-4">新增目標</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">目標標題</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="input input-bordered w-full"
              placeholder="輸入目標標題"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">目標描述</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="textarea textarea-bordered h-24"
              placeholder="輸入目標描述"
            />
          </div>
          <div className="modal-action">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn"
            >
              取消
            </button>
            <button type="submit" className="btn btn-primary">
              確認
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={() => setIsOpen(false)}></div>
    </div>
  );
}

ObjectiveForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ObjectiveForm;
