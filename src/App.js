import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import MostStock from './components/mostStock/App'
import LowestStock from './components/lowestStock/App'
import DataProduct from './components/dataProduct/App'
import './App.css';

export default function App() {

  useEffect(() => {
    document.title = "Data Product"
  })

  return (
    <Container> 
      {/* Start Data Product With the Most Stok */}
      <div className="mt-3">
        <MostStock />
      </div>
      {/* End Data Product With the Most Stok */}
      
      {/* Start Data Product With the Lowes Stok */}
      <div className="mt-5">        
        <LowestStock />
      </div>
      {/* End Data Product With the Lowes Stok */}

      {/* Start Data Product */}
      <div className="mt-5">
        <DataProduct />
      </div>
      {/* End Data Product */}
    </Container>
  )
}