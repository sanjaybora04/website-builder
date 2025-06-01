import ListItem from '@tiptap/extension-list-item'

export const CustomListItem = ListItem.extend({
  renderHTML({ HTMLAttributes }) {
    return ['li', {
      ...HTMLAttributes,
      style: 'margin-bottom: 0.25rem;',
    }, 0]
  },
})
