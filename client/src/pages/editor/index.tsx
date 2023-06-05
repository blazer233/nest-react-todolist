import BlockStyleControls from './block-style-controls';
import InlineStyleControls from './inline-style-controls';
import RichTextEditor from './rich-text-editor';
import { EditorProvider } from './core';
import './index.css';

export default () => (
  <EditorProvider>
    <div className="RichEditor-root">
      <div className="RichEditor-controls-container">
        {/* <BlockStyleControls /> */}
        <InlineStyleControls />
      </div>
      {/* <RichTextEditor
        markup={
          '<p>Hello from Peram!</p>\n\n<h1>This is a header</h1>\n\n<blockquote>Awesome quote</blockquote>'
        }
      /> */}
      <RichTextEditor />
    </div>
  </EditorProvider>
);
