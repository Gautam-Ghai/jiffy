import { prisma } from "../lib/prisma";
import Navbar from '../src/components/Navbar'
import Profile from '../src/components/Profile'
import Main from '../src/components/Main'
import Footer from '../src/components/Footer'
import { Post } from '../src/utils/types/post'

interface Props {
    posts: Post[]
}

const Home = (props: Props) => {
  return (
    <div className='mb-6'>
      <Navbar />
      <div className='flex flex-row md:space-x-8 lg:space-x-16 mt-8 md:mx-8'>
        <div>
          <Profile />
        </div>
        <Main posts={props.posts} />
      </div>
      <div className='block sm:hidden'>
        <Footer />
      </div>
    </div>
  )
}

export default Home;

export const getServerSideProps = async () => {
  try{
    const result = await prisma.post.findMany();
    const posts = JSON.parse(JSON.stringify(result))

    return {
      props: {
        posts
      }
    }
  } catch(err){
    console.log('Error', err)
  }
}