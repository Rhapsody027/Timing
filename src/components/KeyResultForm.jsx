import { useState } from "react";
import PropTypes from "prop-types";

function KeyResultForm({ onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    target: 100,
    current: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSubmit(formData);
    setFormData({ title: "", target: 100, current: 0 });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="btn btn-ghost btn-sm">
        + 新增關鍵結果
      </button>
    );
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-2xl font-bold mb-4">新增關鍵結果</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">關鍵結果標題</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="input input-bordered w-full"
              placeholder="輸入關鍵結果標題"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">目標值</span>
            </label>
            <input
              type="number"
              value={formData.target}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  target: parseInt(e.target.value) || 0,
                }))
              }
              className="input input-bordered w-full"
              min="1"
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

KeyResultForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default KeyResultForm;
