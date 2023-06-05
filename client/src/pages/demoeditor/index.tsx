import React, { useState, useRef, useEffect } from 'react';
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
import { Button } from 'antd';
import { useMount, useLocalStorageState } from 'ahooks';

const KEY = 'rich-text-edit';
const RichTextEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [message, setMessage] = useLocalStorageState<string | undefined>(KEY);
  const editor = useRef<Editor>(null);

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
  const toggleBlockType = (blockType: string) => {
    const newState = RichUtils.toggleBlockType(editorState, blockType);
    setEditorState(newState);
  };
  const buttons = [
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
  return (
    <div>
      {buttons.map((i, idx) => (
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
    </div>
  );
};

export default RichTextEditor;
