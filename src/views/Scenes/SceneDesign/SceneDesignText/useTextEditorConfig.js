export const useTextEditorConfig = ({ currentTheme }) => ({
  readonly: false,
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  toolbarAdaptive: false,
  theme: 'dark',
  toolbarButtonSize: 'small',
  disablePlugins: [
    'clean-html',
    'copy-format',
    'paste',
    'paste-storage',
    'clipboard',
    'preview',
    'search',
    'symbols',
    'link',
    'hr'
  ],
  removeButtons: [
    'paste',
    'clipboard',
    'paste-storage',
    'fullsize',
    'about',
    'outdent',
    'video',
    'print',
    'table',
    'superscript',
    'subscript',
    'file',
    'cut',
    'selectall'
  ],
  uploader: {
    insertImageAsBase64URI: true
  },
  style: {
    color: currentTheme.texts
  },
  controls: {
    font: {
      list: {
        '': 'Default',
        'Helvetica,sans-serif': 'Helvetica',
        'Arial,Helvetica,sans-serif': 'Arial'
      }
    }
  }
  // all options in https://xdsoft.net/jodit/doc/
});
