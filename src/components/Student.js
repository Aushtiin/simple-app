import React, { useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'

const Student = ({ student }) => {
  const [show, setShow] = useState(false)
  const [tag, setTag] = useState('')

  const arrAvg = arr => arr.reduce((a, b) => Number(a) + Number(b), 0) / arr.length

  const handleSubmit = (e) => {
    e.preventDefault()
    student.tags.push(tag)
    console.log(student.tags)
    setTag('')
  }
  
  return (
    <Row className='stu-box'>
      <Col>
        <Row>
          <Col className='pic' md={2}>
            <div className="student">
              <Image fluid src={student.pic} />
            </div>
          </Col>

          <Col>
            <div className="text">
              <div className="heading">
                <h1 className='h-5'>
                  <b>{student.firstName.toUpperCase()} {student.lastName.toUpperCase()}</b>
                </h1>
                {!show ? <i onClick={() => setShow(!show)} className="fas fa-plus"></i> :
                  <i onClick={() => setShow(!show)} className="fas fa-minus"></i>
                }
              </div>
              <p>Email: {student.email}</p>
              <p>Company: {student.company}</p>
              <p>Skill: {student.skill}</p>
              <p>Average: {`${arrAvg(student.grades)}%`}</p>

            </div>
            {show && student.grades.map((grade, index) => (
              <Row className='grades' key={index}>
                <Col>
                  {`Test ${index + 1}`}
                </Col>
                <Col>
                  {`${grade}%`}
                </Col>
              </Row>
            ))}
            <div className="tags">
                {student.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            <div className="form">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={tag}
                  placeholder="Add a tag"
                  id={student.firstName}
                  onChange={(e) => setTag(e.target.value)}
                />
                <input type="submit" style={{ display: "none" }} />
              </form>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Student
