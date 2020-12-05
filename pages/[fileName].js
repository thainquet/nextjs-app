import react from 'react'

const Post = ({props}) => {
  return (<>
    <div>Post: {props.file}</div>
  </>)
}

Post.getInitialProps = async (context) => {
  let {fileName} = context.query

  return {
    ...{
      file: fileName
    }
  }
}

export default Post