import React from "react"
import './Home.css'

const Hero = () => {
  return (
    <div className="row mt-2 justify-content-center align-items-center">
      <div className="col-sm-12 col-md-3">
        <h2 className="text-center mt-sm-5 mt-5">
          You can easily get <br/> a glipmse what's goin on the <br/> currency market.
        </h2>
      </div>
      <div className="col-sm-12 col-md-6">
        <div className="image-hero mt-sm-5 mt-5"></div>
      </div>
    </div>
  )
}



const Home = () => {
  return (
    <Hero />
  )
}

export default Home;