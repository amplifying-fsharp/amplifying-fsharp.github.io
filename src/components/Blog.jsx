function Blog({ blogEntries }) {
  const entries = blogEntries.sort((a, b) => b.data.date - a.data.date);
  return (
    <div>
      <ul>
        {
          <div id="blog">
            {entries.map((blog, idx) => {
              return (
                <li key={idx} className={"d-flex justify-content-center mt-5"}>
                  <a
                    href={`/blog/${blog.slug}`}
                    key={`${blog.id}_${idx}`}
                  >
                    <h3>{blog.data.title}</h3>
                    <div>
                      <time>{blog.data.date.toLocaleDateString()}</time>
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

export default Blog;
