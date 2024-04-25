import React, { useRef } from 'react';

import { Container, ListGroup, ListGroupItem, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { deleteTodo, markComplete, markIncomplete } from 'action/index';
import storeType from 'types/storeType';
import AppPropType from './AppPropType';

document.body.style.backgroundColor = 'AliceBlue'; //Bootstrap being difficult so made a workaround

const App: React.FC<AppPropType> = ({ complete, incomplete, deleteTodo, markComplete, markIncomplete }) => {
  const input = useRef<HTMLInputElement>(null);

  const renderList = (type: 'Complete' | 'Incomplete') => {
    const looper = type === 'Complete' ? complete : incomplete;
    return (
      <ListGroup variant='flush' className='m-2'>
        <h3>{type}</h3>
        {looper?.map((todo, index) => {
          return (
            <ListGroupItem
              key={index}
              variant={type === 'Complete' ? 'success' : 'danger'}
              style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{todo}</div>
              <div>
                <a className='btn'>
                  <div
                    className={`fas fa-${type === 'Complete' ? 'minus' : 'check'} m-2`}
                    onClick={() => {
                      type === 'Complete' ? markIncomplete(todo) : markComplete(todo);
                    }}></div>
                </a>
                <a className='btn'>
                  <div className='fas fa-trash m-2' onClick={() => deleteTodo(todo)}></div>
                </a>
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  };

  const addTodo = () => {
    const val = input?.current?.value;
    if (val) {
      markIncomplete(val);
      input.current.value = "";
    }
  };

  return (
    <Container fluid>
      <img
        className='img-fluid'
        src='https://images.squarespace-cdn.com/content/v1/63bc2808f61d3720a9aa95fe/37ed3c99-5131-4596-bfbe-fcf8bdf8648f/Procode_logo_c_RGB.png' alt="Procode Logo"></img>
      <h1 className='bg-primary text-center'>ProCode TODO List Application</h1>
      <div className='m-5'>
        <InputGroup className='m-1'>
          <FormControl placeholder='Todo' ref={input} />

          <Button variant='secondary' onClick={() => addTodo()}>
            <i className='fas faplus mr-3'></i>
            Add
          </Button>
        </InputGroup>
        {renderList('Complete')}
        {renderList('Incomplete')}
      </div>
    </Container>
  );
};

const mapStateToProps = (state: storeType) => {
  return {
    complete: state.complete,
    incomplete: state.incomplete,
  };
};

export default connect(mapStateToProps, { deleteTodo, markComplete, markIncomplete })(App);
