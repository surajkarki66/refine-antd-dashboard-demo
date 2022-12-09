import { useState } from "react";
import { useForm, useNavigation, useSelect } from "@pankod/refine-core";

import { ITodo } from "../../interfaces";

export const CustomTodoCreate: React.FC = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    desc: "",
    owner: "",
  });
  const { formLoading, onFinish, redirect } = useForm<ITodo>({
    redirect: false, // it means after creating the todo it doesn't redirect to todo list page
  });
  const { goBack } = useNavigation();

  const { options } = useSelect({
    resource: "users",
    optionLabel: "username",
    optionValue: "id",
  });

  const handleSubmit = async (redirectTo: "list" | "edit" | "create") => {
    const response = await onFinish(formValues);

    setFormValues({
      title: "",
      desc: "",
      owner: "",
    });
    redirect(redirectTo, response?.data?.id);
  };
  return (
    <div>
      <button className="back" onClick={() => goBack()}>
        Go Back
      </button>
      <form className="form-wrapper">
        <div className="form-group">
          <label>Title: </label>
          <input
            required
            onChange={(e) =>
              setFormValues({
                ...formValues,
                title: e.target.value,
              })
            }
            value={formValues.title}
          />
        </div>
        <div className="form-group">
          <label>Owner: </label>
          <select
            required
            onChange={(e) =>
              setFormValues({
                ...formValues,
                owner: e.target.value,
              })
            }
            value={formValues.owner}
          >
            <option value={""} disabled>
              Please select
            </option>
            {options?.map((user) => (
              <option key={user.value} value={user.value}>
                {user.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>

          <textarea
            required
            onChange={(e) =>
              setFormValues({
                ...formValues,
                desc: e.target.value,
              })
            }
            rows={10}
            cols={50}
            value={formValues.desc}
          />
        </div>
        <div className="saveActions">
          <button onClick={() => handleSubmit("list")} type="button">
            Save
          </button>
          <button onClick={() => handleSubmit("edit")} type="button">
            Save and continue editing
          </button>
          <button onClick={() => handleSubmit("create")} type="button">
            Save and add another
          </button>
        </div>
        {formLoading && <p>Loading</p>}
      </form>
    </div>
  );
};
