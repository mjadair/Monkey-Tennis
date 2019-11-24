import shortid from 'shortid'

const GetId = () => {
  const id = shortid.generate()
  console.log(id)
  return id
}

export default GetId