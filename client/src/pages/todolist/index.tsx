import { useDebounceFn, useRequest } from 'ahooks';
import React, { useState } from 'react';
import { Input, Button, List, Checkbox } from 'antd';
import {
  getAlltodos,
  postAddtodos,
  postDeltodos,
  postUpdatetodos,
  getFindtodos,
} from '../../http';

interface Todo {
  id: string;
  content: string;
  completed: boolean;
}
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const setList = (manual = true) => ({
    manual,
    onSuccess: (res: any) => setTodos(res as Todo[]),
  });

  const { loading } = useRequest(getAlltodos, setList(false));
  const { loading: dl, run: deRun } = useRequest(postDeltodos, setList());
  const { loading: al, run: adRun } = useRequest(postAddtodos, setList());
  const { loading: fl, run: fdRun } = useRequest(getFindtodos, setList());
  const { loading: pl, run: putRun } = useRequest(postUpdatetodos, setList());
  const { run: debounceRun } = useDebounceFn(fdRun, { wait: 500 });

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewTodo(event.target.value);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    debounceRun(event.target.value);
  };
  const handleNewTodoSubmit = () => {
    if (!newTodo.trim()) return;
    adRun(newTodo);
    setNewTodo('');
  };

  const handleTodoDelete = (id: string) => deRun(`${id}`);

  const handleTodoToggle = (item: any) => {
    item.completed = !item.completed;
    putRun(item);
  };
  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <h1>Todo List</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Input.Search
          placeholder="Add todo..."
          value={newTodo}
          enterButton="添加"
          onSearch={handleNewTodoSubmit}
          onChange={handleNewTodoChange}
          style={{ width: '60vw', marginBottom: '20px' }}
          size="large"
          loading={al}
        />
        <Input
          placeholder="查询"
          size="small"
          value={search}
          allowClear
          onChange={handleSearchChange}
          style={{
            width: '40vw',
          }}
        />
      </div>
      <List
        style={{ marginTop: '20px' }}
        bordered
        loading={loading || al || dl || pl || fl}
        dataSource={todos}
        pagination={{
          position: 'top',
          align: 'end',
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50],
        }}
        renderItem={todo => (
          <List.Item
            actions={[
              <Checkbox
                onChange={() => handleTodoToggle(todo)}
                checked={todo.completed}
              >
                done
              </Checkbox>,
              <Button type="link" onClick={() => handleTodoDelete(todo.id)}>
                Delete
              </Button>,
            ]}
          >
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : '' }}
            >
              {todo.content}
            </span>
          </List.Item>
        )}
      />
    </div>
  );
};

export default App;
