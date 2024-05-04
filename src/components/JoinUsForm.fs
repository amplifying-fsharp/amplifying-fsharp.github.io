module Components.JoinUsForm

open Fable.Core
open type React.React
open React.DSL
open type React.DSL.DOMProps
open StyledComponents

type JoinUsFormProps = {| propName : string |}

let StyledElement : JSX.ElementType =
    mkStyleComponent
        "form"
        """
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
"""

type Itch =
    | SpecificIssue of string
    | SpecificProject of string
    | Unknown of string

    member this.IsSpecificIssueX =
        match this with
        | SpecificIssue _ -> true
        | SpecificProject _
        | Unknown (_) -> false

    member this.IsSpecificProjectX =
        match this with
        | SpecificIssue _
        | Unknown _ -> false
        | SpecificProject _ -> true

    member this.IsUnknownX =
        match this with
        | Unknown _ -> true
        | SpecificIssue (_)
        | SpecificProject (_) -> false

type Model =
    {
        Name : string
        Company : string
        Timezone : string
        Topic : string
        Itch : Itch
        AnythingElse : string
    }

    static member Zero : Model =
        {
            Name = ""
            Company = ""
            Timezone = ""
            Topic = ""
            Itch = SpecificIssue ""
            AnythingElse = ""
        }

let submitForm (model : Model) (linkElement : Browser.Types.HTMLElement) (ev : Browser.Types.Event) =
    ev.preventDefault ()

    let fromCompany =
        if System.String.IsNullOrWhiteSpace model.Company then
            ""
        else
            $", from %s{model.Company}"

    let tackle =
        match model.Itch with
        | Itch.SpecificIssue issue -> issue
        | Itch.SpecificProject project -> project
        | Itch.Unknown description -> description

    let body =
        $"""
### Session on %s{model.Topic}

%s{model.Name}%s{fromCompany} in %s{model.Timezone} would like to tackle:
%s{tackle}

#### Extra

%s{model.AnythingElse}
"""

    let href =
        $"https://github.com/amplifying-fsharp/sessions/issues/new?title=%s{JS.encodeURIComponent (model.Topic)}&body=%s{JS.encodeURIComponent (body)}"

    linkElement.setAttribute ("href", href)
    linkElement.click ()

