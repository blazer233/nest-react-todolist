import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  DraftHandleValue,
  DraftEditorCommand,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Outlet } from 'react-router-dom';
import { Button } from 'antd';
import { useMount, useLocalStorageState } from 'ahooks';
import { routesAll } from '../../routes';

const BUTTONS = [
  'BOLD',
  'ITALIC',
  'UNDERLINE',
  'unordered-list-item',
  'ordered-list-item',
  'code-block',
  'header-one',
  'header-two',
  'blockquote',
];
const KEY = 'rich-text-edit';
const RichTextEditor: React.FC<{ routePath: string }> = ({ routePath }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [message, setMessage] = useLocalStorageState<string | undefined>(KEY);
  const editor = useRef<Editor>(null);
  const navigate = useNavigate();

  const convertContentToJSON = (): string => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    return JSON.stringify(rawContent);
  };
  const loadContentFromJSON = (json: string) => {
    const rawContent = JSON.parse(json);
    const contentState = convertFromRaw(rawContent);
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  };
  useMount(() => editor.current?.focus());
  useEffect(() => {
    message && loadContentFromJSON(message);
  }, [message]);
  const handleKeyCommand = (command: DraftEditorCommand): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };
  const toggleInlineStyle = (inlineStyle: string) => {
    const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
    setEditorState(newState);
  };
  console.log(routesAll);
  return (
    <div>
      {BUTTONS.map((i, idx) => (
        <Button
          key={idx}
          onClick={toggleInlineStyle.bind(null, i)}
          style={{ margin: '4px' }}
        >
          {i}
        </Button>
      ))}
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
      <Button onClick={() => setMessage(convertContentToJSON())}>Save</Button>
      <Button onClick={() => loadContentFromJSON('your-json-string')}>
        Load
      </Button>
      {routesAll
        .find(i => i.path === `/${routePath}`)
        .children.map((i: any, idx: number) => (
          <Button key={idx} onClick={() => navigate(i.path)} type="link">
            {i.routePath}
          </Button>
        ))}
      <Outlet />
    </div>
  );
};

export default RichTextEditor;
