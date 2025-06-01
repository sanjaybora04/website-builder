import BulletList from '@tiptap/extension-bullet-list'

export const CustomBulletList = BulletList.extend({
  renderHTML({ HTMLAttributes }) {
    return ['ul', {
      ...HTMLAttributes,
      style: 'list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem;',
    }, 0]
  },
})
