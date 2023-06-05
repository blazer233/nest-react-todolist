import {
  createContext,
  useCallback,
  ReactNode,
  useState,
  useMemo,
  useContext,
} from 'react';
import { ContentState, EditorState, convertFromHTML } from 'draft-js';

const EditorContext = createContext(null);

function getInitialEditorState(markup = '') {
  if (!markup) {
    return EditorState.createEmpty();
  }

  const blocksFromHTML = convertFromHTML(markup);
  const initialEditorContent = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  return EditorState.createWithContent(initialEditorContent);
}

export function EditorProvider({ children }: { children: ReactNode }) {
  const [[currentEditorState, setCurrentEditorState], setCurrentEditor] =
    useState([null, () => {}]);

  const changeCurrentEditor = useCallback(
    (editorState: any, setEditorState: any) => {
      setCurrentEditor([editorState, setEditorState]);
    },
    []
  );

  const editorContextValue = useMemo(
    () => ({
      currentEditor: [currentEditorState, setCurrentEditorState],
      changeCurrentEditor,
    }),
    [changeCurrentEditor, currentEditorState, setCurrentEditorState]
  );

  return (
    <EditorContext.Provider value={editorContextValue as any}>
      {children}
    </EditorContext.Provider>
  );
}

export function useCurrentEditor() {
  const editorContextValue = useContext(EditorContext) || {};

  if (editorContextValue === undefined) {
    throw new Error(`useEditor must be used within a EditorProvider`);
  }

  return editorContextValue;
}

export function useNewRichTextEditor(initialEditorMarkup: any) {
  return useState(() => getInitialEditorState(initialEditorMarkup));
}
