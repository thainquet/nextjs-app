import react from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head"

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter showLineNumbers={true} language={language}>
      {value}
    </SyntaxHighlighter>
  );
};

const Blog = ({ content, data }) => {
  const frontmatter = data;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={frontmatter.description}></meta>
        <title>{frontmatter.title}</title>
      </Head>
      <div className="container">
        <h1>{frontmatter.title}</h1>
        <h3>{frontmatter.description}</h3>
        <ReactMarkdown
          escapeHtml={false}
          source={content}
          renderers={{ code: CodeBlock }}
        />
      </div>
      <style jsx global>{`
        img {
          max-width: 75%
        }
      `}</style>
    </>
  );
};

export default Blog;

Blog.getInitialProps = async (context) => {
  const { blog } = context.query;
  // Import our .md file using the `slug` from the URL
  const content = await import(`../content/${blog}.md`);
  const data = matter(content.default);

  return { ...data };
};
