import { useState, useEffect } from "react";
import ObjectiveList from "./ObjectiveList";
import ObjectiveForm from "./ObjectiveForm";

const STORAGE_KEY = "okr_objectives";

const defaultObjectives = [
  {
    id: 1,
    title: "提升團隊生產力",
    description: "在Q1提升團隊整體工作效率",
    keyResults: [
      { id: 1, title: "減少20%的會議時間", target: 20, current: 10 },
      { id: 2, title: "提高代碼審查速度30%", target: 30, current: 15 },
    ],
  },
];

function loadObjectives() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultObjectives;
  } catch (error) {
    console.error("讀取本地儲存時發生錯誤:", error);
    return defaultObjectives;
  }
}

function saveObjectives(objectives) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(objectives));
  } catch (error) {
    console.error("保存到本地儲存時發生錯誤:", error);
  }
}

function OKRTracker() {
  const [objectives, setObjectives] = useState(() => loadObjectives());

  // 當 objectives 改變時保存到本地儲存
  useEffect(() => {
    saveObjectives(objectives);
  }, [objectives]);

  const addObjective = (newObjective) => {
    setObjectives((prev) => [
      ...prev,
      {
        ...newObjective,
        id: Date.now(),
        keyResults: [],
      },
    ]);
  };

  const editObjective = (objectiveId, updatedData) => {
    setObjectives((prev) =>
      prev.map((obj) =>
        obj.id === objectiveId
          ? {
              ...obj,
              title: updatedData.title,
              description: updatedData.description,
            }
          : obj
      )
    );
  };

  const deleteObjective = (objectiveId) => {
    setObjectives((prev) => prev.filter((obj) => obj.id !== objectiveId));
  };

  const addKeyResult = (objectiveId, keyResult) => {
    setObjectives((prev) =>
      prev.map((obj) => {
        if (obj.id === objectiveId) {
          return {
            ...obj,
            keyResults: [...obj.keyResults, { ...keyResult, id: Date.now() }],
          };
        }
        return obj;
      })
    );
  };

  const editKeyResult = (objectiveId, keyResultId, updatedData) => {
    setObjectives((prev) =>
      prev.map((obj) => {
        if (obj.id === objectiveId) {
          return {
            ...obj,
            keyResults: obj.keyResults.map((kr) =>
              kr.id === keyResultId
                ? {
                    ...kr,
                    title: updatedData.title,
                    target: updatedData.target,
                  }
                : kr
            ),
          };
        }
        return obj;
      })
    );
  };

  const deleteKeyResult = (objectiveId, keyResultId) => {
    setObjectives((prev) =>
      prev.map((obj) => {
        if (obj.id === objectiveId) {
          return {
            ...obj,
            keyResults: obj.keyResults.filter((kr) => kr.id !== keyResultId),
          };
        }
        return obj;
      })
    );
  };

  const updateKeyResultProgress = (objectiveId, keyResultId, newProgress) => {
    setObjectives((prev) =>
      prev.map((obj) => {
        if (obj.id === objectiveId) {
          return {
            ...obj,
            keyResults: obj.keyResults.map((kr) =>
              kr.id === keyResultId ? { ...kr, current: newProgress } : kr
            ),
          };
        }
        return obj;
      })
    );
  };

  return (
    <div className="container max-w-9/12 lg:mx-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">OKR 追蹤</h1>
        <ObjectiveForm onSubmit={addObjective} />
      </div>
      <ObjectiveList
        objectives={objectives}
        onAddKeyResult={addKeyResult}
        onEditKeyResult={editKeyResult}
        onDeleteKeyResult={deleteKeyResult}
        onUpdateProgress={updateKeyResultProgress}
        onEditObjective={editObjective}
        onDeleteObjective={deleteObjective}
      />
    </div>
  );
}

export default OKRTracker;
