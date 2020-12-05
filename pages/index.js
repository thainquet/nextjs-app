import React from "react";
import Head from "next/head"
import matter from "gray-matter";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FolderName } from '../configFolder'

const Index = ({ data, title, description }) => {
  const RealData = data.map((blog) => matter(blog));
  const ListItems = RealData.map((listItem) => listItem.data);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={description}></meta>
        <title>{title}</title>
      </Head>
      <div className="container">
        <div className="col-md-4"></div>
        <h1>Index</h1>
        <div>
          <ul>
            {ListItems.map((blog, i) => (
              <li key={i}>
                <Link href={`/${blog.slug}`}>
                  <a>{blog.title}</a>
                </Link>
                <p>{blog.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
};

export default Index;


export async function getStaticProps() {
  const siteData = await import(`../config.json`);
  const fs = require("fs");
  let basePath = process.cwd()
  let allFiles = []
  FolderName.forEach(fname => {
    let data = {
      "name": fs.readdirSync(basePath + '/' + fname)[0],
      "path": basePath + '/' + fname
    }
    allFiles.push(data)
  })
  const allMarkdownFiles = allFiles.filter(file => file.name.endsWith('.md'))

  const data = allMarkdownFiles.map((blog) => {
    console.log(blog.path)
    const path = `${blog.path}/${blog.name}`;
    const rawContent = fs.readFileSync(path, {
      encoding: "utf-8",
    });

    return rawContent;
  });

  return {
    props: {
      data: data,
      title: siteData.default.title,
      description: siteData.default.description,
    },
  };
}
