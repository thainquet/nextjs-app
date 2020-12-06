import react from 'react'
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { FolderName } from '../configFolder'

const Post = props => {
  console.log(props)
  return (<>
    <div>Post:</div>
    <ReactMarkdown
      escapeHtml={false}
      source={props.content}
    />
  </>)
}

Post.getInitialProps = async (context) => {
  let { fileName } = context.query
  const fs = require('fs')
  const path = require('path')
  let content = ""
  FolderName.forEach(fn => {
    const link = path.join(process.cwd(), fn, fileName + ".md")
    if (fs.existsSync(link)) {
      content = fs.readFileSync(link, {
        encoding: "utf-8",
      });
      console.log(content)
    }
  })
  return {
    file: fileName,
    content
  }
}

export default Post