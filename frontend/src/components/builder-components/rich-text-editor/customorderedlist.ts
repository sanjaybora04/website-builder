import OrderedList from '@tiptap/extension-ordered-list'

export const CustomOrderedList = OrderedList.extend({
  renderHTML({ HTMLAttributes }) {
    return ['ol', {
      ...HTMLAttributes,
      style: 'list-style-type: decimal; padding-left: 1.25rem; margin-bottom: 0.5rem;',
    }, 0]
  },
})
