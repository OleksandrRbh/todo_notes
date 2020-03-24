import NotesList from '../components/NotesList'
import NotesEdit from '../components/NotesEdit'

export default [
  {
      path: '/',
      name: 'notes',
      component: NotesList
  },
  {
      path: '/notes-edit/:id',
      name: 'notes-edit',
      component: NotesEdit
  },
  {
      path: '/notes-new',
      name: 'notes-new',
      component: NotesEdit
  }
];