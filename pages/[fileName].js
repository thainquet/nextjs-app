import react from 'react'
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { FolderName } from '../configFolder'
import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter showLineNumbers={true} language={language}>
      {value}
    </SyntaxHighlighter>
  );
};

const Header = props => {
  const { title } = props
  return <h1>{title}</h1>
}

const Post = props => {
  const { detail, content } = props
  return (<>
    {detail ?
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="Description" content={detail.description}></meta>
          <title>{detail.title}</title>
        </Head>
        <div className="container">
          <Header title={detail.title} />
          {Object.keys(props).length ? <ReactMarkdown
            escapeHtml={false}
            source={content}
            renderers={{ code: CodeBlock }}
          /> : null}
        </div>
      </> : null}
  </>)
}

export async function getStaticPaths() {
  let basePath = process.cwd()
  let allFiles = []
  FolderName.forEach(fname => {
    allFiles.push(fs.readdirSync(basePath + '/' + fname)[0])
  })
  const allMarkdownFiles = allFiles.filter(file => file.endsWith('.md')).map(i => i.replace(".md", ""))
  const paths = allMarkdownFiles.map(f => ({ params: { fileName: f } }))
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps(context) {
  let { fileName } = context.params
  let content = ""
  FolderName.forEach(fn => {
    const link = path.join(process.cwd(), fn, fileName + ".md")
    if (fs.existsSync(link)) {
      content = fs.readFileSync(link, {
        encoding: "utf-8",
      });
    }
  })

  return {
    props: {
      fileName,
      content: matter(content).content,
      detail: matter(content).data
    }
  }
}

export default Post