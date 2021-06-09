import React, { useEffect, useState } from 'react'
import Student from './Student'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import '../stylesheets/scss/student.scss'

const Students = () => {
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState('')
  const [tagSearch, setTagSearch] = useState('')
  const [filteredFiles, setFilteredFiles] = useState([]);

  useEffect(() => {
    getData()
  }, [ ])

  const getData = async () => {
    const { data } = await axios.get('https://api.hatchways.io/assessment/students')

    const newArray = await data.students.map(student => ({ ...student, tags: [] }))
    setFiles(newArray)
    setFilteredFiles(newArray)
  }

  const handleNameSearch = (input) => {
    console.log(input)
    const filtered = files.filter(student => {
      return student.firstName.toLowerCase().includes(input.toLowerCase()) || student.lastName.toLowerCase().includes(input.toLowerCase())

    })
    setFilteredFiles(filtered)
  }

  const handleTagSearch = (input) => {
    const arry = filteredFiles.map(student => student.tags.filter(tag => tag.toLowerCase().includes(input.toLowerCase())));
    console.log(arry)
  }
  return (
    <Row className='card'>
      <div className="input">
        <input type="text" value={value} onChange={(e) => {
          setValue(e.target.value);
          handleNameSearch(e.target.value)
        }}
          placeholder="Seach by name"
        />
        <input className='tagsearch' type="text" value={tagSearch} onChange={(e) => {
          setTagSearch(e.target.value);
          handleTagSearch(e.target.value)
        }}
          placeholder="Seach by tag"
        />
      </div>
      {filteredFiles.map(student => (
        <Col md={12} key={student.id}>
          <Student
            student={student}
          />
        </Col>
      ))}
    </Row>
  )
}

export default Students
