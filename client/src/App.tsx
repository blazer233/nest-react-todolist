import { useRequest } from 'ahooks';
import React, { useState } from 'react';
import { Input, Button, List, Checkbox } from 'antd';

import {
  getAlltodos,
  postAddtodos,
  postDeltodos,
  postUpdatetodos,
} from './http';

interface Todo {
  id: string;
  content: string;
  completed: boolean;
}
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const { loading } = useRequest(getAlltodos, {
    onSuccess: res => setTodos(res as Todo[]),
  });
  const { loading: dl, run: deRun } = useRequest(postDeltodos, {
    manual: true,
    onSuccess: res => setTodos(res as Todo[]),
  });
  const { loading: al, run: adRun } = useRequest(postAddtodos, {
    manual: true,
    onSuccess: res => setTodos(res as Todo[]),
  });
  const { loading: pl, run: putRun } = useRequest(postUpdatetodos, {
    manual: true,
    onSuccess: res => setTodos(res as Todo[]),
  });

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = () => {
    if (!newTodo.trim()) return;
    setNewTodo('');
    adRun(newTodo);
  };

  const handleTodoDelete = (id: string) => deRun(`${id}`);

  const handleTodoToggle = (item: any) => {
    item.completed = !item.completed;
    putRun(item);
  };
  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <h1>Todo List</h1>
      <Input
        value={newTodo}
        placeholder="Add todo..."
        onChange={handleNewTodoChange}
        style={{ width: '200px', marginRight: '10px' }}
      />
      <Button type="primary" onClick={handleNewTodoSubmit}>
        Add
      </Button>
      <List
        style={{ marginTop: '20px' }}
        bordered
        loading={loading || al || dl || pl}
        dataSource={todos}
        renderItem={todo => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleTodoDelete(todo.id)}>
                Delete
              </Button>,
              <Checkbox
                onChange={() => handleTodoToggle(todo)}
                checked={todo.completed}
              >
                Checkbox
              </Checkbox>,
            ]}
          >
            {todo.content}
          </List.Item>
        )}
      />
    </div>
  );
};

export default App;
