import { useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const StyledForm = styled.form`
  background-color: var(--cyan-300);
  padding: var(--spacing-200);
  max-width: var(--container-sm);

  > div {
    margin-bottom: var(--spacing-500);

    > label {
      display: block;
      margin-bottom: var(--spacing-200);
      font-weight: 500;
    }

    > input[type="text"],
    > textarea {
      outline: 2px solid var(--cyan-700);
      border: none;
      border-radius: var(--radius);
      padding: var(--spacing-100);

      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }

      @media screen and (min-width: 768px) {
        min-width: 50%;
      }
    }

    .form-text {
      color: var(--cyan-800);
      margin-block: var(--spacing-300);
    }
  }

  #itch-container {
    display: flex;
    border: 2px solid var(--cyan-200);
    border-radius: var(--radius);
    background-color: var(--cyan-50);
    input[type="radio"] {
      display: none;
    }

    label {
      color: var(--cyan-800);
      flex: 1;
      @media screen and (min-width: 768px) {
        white-space: nowrap;
      }
      border-radius: var(--radius);
      display: block;
      padding: var(--spacing-100) var(--spacing-200);
      cursor: pointer;

      &:hover {
        background-color: var(--cyan-600);
        color: var(--white);
        outline: 2px solid var(--cyan-700);
      }

      &:active {
        background-color: var(--cyan-900);
      }
    }

    input[type="radio"]:checked + label {
      outline: 2px solid var(--cyan-700);
      color: var(--cyan-900);

      &:hover {
        color: var(--white);
      }
    }
  }

  button[type="submit"] {
    background-color: var(--cyan-800);
    color: var(--white);
    float: right;

    &:hover {
      background-color: var(--cyan-700);
    }

    &:active {
      background-color: var(--cyan-900);
    }
  }
`;

const JoinUsForm = () => {
  const linkRef = useRef();

  const { register, handleSubmit, watch, getValues, setValue, reset } =
    useForm();
  const onSubmit = (data, _e) => {
    console.log(data);
    const {
      topic,
      name,
      company,
      timezone,
      itch,
      issue,
      project,
      description,
      extra,
    } = data;
    const title = `New session about ${topic}`;
    const fromCompany = company && `, from ${company},`;
    const tackle = (() => {
      switch (itch) {
        case "issue":
          return issue;
        case "project":
          return project;
        default:
          return description;
      }
    })();

    const body = `
### Session on ${topic}

${name}${fromCompany} in ${timezone} would like to tackle:
${tackle}

#### Extra

${extra}
    `;
    console.log(body);
    const href = `https://github.com/amplifying-fsharp/sessions/issues/new?title=${encodeURIComponent(
      title,
    )}&body=${encodeURIComponent(body)}`;
    linkRef.current.setAttribute("href", href);
    linkRef.current.click();
    reset();
  };
  const onError = (errors, e) => console.log("Errors: ", errors);
  watch("itch");
  const itch = getValues("itch");

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <label>
          Your name?<strong>&nbsp;&#x2a;</strong>
        </label>
        <input
          type="text"
          placeholder={"John Doe"}
          {...register("name")}
          required
        />
      </div>
      <div>
        <label>Company name?</label>
        <input
          type="text"
          placeholder={"Contoso Inc"}
          {...register("company")}
        />
        <div className="form-text">
          Don't worry this field is optional, you are also most welcome as an
          individual contributor.
        </div>
      </div>
      <div>
        <label>
          Your timezone?<strong>&nbsp;&#x2a;</strong>
        </label>
        <input
          type="text"
          placeholder={"CET"}
          {...register("timezone")}
          required
        />
      </div>
      <div>
        <label>
          Your topic?<strong>&nbsp;&#x2a;</strong>
        </label>
        <input
          type="text"
          placeholder={"Working on Ionide"}
          {...register("topic")}
          required
        />
      </div>
      <div>
        <label>
          What kind of itch do you have?<strong>&nbsp;&#x2a;</strong>
        </label>
        <div id="itch-container">
          <input
            type="radio"
            {...register("itch", { required: true })}
            autoComplete="off"
            value="issue"
          />
          <label
            onClick={() => setValue("itch", "issue", { shouldDirty: true })}
          >
            Fix a specific issue
          </label>

          <input
            type="radio"
            {...register("itch", { required: true })}
            autoComplete="off"
            value="project"
          />
          <label
            onClick={() => setValue("itch", "project", { shouldDirty: true })}
          >
            Work on a specific project
          </label>

          <input
            type="radio"
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
        <div>
          <label>Issue link</label>
          <input
            type="text"
            {...register("issue")}
            placeholder={"A link to a specific OSS issue."}
            required={itch === "issue"}
          />
        </div>
      )}
      {itch === "project" && (
        <div>
          <label>Project link</label>
          <input
            type="text"
            placeholder={"A link to your favorite OSS project."}
            {...register("project")}
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
        <div>
          <label>Tell us about your quest?</label>
          <textarea
            placeholder={"Describe the change you want to see in the world."}
            {...register("description")}
            rows={3}
            required={itch === "unknown"}
          />
        </div>
      )}
      <div>
        <label>Is there anything else we need to know?</label>
        <textarea
          placeholder={"Tell us what motivates you!"}
          {...register("extra")}
          rows={3}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <a href="#" ref={linkRef} target="_blank"></a>
    </StyledForm>
  );
};

export default JoinUsForm;