[<ExportDefault>]
let JoinUsForm () : JSX.Element =
    let linkRef = useRef ()
    let model, setModel = useStateByFunction (Model.Zero)

    JS.console.log (linkRef)

    JSX.create StyledElement [
        "onSubmit", (submitForm model linkRef.current)
        "children",
        [
            div [ Key "name" ] [
                label [] [ str "Your name?" ; strong [] [ str "&nbsp;&#x2a;" ] ]
                input [
                    Type "text"
                    Placeholder "John Doe"
                    Required true
                    DefaultValue model.Name
                    OnChange (fun ev -> setModel (fun m -> { m with Name = ev.Value }))
                ]
            ]
            div [ Key "company" ] [
                label [] [ str "Company name?" ]
                input [
                    Type "text"
                    Placeholder "Contoso Inc"
                    Required true
                    DefaultValue model.Company
                    OnChange (fun ev -> setModel (fun m -> { m with Company = ev.Value }))
                ]
                div [ ClassName "form-text" ] [
                    str "Don't worry this field is optional, you are also most welcome as an individual contributor."
                ]
            ]
            div [ Key "timezone" ] [
                label [] [ str "Your timezone?" ; strong [] [ str "&nbsp;&#x2a;" ] ]
                input [
                    Type "text"
                    Placeholder "CET"
                    Required true
                    DefaultValue model.Timezone
                    OnChange (fun ev -> setModel (fun m -> { m with Timezone = ev.Value }))
                ]
            ]
            div [ Key "topic" ] [
                label [] [ str "Your topic?" ; strong [] [ str "&nbsp;&#x2a;" ] ]
                input [
                    Type "text"
                    Placeholder "Working on Ionide"
                    Required true
                    DefaultValue model.Topic
                    OnChange (fun ev -> setModel (fun m -> { m with Topic = ev.Value }))
                ]
            ]
            div [ Key "itch" ] [
                label [] [
                    str "What kind of itch do you have?"
                    strong [] [ str "&nbsp;&#x2a;" ]
                    div [ Id "itch-container" ] [
                        input [
                            Type "radio"
                            Name "itch"
                            AutoComplete "off"
                            Required true
                            Value "issue"
                            Checked (model.Itch.IsSpecificIssueX)
                        ]
                        label [
                            "for", "issue"
                            OnClick (fun ev ->
                                ev.preventDefault ()
                                setModel (fun m -> { m with Itch = Itch.SpecificIssue "" })
                            )
                        ] [ str "Fix a specific issue" ]
                        input [
                            Type "radio"
                            Name "itch"
                            AutoComplete "off"
                            Required true
                            Value "project"
                            Checked (model.Itch.IsSpecificProjectX)
                        ]
                        label [
                            "for", "project"
                            OnClick (fun ev ->
                                ev.preventDefault ()

                                setModel (fun m ->
                                    { m with
                                        Itch = Itch.SpecificProject ""
                                    }
                                )
                            )
                        ] [ str "Work on a specific project" ]
                        input [
                            Type "radio"
                            Name "itch"
                            AutoComplete "off"
                            Required true
                            Value "unknown"
                            Checked (model.Itch.IsUnknownX)

                        ]
                        label [
                            "for", "unknown"
                            OnClick (fun ev ->
                                ev.preventDefault ()
                                setModel (fun m -> { m with Itch = Itch.Unknown "" })
                            )
                        ] [ str "Still trying to figure it out." ]
                    ]
                ]
            ]
            match model.Itch with
            | SpecificIssue issueText ->
                div [ Key "issue" ] [
                    label [] [ str "Issue link" ]
                    input [
                        Type "text"
                        Placeholder "A link to a specific OSS issue"
                        DefaultValue issueText
                        OnChange (fun ev -> setModel (fun m -> { m with Itch = SpecificIssue ev.Value }))
                        Required false
                    ]
                ]
            | SpecificProject projectText ->
                div [ Key "project" ] [
                    label [] [ str "Project link" ]
                    input [
                        Type "text"
                        Placeholder "A link to your favorite OSS project."
                        List "projects"
                        Required false
                        DefaultValue projectText
                        OnChange (fun ev ->
                            setModel (fun m ->
                                { m with
                                    Itch = Itch.SpecificProject ev.Value
                                }
                            )
                        )
                    ]
                    datalist [ Id "projects" ] [
                        option [] [ str "https://github.com/dotnet/fsharp" ]
                        option [] [ str "https://github.com/fsharp/fsautoComplete" ]
                        option [] [ str "https://github.com/JetBrains/resharper-fsharp" ]
                        option [] [ str "https://github.com/ionide/proj-info" ]
                        option [] [ str "https://github.com/ionide/ionide-vscode-fsharp" ]
                        option [] [ str "https://github.com/fsprojects/fantomas" ]
                        option [] [ str "https://github.com/fsprojects/FSharp.Formatting" ]
                    ]
                ]
            | Unknown text ->
                div [ Key "unknown" ] [
                    label [] [ str "Tell us about your quest?" ]
                    textarea [
                        Placeholder "Describe the change you want to see in the world."
                        Rows 3
                        Required false
                        DefaultValue text
                        OnChange (fun ev -> setModel (fun m -> { m with Itch = Itch.Unknown ev.Value }))
                    ] []
                ]
            div [ Key "anything-else" ] [
                label [] [ str "Is there anything else we need to know?" ]
                textarea [
                    Placeholder "Tell us what motivates you!"
                    Rows 3
                    Required false
                    OnChange (fun ev -> setModel (fun m -> { m with AnythingElse = ev.Value }))
                ] []
            ]
            button [ Key "submit" ; Type "submit" ] [ str "Submit" ]
            a [ Key "link" ; Href "#" ; Ref linkRef ; Target "_blank" ] []
        ]
    ]
