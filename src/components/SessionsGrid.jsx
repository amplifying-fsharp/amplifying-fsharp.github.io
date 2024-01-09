import styled from "styled-components";

function addTwoHours(d) {
  d.setHours(d.getHours() + 2);
  return d;
}

const StyledDiv = styled.div`
  .grid-container {
    margin-bottom: var(--spacing-300);

    @media screen and (min-width: 768px) {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--spacing-300);
    }
  }

  .grid-container a {
    display: block;
    box-sizing: border-box;
    text-decoration: none;
    color: var(--white);
    margin-bottom: var(--spacing-300);
    position: relative;
    padding: var(--spacing-300);
    aspect-ratio: 16 / 9;
    background-size: contain;
    transition: all 200ms;

    & h3 {
      margin-top: 0;
    }

    & h4 {
      margin: 0;
    }

    @media screen and (min-width: 768px) {
      margin-bottom: 0;
      width: calc(var(--container-sm) / 2 - var(--spacing-300));

      & h3 {
        font-size: var(--font-400);
      }

      & h4 {
        font-size: var(--font-300);
      }
    }

    @media screen and (min-width: 1024px) {
      width: calc(var(--container-xl) / 3 - var(--spacing-300));

      & h3 {
        font-size: var(--font-500);
      }

      & h4 {
        font-size: var(--font-400);
      }
    }

    @media screen and (min-width: 1200px) {
      width: calc(var(--container-xxl) / 3 - var(--spacing-300));
    }
  }

  #upcoming-sessions a {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    transition: all 200ms;

    &:hover {
      box-shadow: 0 2px 2px var(--shadow-color);
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      > h4 {
        font-size: 1rem;
        text-align: right;
      }

      > time {
        font-weight: bold;
        font-size: 1rem;
      }
    }
  }

  #upcoming-sessions a:nth-child(3n + 1) {
    background-color: var(--cyan-500);
    color: var(--white);

    &:hover {
      outline: 1px solid var(--cyan-200);
    }
  }

  #upcoming-sessions a:nth-child(3n + 2) {
    background-color: var(--yellow-400);
    color: var(--key-950);
    outline: 1px solid transparent;

    &:hover {
      outline: 1px solid var(--yellow-200);
    }
  }

  #upcoming-sessions a:nth-child(3n + 3) {
    background-color: var(--magenta-500);
    color: var(--white);

    &:hover {
      outline: 1px solid var(--magenta-200);
    }
  }

  #past-sessions a {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    & h4 {
      text-align: right;
    }

    & h3,
    & h4 {
      z-index: 1;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.25);
      z-index: 0;
      transition: all 200ms;
    }

    &:hover {
      color: var(--white);
    }

    &:nth-child(3n + 1):hover .overlay {
      background-color: rgba(34, 238, 235, 0.33);
      outline: 3px solid var(--cyan-50);
    }

    &:nth-child(3n + 2):hover .overlay {
      background-color: rgba(255, 249, 137, 0.4);
      outline: 3px solid var(--yellow-50);
    }

    &:nth-child(3n + 3):hover .overlay {
      background-color: rgba(204, 164, 206, 0.33);
      outline: 3px solid var(--magenta-50);
    }
  }

  #no-new-sessions {
    background: var(--magenta-900);
    display: block;
    width: 300px;
    color: var(--white);
    font-size: var(--font-400);
    padding: var(--spacing-300);
    border-radius: var(--radius);
    margin: auto;
    text-align: center;
  }

  #no-new-sessions a {
    color: var(--magenta-400);
  }
`;

function SessionsGrid({ sessions }) {
  const pastSessions = sessions
    .filter((session) => {
      return session.date < addTwoHours(new Date());
    })
    .sort((a, b) => b.date - a.date);
  const upcomingSessions = sessions
    .filter((session) => session.date > addTwoHours(new Date()))
    .sort((a, b) => b.date - a.date);
  return (
    <StyledDiv>
      {upcomingSessions.length === 0 ? (
        <p id="no-new-sessions">
          No news sessions in sight 😔.
          <br />
          Please submit one <a href="/join-us">here</a>!
        </p>
      ) : (
        <>
          <h2>On the next Amplifying F#!</h2>
          <div id="upcoming-sessions" className={"grid-container"}>
            {upcomingSessions.map((session, idx) => {
              return (
                <a
                  href={`/sessions/${session.slug}`}
                  key={`${session.id}_${idx}`}
                >
                  <h3>{session.title}</h3>
                  <div>
                    <time>{session.date.toLocaleDateString()}</time>
                    <h4>with {session.champion}</h4>
                  </div>
                </a>
              );
            })}
          </div>
        </>
      )}
      <>
        <h2>Past sessions</h2>
        <div id="past-sessions" className={"grid-container"}>
          {pastSessions.map((session) => {
            const thumbnail = session.youtubeId
              ? `url('https://img.youtube.com/vi/${session.youtubeId}/mqdefault.jpg')`
              : `url(${session.thumbnail})`;
            return (
              <a
                href={`/sessions/${session.slug}`}
                style={{
                  background: thumbnail,
                  backgroundSize: "cover",
                  backgroundBlendMode: "multiply",
                  backgroundColor: "grey",
                }}
                key={session.id}
              >
                <div className="overlay"></div>
                <h3>{session.title}</h3>
                <h4>with {session.champion}</h4>
              </a>
            );
          })}
        </div>
      </>
    </StyledDiv>
  );
}

export default SessionsGrid;
