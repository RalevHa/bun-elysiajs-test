import { Elysia, t } from 'elysia';
import { Note } from '../models/noteModel';
import { NoteController } from '../controllers/noteController';

export const noteRouter = (app: Elysia) => {
    const note = new Note();
    const noteController = new NoteController(note);

    return app
        .get('/', () => noteController.getAllNotes())
        .get(
            '/:index',
            ({ params: { index } }) => {
                return noteController.getNoteByIndex(index);
            },
            {
                params: t.Object({
                    index: t.Number() 
                }) 
            } 
        )
        .post('', ({ body }) => {
            return noteController.createNote(body.data);
        }, {
            body: t.Object({
                data: t.String()
            })
        })
        .put(
            '/:index',
            ({ params: { index }, body }) => {
                return noteController.updateNote(index, body.data);
            },
            {
                params: t.Object({
                    index: t.Number()
                }),
                body: t.Object({
                    data: t.String()
                })
            }
        )
        .delete(
            '/:index',
            ({ params: { index } }) => {
                return noteController.deleteNote(index);
            },
            {
                params: t.Object({
                    index: t.Number()
                })
            }
        );
};