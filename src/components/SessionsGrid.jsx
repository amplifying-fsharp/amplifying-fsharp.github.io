function addTwoHours(d) {
  d.setHours(d.getHours() + 2);
  return d;
}

function SessionsGrid({ sessions }) {
  const pastSessions = sessions
    .filter((session) => {
      return session.data.date < addTwoHours(new Date());
    })
    .sort((a, b) => b.data.date - a.data.date);
  const upcomingSessions = sessions
    .filter((session) => session.data.date > addTwoHours(new Date()))
    .sort((a, b) => b.data.date - a.data.date);
  return (
    <>
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
                  <h3>{session.data.title}</h3>
                  <div>
                    <time>{session.data.date.toLocaleDateString()}</time>
                    <h4>with {session.data.champion}</h4>
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
            const thumbnail = session.data.youtubeId
              ? `url('https://img.youtube.com/vi/${session.data.youtubeId}/mqdefault.jpg')`
              : `url(${session.data.thumbnail})`;
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
                <h3>{session.data.title}</h3>
                <h4>with {session.data.champion}</h4>
              </a>
            );
          })}
        </div>
      </>
    </>
  );
}

export default SessionsGrid;
