import react from 'react'
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { FolderName } from '../configFolder'
import fs from 'fs'
import path from 'path'

const Post = props => {
  return (<>
    {Object.keys(props).length ? <ReactMarkdown
      escapeHtml={false}
      source={props.content}
    /> : null}
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
      content
    }
  }
}

export default Post