import 'draft-js/dist/Draft.css';
import { RichUtils } from 'draft-js';
import { useCurrentEditor } from './core';
import StyleButton from './style-button';

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

export default function BlockStyleControls() {
  const { currentEditor, changeCurrentEditor } = (useCurrentEditor() ||
    {}) as any;

  const [editorState, setEditorState] = currentEditor || [];

  if (!editorState) {
    return null;
  }

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={blockType => {
            const newEditorState = RichUtils.toggleBlockType(
              editorState,
              blockType
            );
            setEditorState(newEditorState);
            changeCurrentEditor(newEditorState, setEditorState);
          }}
          style={type.style}
        />
      ))}
    </div>
  );
}
