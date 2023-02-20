import { useForm } from "react-hook-form";

const JoinUsForm = () => {
  const { register, handleSubmit, watch, getValues, setValue } = useForm();
  const onSubmit = (data, _e) => {
    console.log(data);
    alert(
      "At this point, we should construct an issue link to our sessions GitHub repo."
    );
  };
  const onError = (errors, e) => console.log(`Errors: ${errors}`);
  watch("itch");
  const itch = getValues("itch");

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="mb-3">
        <label className="form-label">
          Your name<strong>&nbsp;&#x2a;</strong>
        </label>
        <input
          type="text"
          className="form-control"
          {...register("name", { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Company name</label>
        <input type="text" className="form-control" {...register("company")} />
        <div className="form-text">
          Don't worry this field is optional, you are also most welcome as an
          individual contributor.
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Your timezone<strong>&nbsp;&#x2a;</strong>
        </label>
        <input
          type="text"
          className="form-control"
          {...register("timezone", { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          What kind of itch do you have<strong>&nbsp;&#x2a;</strong>
        </label>
        <div
          className="btn-group mb-3"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            {...register("itch", { required: true })}
            autoComplete="off"
            value="issue"
          />
          <label
            className="btn btn-outline-secondary"
            onClick={() => setValue("itch", "issue", { shouldDirty: true })}
          >
            Fix a specific issue
          </label>

          <input
            type="radio"
            className="btn-check"
            {...register("itch", { required: true })}
            autoComplete="off"
            value="project"
          />
          <label
            className="btn btn-outline-secondary"
            onClick={() => setValue("itch", "project", { shouldDirty: true })}
          >
            Work on a specific project
          </label>

          <input
            type="radio"
            className="btn-check"
            {...register("itch", { required: true })}
            autoComplete="off"
            value="unknown"
          />
          <label
            className="btn btn-outline-secondary"
            onClick={() => setValue("itch", "unknown", { shouldDirty: true })}
          >
            Still trying to figure it out.
          </label>
        </div>
      </div>
      {itch === "issue" && (
        <div className="mb-3">
          <label className="form-label">Issue link</label>
          <input
            type="text"
            className="form-control"
            {...register("issue-link")}
            required={itch === "issue"}
          />
        </div>
      )}
      {itch === "project" && (
        <div className="mb-3">
          <label className="form-label">Project link</label>
          <input
            type="text"
            className="form-control"
            {...register("project-link")}
            list="projects"
            required={itch === "project"}
          />
          <datalist id="projects">
            <option>https://github.com/dotnet/fsharp</option>
            <option>https://github.com/fsharp/fsautoComplete</option>
            <option>https://github.com/JetBrains/resharper-fsharp</option>
            <option>https://github.com/ionide/proj-info</option>
            <option>https://github.com/ionide/ionide-vscode-fsharp</option>
            <option>https://github.com/fsprojects/fantomas</option>
            <option>https://github.com/fsprojects/FSharp.Formatting</option>
          </datalist>
        </div>
      )}
      {itch === "unknown" && (
        <div className="mb-3">
          <label className="form-label">Tell us about your quest?</label>
          <textarea
            className="form-control"
            {...register("description")}
            rows={3}
            required={itch === "unknown"}
          />
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">
          Is there anything else we need to know
        </label>
        <textarea className="form-control" {...register("extra")} rows={3} />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default JoinUsForm;
