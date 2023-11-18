import { FaStar, FaSearch } from "react-icons/fa"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Pagination, Row, Col, ToggleButtonGroup, ToggleButton, Card } from 'react-bootstrap'
import Title from '../title/App'

export default function DataProduct() {
    const [data, setData] = useState([])
    const [isListView, setIsListView] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')

    const productsPerPage = 5

    useEffect(() => {
        async function getData() {
            try {
                const file = '/data/data.json'
                const response = await axios.get(file)

                setData(response.data.data)
            } catch (e) {
                console.error(e)
            }
        }

        getData()
    }, [])

    const handleToggleChange = (value) => {
        setIsListView(value === 1)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
        setCurrentPage(1)
    }

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage

    const filteredProducts = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    )

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }


    const renderPagination = () => {
        const pagesToShow = 2
        const pages = []


        if (totalPages <= pagesToShow * 2 + 1) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <Pagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </Pagination.Item>
                )
            }
        } else {
            if (currentPage <= pagesToShow + 1) {
                for (let i = 1; i <= pagesToShow * 2 + 1; i++) {
                    pages.push(
                        <Pagination.Item
                            key={i}
                            active={i === currentPage}
                            onClick={() => handlePageChange(i)}
                        >
                            {i}
                        </Pagination.Item>
                    )
                }
                pages.push(<Pagination.Ellipsis key="ellipsis1" />)
                pages.push(
                    <Pagination.Item
                        key={totalPages}
                        active={totalPages === currentPage}
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </Pagination.Item>
                )
            } else if (currentPage >= totalPages - pagesToShow) {
                pages.push(
                    <Pagination.Item
                        key={1}
                        active={1 === currentPage}
                        onClick={() => handlePageChange(1)}
                    >
                        {1}
                    </Pagination.Item>
                )
                pages.push(<Pagination.Ellipsis key="ellipsis2" />)
                for (let i = totalPages - (pagesToShow * 2); i <= totalPages; i++) {
                    pages.push(
                        <Pagination.Item
                            key={i}
                            active={i === currentPage}
                            onClick={() => handlePageChange(i)}
                        >
                            {i}
                        </Pagination.Item>
                    )
                }
            } else {
        
                pages.push(
                    <Pagination.Item
                        key={1}
                        active={1 === currentPage}
                        onClick={() => handlePageChange(1)}
                    >
                        {1}
                    </Pagination.Item>
                )
                pages.push(<Pagination.Ellipsis key="ellipsis3" />)
                for (let i = currentPage - pagesToShow; i <= currentPage + pagesToShow; i++) {
                    pages.push(
                        <Pagination.Item
                            key={i}
                            active={i === currentPage}
                            onClick={() => handlePageChange(i)}
                        >
                            {i}
                        </Pagination.Item>
                    )
                }
                pages.push(<Pagination.Ellipsis key="ellipsis4" />)
                pages.push(
                    <Pagination.Item
                        key={totalPages}
                        active={totalPages === currentPage}
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </Pagination.Item>
                )
            }
        }

        return pages
    }

    return (
        <div>
            <Row className="p-3 rounded align-items-center mb-4" style={{backgroundColor: '#D4F1F4'}}>
                <Col className="d-flex align-items-center">
                    <Title text={'product data with the most stock'} />
                </Col>

                <Col className="d-flex justify-content-end">
                    <ToggleButtonGroup type="radio" name="viewOptions" defaultValue={0} value={isListView ? 1 : 0} onChange={handleToggleChange}>
                        <ToggleButton id="tbg-check-1" value={0}>Box View</ToggleButton>
                        <ToggleButton id="tbg-check-2" value={1}>List View</ToggleButton>
                    </ToggleButtonGroup>
                </Col>
            </Row>

            <div className="mb-4 d-flex align-items-center">
                <input
                    type="text"
                    placeholder="Search Item"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-100 p-2 rounded border-1"
                />
                <FaSearch style={{ marginLeft: '-30px', marginRight: '10px' }} />
            </div>

            {!isListView ? (
                <>
                    {/* Tampilan Box */}
                    <Row>
                        {
                            currentProducts.map((item, index) => (
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
                    {/* Start Tampilan List */}
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
                                currentProducts.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1 + (currentPage - 1) * productsPerPage}</td>
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

            {/* Start pagination */}
            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {renderPagination()}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </div>
            {/* End pagination */}
        </div>
    )
}
