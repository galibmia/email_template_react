import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css'; // Ensure this is loaded

const GrapesJSEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current, // Attach to editor
      height: '100vh',
      width: 'auto',
      fromElement: true, // Load default template or any HTML in the container
      storageManager: false, // Disable storage to simplify setup

      blockManager: {
        appendTo: '#blocks',
        blocks: [
          {
            id: 'section', // id is mandatory
            label: '<b>Section</b>', // You can use HTML/SVG inside labels
            attributes: { class: 'gjs-block-section' },
            content: `<section>
              <h1>This is a simple title</h1>
              <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
            </section>`,
          },
          {
            id: 'text',
            label: 'Text',
            content: '<div data-gjs-type="text">Insert your text here</div>',
          },
          {
            id: 'image',
            label: 'Image',
            // Select the component once it's dropped
            select: true,
            // You can pass components as a JSON instead of a simple HTML string,
            // in this case we also use a defined component type `image`
            content: { type: 'image' },
            // This triggers `active` event on dropped components and the `image`
            // reacts by opening the AssetManager
            activate: true,
          },
        ],
      },
    });

    editor.Panels.addPanel({
        id: 'panel-top',
        el: '.panel__top',
      });
      editor.Panels.addPanel({
        id: 'basic-actions',
        el: '.panel__basic-actions',
        buttons: [
          {
            id: 'visibility',
            active: true, // active by default
            className: 'btn-toggle-borders',
            label: '<u>B</u>',
            command: 'sw-visibility', // Built-in command
          },
          {
            id: 'export',
            className: 'btn-open-export',
            label: 'Exp',
            command: 'export-template',
            context: 'export-template', // For grouping context of buttons from the same panel
          },
          {
            id: 'show-json',
            className: 'btn-show-json',
            label: 'JSON',
            context: 'show-json',
            command(editor) {
              editor.Modal.setTitle('Components JSON')
                .setContent(
                  `<textarea style="width:100%; height: 250px;">
                  ${JSON.stringify(editor.getComponents())}
                </textarea>`,
                )
                .open();
            },
          },
        ],
      });

  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {/* Add this container to display Block Manager */}
      <div id="blocks" style={{ width: '250px', borderRight: '1px solid #ddd' }}></div>

      {/* Editor */}
      <div ref={editorRef} style={{ flex: 1 }} />
    </div>
  );
};

export default GrapesJSEditor;
