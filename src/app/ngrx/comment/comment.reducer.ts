import { createReducer, on } from '@ngrx/store';
import { CommentState } from './comment.state';
import * as commentActions from './comment.actions';

const initialState: CommentState = {
  comments: [],
  isGettingComments: false,
  isGetCommentsSuccess: false,
  isGetCommentsFailure: '',

  isCreatingComment: false,
  isCreateCommentSuccess: false,
  isCreateCommentFailure: '',

  isDeletingComment: false,
  isDeleteCommentSuccess: false,
  isDeleteCommentFailure: '',
};

export const commentReducer = createReducer(
  initialState,
  on(commentActions.createComment, (state) => {
    return {
      ...state,
      isCreatingComment: true,
      isCreateCommentSuccess: false,
      isCreateCommentFailure: '',
    };
  }),
  on(commentActions.createCommentSuccess, (state, { comment }) => {
    return {
      ...state,
      comments: [comment, ...state.comments],
      isCreatingComment: false,
      isCreateCommentSuccess: true,
      isCreateCommentFailure: '',
    };
  }),
  on(commentActions.createCommentFailure, (state, { error }) => {
    return {
      ...state,
      isCreatingComment: false,
      isCreateCommentSuccess: false,
      isCreateCommentFailure: error,
    };
  }),
  on(commentActions.getComment, (state) => {
    return {
      ...state,
      isGettingComments: true,
      isGetCommentsSuccess: false,
      isGetCommentsFailure: '',
    };
  }),
  on(commentActions.getCommentSuccess, (state, { comments }) => {
    return {
      ...state,
      comments,
      isGettingComments: false,
      isGetCommentsSuccess: true,
      isGetCommentsFailure: '',
    };
  }),
  on(commentActions.getCommentFailure, (state, { error }) => {
    return {
      ...state,
      isGettingComments: false,
      isGetCommentsSuccess: false,
      isGetCommentsFailure: error,
    };
  }),
  on(commentActions.deleteComment, (state) => {
    return {
      ...state,
      isDeletingComment: true,
      isDeleteCommentSuccess: false,
      isDeleteCommentFailure: '',
    };
  }),
  on(commentActions.deleteCommentSuccess, (state, { commentId }) => {
    return {
      ...state,
      comments: state.comments.filter((comment) => comment.id !== commentId),
      isDeletingComment: false,
      isDeleteCommentSuccess: true,
      isDeleteCommentFailure: '',
    };
  }),
  on(commentActions.deleteCommentFailure, (state, { error }) => {
    return {
      ...state,
      isDeletingComment: false,
      isDeleteCommentSuccess: false,
      isDeleteCommentFailure: error,
    };
  }),
  on(commentActions.clearCommentState, (state) => {
    return initialState;
  }),
);
