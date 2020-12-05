import fs from 'fs'
import matter from "gray-matter";
import path from 'path'

export function getPostData(id) {
    const fullPath = path.join(process.cwd(), `pages/crpt/${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
  
    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  }