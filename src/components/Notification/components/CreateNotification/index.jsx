import { useEffect, useState } from "react";
import "./create-notification.style.css";
import { useCreateNotificationMutation } from "../../notification.query";

export const CreateNotification = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [createNotification, { loading, error }] =
    useCreateNotificationMutation();

  const [name, setName] = useState("");
  const [type, setType] = useState("SUCCESS");

  const saveHandler = (e) => {
    e.preventDefault();
    const input = {
      name,
      type,
    };
    createNotification({ variables: { input } });
    resetHandler();
  };

  useEffect(() => {
    if (!error) setIsAddOpen(false);
  }, [loading, error]);

  const resetHandler = () => {
    setIsAddOpen(false);
    setName("");
    setType("");
  };

  return (
    <div className="cn-main">
      <p>Notifications</p>

      <div
        className="cn-control-btn"
        style={{ transform: isAddOpen ? "none" : "translateX(100vw)" }}
      >
        <form className="cn-form" onSubmit={saveHandler}>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="cn-form-input"
            placeholder="Name"
          />
          <select
            className="cn-form-input"
            onChange={(e) => setType(e.target.value)}
            defaultValue={"SUCCESS"}
            value={type}
          >
            <option value="SUCCESS">SUCCESS</option>
            <option value="ERROR">ERROR</option>
            <option value="INFO">INFO</option>
          </select>

          <button type="submit" className="cn-btn save">
            <span class="material-symbols-outlined">done</span>
          </button>
          <button type="button" onClick={resetHandler} className="cn-btn close">
            <span class="material-symbols-outlined">close</span>
          </button>
        </form>
      </div>
      {!isAddOpen && (
        <button onClick={() => setIsAddOpen(true)} className="cn-btn add">
          <span class="material-symbols-outlined">add</span>
        </button>
      )}
    </div>
  );
};
