'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFields, useVariables, useHiddenFields } from '@quillforms/admin-components';
import { autop } from "@wordpress/autop";
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate, PlateProvider, focusEditor, getEndPoint, getStartPoint } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TooltipProvider } from '../../components/plate-ui/tooltip';

import { commentsUsers, myUserId } from '../../lib/plate/comments';
import { MENTIONABLES } from '../../lib/plate/mentionables';
import { plugins } from '../../lib/plate/plate-plugins';
import { cn } from '../../lib/utils';
import { CommentsPopover } from '../../components/plate-ui/comments-popover';
import { CursorOverlay } from '../../components/plate-ui/cursor-overlay';
import { FixedToolbar } from '../../components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '../../components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '../../components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '../../components/plate-ui/floating-toolbar-buttons';
import { MentionCombobox } from '../../components/plate-ui/mention-combobox';
import { usePlateEditorState, usePlateSelectors, createPlateEditor, deserializeHtml } from "@udecode/plate-core";
import { htmlSerialize } from '../../serializer';
import { ItemsContextProvider } from './items-provider';
export default function Editor({ value, onChange, customMergeTags = [] }) {
  const containerRef = useRef(null);

  // const initialValue = [
  //   {
  //     type: ELEMENT_PARAGRAPH,
  //     children: [{ text: 'Hello, World!' }],
  //   },
  // ];

  const initialValue = useMemo(() => {

    const formattedValue = autop(value) + "<p></p>";
    const $value = formattedValue.replace(
      /{{([a-zA-Z0-9-_]+):([a-zA-Z0-9-_]+)}}/g,
      "<mention data-type='$1' data-modifier='$2'>_____</mention>"
    );
    const tmpEditor = createPlateEditor({ plugins });
    const deserializedValue = deserializeHtml(tmpEditor, {
      element: $value
    });

    return deserializedValue;
  }, []
  );

  // const editor = usePlateSelectors().editor();
  // const isRendered = usePlateSelectors().isRendered();

  // useEffect(() => {
  //   if (editor) {
  //     setTimeout(() => {
  //       focusEditor(editor, getEndPoint(editor, [0]));
  //     }, 100);
  //   }
  // }, []);

  const fields = useFields({ section: 'fields' });
  const variables = useVariables({ section: 'variables' });
  const hiddenFields = useHiddenFields({ section: 'hidden_fields' });
  let items = fields.concat(variables).concat(hiddenFields);
  items = items.concat(customMergeTags).map((item, index) => {
    return {
      ...item,
      text: item.label,
      key: `${index}`
    }
  })
  return (
    <ItemsContextProvider value={items}>
      <TooltipProvider
        disableHoverableContent
        delayDuration={500}
        skipDelayDuration={0}
      >
        <div className='quillforms-full-rich-text'>
          <DndProvider backend={HTML5Backend}>
            <div className="relative">
              <PlateProvider plugins={plugins} initialValue={initialValue}
                onChange={(newValue) => {
                  if (onChange) {
                    onChange(htmlSerialize(newValue));
                  }
                }}
              >
                <FixedToolbar>
                  <FixedToolbarButtons />
                </FixedToolbar>

                <div className="flex">
                  {/* <CommentsProvider users={commentsUsers} myUserId={myUserId}> */}
                  <div
                    ref={containerRef}
                    className={cn(
                      'relative flex max-w-[900px] overflow-x-auto',
                      '[&_.slate-start-area-top]:!h-4',
                      '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px]'
                    )}
                  >
                    <Plate
                      editableProps={{
                        autoFocus: false,
                        className: cn(
                          'relative max-w-full leading-[1.4] outline-none [&_strong]:font-bold',
                          '!min-h-[600px] w-[900px] px-[96px] py-[20px]'
                        )
                      }}
                    >
                      {/* <FloatingToolbar>
                  <FloatingToolbarButtons />
                </FloatingToolbar> */}

                      <MentionCombobox items={items} />

                      <CursorOverlay containerRef={containerRef} />
                    </Plate>
                  </div>

                  {/* <CommentsPopover />
          </CommentsProvider> */}
                </div>
              </PlateProvider>
            </div >
          </DndProvider >
        </div >
      </TooltipProvider>
    </ItemsContextProvider>
  );
}
