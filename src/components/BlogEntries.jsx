function BlogEntries({ blogentries }) {
  const entries = blogentries.sort((a, b) => b.data.date - a.data.date);
  return (
    <div>
      <ul>
        {
          <div id="blogentries">
            {entries.map((blogentry, idx) => {
              return (
                <li key={idx} className={"d-flex justify-content-center mt-5"}>
                  <a
                    href={`/blogentries/${blogentry.slug}`}
                    key={`${blogentry.id}_${idx}`}
                  >
                    <h3>{blogentry.data.title}</h3>
                    <div>
                      <time>{blogentry.data.date.toLocaleDateString()}</time>
                    </div>
                  </a>
                </li>
              );
            })}
          </div>
        }
      </ul>
    </div>
  );
}

export default BlogEntries;
