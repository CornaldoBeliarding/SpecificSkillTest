import { FaStar } from "react-icons/fa"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Table, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import Title from '../title/App'

export default function LowestStock() {
    const [data, setData] = useState([])
    const [isListView, setIsListView] = useState(false)

    useEffect(() => {
        async function getData() {
            try {
                const file = '/data/data.json'
                const response = await axios.get(file)

                const sort = response.data.data.sort((a, b) => b.stock - a.stock)

                const slice = sort.slice(0, 10)

                setData(slice)
            } catch (e) {
                console.error(e)
            }
        }

        getData()
    }, [])

    const handleToggleChange = (value) => {
        setIsListView(value === 1)
    }

    return (
        <div>
            <Row className="p-3 rounded align-items-center mb-4" style={{backgroundColor: '#D4F1F4'}}>
                <Col className="d-flex align-items-center">
                    <Title text={'product data with the most stock'} />
                </Col>

                <Col className="d-flex justify-content-end">
                    <ToggleButtonGroup type="radio" name="viewOptions" defaultValue={0} value={isListView ? 1 : 0} onChange={handleToggleChange}>
                        <ToggleButton id="most-check-1" value={0}>Box View</ToggleButton>
                        <ToggleButton id="most-check-2" value={1}>List View</ToggleButton>
                    </ToggleButtonGroup>
                </Col>
            </Row>
            
            {!isListView ? (
                <>
                    {/* Tampilan Box */}
                    <Row>
                        {
                            data.map((item, index) => (
                                <Col lg={3} md={6} sm={12} className='d-flex justify-content-center mb-4' key={index}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={item.primary_image.thumbnail} />
                                        <Card.Body>
                                            <Card.Title style={{WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: 'hidden', textOverflow: "ellipsis", display: '-webkit-box'}}>{item.name}</Card.Title>
                                            <Card.Text>
                                                <h6>{item.price.text_idr}</h6>
                                                <h6 className='mt-2'>Stok: {item.stock}</h6>
                                                <h5 className='mt-2 d-flex align-items-center gap-2'><FaStar color="orange" /> {item.stats.averageRating ? item.stats.averageRating : 0}</h5>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                    {/* End Tampilan Box */}
                </>
            ) : (
                <>
                    {/* Tampilan List */}
                    <Table striped bordered>
                        <thead>
                            <tr>
                            <th>No</th>
                            <th>Foto</th>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th>Stock</th>
                            <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            data.map((item, index) => (
                                <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={item.primary_image.thumbnail} alt={item.name} width="80" />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price.text_idr}</td>
                                <td>{item.stock}</td>
                                <td>{item.stats.averageRating ? item.stats.averageRating : 0}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                    {/* End Tampilan List */}
                </>
            )}
        </div>
    )
}
