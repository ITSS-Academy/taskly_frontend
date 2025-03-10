import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as commentActions from './comment.actions';
import {inject} from '@angular/core';
import {CommentService} from '../../services/comment/comment.service';
import {catchError, map, mergeMap, of, switchMap} from 'rxjs';
import {CommentModel} from '../../models/comment.model';
import * as listActions from '../list/list.actions';

//create Comment Effect
export const createComment = createEffect((
    actions$ = inject(Actions),
    commentService = inject(CommentService)
  ) => {
    return actions$.pipe(
      ofType(commentActions.createComment),
      switchMap(({comment}) => {
        return commentService.createComment(comment).pipe(
          mergeMap((commentResponse: any) => [
              listActions.addCommentCount({cardId: comment.cardId}),
              commentActions.createCommentSuccess({comment: commentResponse}),
            ]
          ),
          catchError((error) => of(commentActions.createCommentFailure({error})))
        );
      })
    );
  }, {functional: true}
);

//get Comment Effect
export const getComment = createEffect((
    actions$ = inject(Actions),
    commentService = inject(CommentService)
  ) => {
    return actions$.pipe(
      ofType(commentActions.getComment),
      switchMap(({cardId}) => {
        return commentService.getComments(cardId).pipe(
          map((comments: any) => commentActions.getCommentSuccess({comments})),
          catchError((error) => of(commentActions.getCommentFailure({error})))
        );
      })
    );
  }, {functional: true}
);

//delete Comment Effect
export const deleteComment = createEffect((
    actions$ = inject(Actions),
    commentService = inject(CommentService)
  ) => {
    return actions$.pipe(
      ofType(commentActions.deleteComment),
      switchMap(({commentId}) => {
        return commentService.deleteComment(commentId).pipe(
          mergeMap((comment: any) => [
              listActions.subtractCommentCount({cardId: comment.cardId}),
              commentActions.deleteCommentSuccess({commentId}),
            ]
          ),
          catchError((error) => of(commentActions.deleteCommentFailure({error})))
        );
      })
    );
  }, {functional: true}
);

