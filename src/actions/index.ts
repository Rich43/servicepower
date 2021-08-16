export const CREATE_TYPE = 'create';
export const UPDATE_TYPE = 'update';
export const DELETE_TYPE = 'delete';
export const createAction = (object: {}) => ({type: CREATE_TYPE, object});
export const updateAction = (id: number, object: {}) => ({type: UPDATE_TYPE, id, object});
export const deleteAction = (id: number) => ({type: DELETE_TYPE, id});
