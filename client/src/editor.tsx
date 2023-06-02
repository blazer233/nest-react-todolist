import { useState } from 'react';
import { Editor, EditorState, RichUtils, SelectionState } from 'draft-js';

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleKeyCommand = (command: string, state: EditorState) => {
    console.log(command, 333);
    if (command === '@') {
      const contentState = state.getCurrentContent();
      const selectionState = state.getSelection();
      const start = selectionState.getStartOffset();
      const end = selectionState.getEndOffset();
      const blockKey = selectionState.getStartKey();
      const block = contentState.getBlockForKey(blockKey);
      const text = block.getText().slice(start, end);
      const newContentState = contentState.createEntity('BLUE', 'MUTABLE', {
        color: 'blue',
      });
      const entityKey = newContentState.getLastCreatedEntityKey();
      const newSelectionState = SelectionState.createEmpty(blockKey).merge({
        anchorOffset: start,
        focusOffset: end,
      });
      const newEditorState = EditorState.push(
        state,
        newContentState,
        'apply-entity'
      );
      setEditorState(
        RichUtils.toggleLink(newEditorState, newSelectionState, entityKey)
      );
      return 'handled';
    }
    if (command === 'toggle-bold') {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div>
      <button onClick={() => toggleStyle('BOLD')}>Bold</button>
      <button onClick={() => toggleStyle('ITALIC')}>Italic</button>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={setEditorState}
      />
    </div>
  );
};

export default RichTextEditor;
