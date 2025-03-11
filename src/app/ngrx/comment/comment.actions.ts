import { createAction, props } from '@ngrx/store';
import { CommentModel } from '../../models/comment.model';

export const getComment = createAction(
  '[Comment] Get Comment',
  props<{ cardId: string }>(),
);

export const getCommentSuccess = createAction(
  '[Comment] Get Comment Success',
  props<{ comments: CommentModel[] }>(),
);

export const getCommentFailure = createAction(
  '[Comment] Get Comment Failure',
  props<{ error: string }>(),
);

export const createComment = createAction(
  '[Comment] Create Comment',
  props<{
    comment: { cardId: string; text: string };
  }>(),
);

export const createCommentSuccess = createAction(
  '[Comment] Create Comment Success',
  props<{
    comment: CommentModel;
  }>(),
);

export const createCommentFailure = createAction(
  '[Comment] Create Comment Failure',
  props<{ error: string }>(),
);

export const deleteComment = createAction(
  '[Comment] Delete Comment',
  props<{ commentId: string }>(),
);

export const deleteCommentSuccess = createAction(
  '[Comment] Delete Comment Success',
  props<{ commentId: string }>(),
);

export const deleteCommentFailure = createAction(
  '[Comment] Delete Comment Failure',
  props<{ error: string }>(),
);

export const clearCommentState = createAction('[Comment] Clear Comment State');
